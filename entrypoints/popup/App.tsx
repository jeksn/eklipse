import { useState, useEffect } from 'react';
import { features, type FeatureToggle } from '@/utils/storage';
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
      <button
        className={`toggle-switch ${enabled ? 'on' : ''} ${loading ? 'loading' : ''}`}
        onClick={toggle}
        disabled={loading}
        role="switch"
        aria-checked={enabled}
      >
        <span className="toggle-knob" />
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="popup">
      <header className="popup-header">
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
