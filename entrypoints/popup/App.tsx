import { useState, useEffect } from 'react';
import { featureGroups, type FeatureToggle, type FeatureGroup } from '@/utils/storage';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import './App.css';

type TabKey = 'home' | 'global' | 'video' | 'settings';

interface Tab {
  key: TabKey;
  label: string;
}

const tabs: Tab[] = [
  { key: 'home', label: 'Home' },
  { key: 'global', label: 'Global' },
  { key: 'video', label: 'Video Page' },
  { key: 'settings', label: 'Settings' },
];

function Toggle({ feature }: { feature: FeatureToggle }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    feature.storageItem.getValue().then((val) => {
      setEnabled(val);
      setLoading(false);
    });
    const unwatch = feature.storageItem.watch((newVal) => {
      setEnabled(newVal);
    });
    return unwatch;
  }, [feature]);

  const toggle = async () => {
    const newVal = !enabled;
    setEnabled(newVal);
    await feature.storageItem.setValue(newVal);
  };

  return (
    <div className="toggle-row">
      <span className="toggle-label">{feature.label}</span>
      <Switch
        checked={enabled}
        onCheckedChange={toggle}
        disabled={loading}
      />
    </div>
  );
}

function FeatureList({ group }: { group: FeatureGroup }) {
  return (
    <div className="toggles">
      {group.features.map((f) => (
        <Toggle key={f.key} feature={f} />
      ))}
    </div>
  );
}

function SettingsTab() {
  const [password, setPassword] = useState('');

  return (
    <div className="settings-panel">
      <div className="settings-row">
        <label className="settings-label" htmlFor="password">
          Extension Password (Coming Soon)
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          className="settings-input"
          disabled
        />
      </div>
      <p className="settings-hint">Password protection feature coming in a future update.</p>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const activeGroup = featureGroups.find((g) => g.key === activeTab);

  return (
    <div className="popup">
      <header className="popup-header">
        <img src="/eklipse.svg" alt="Eklipse" className="popup-icon" />
        <h1>Eklipse</h1>
      </header>

      <div className="tab-selector">
        <Select value={activeTab} onValueChange={(v: string) => setActiveTab(v as TabKey)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.key} value={tab.key}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="tab-content">
        {activeTab === 'settings' ? (
          <SettingsTab />
        ) : activeGroup ? (
          <FeatureList group={activeGroup} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
