import { useState, useEffect } from 'react';
import { features, type FeatureToggle } from '@/utils/storage';
import { Switch } from '@/components/ui/switch';
import './App.css';

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

function App() {
  return (
    <div className="popup">
      <header className="popup-header">
        <img src="/eklipse.svg" alt="Eklipse" className="popup-icon" />
        <h1>Eklipse</h1>
      </header>
      <div className="toggles">
        {features.map((f) => (
          <Toggle key={f.key} feature={f} />
        ))}
      </div>
    </div>
  );
}

export default App;
