import React, { useState } from 'react';
import { Bell, Plus, Trash2, Mail, ToggleLeft, ToggleRight } from 'lucide-react';

const alerts = [
  { id: 1, title: 'Senior Frontend Engineer', location: 'Remote', frequency: 'Daily', active: true },
  { id: 2, title: 'AI/ML Engineer', location: 'San Francisco', frequency: 'Weekly', active: true },
  { id: 3, title: 'Product Designer', location: 'New York', frequency: 'Instant', active: false },
];

export const JobAlertsPage: React.FC = () => {
  const [items, setItems] = useState(alerts);

  const toggle = (id: number) => {
    setItems(items.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-7 h-7" /> Job Alerts
          </h1>
          <p className="text-sm text-slate-500 mt-1">Get notified when new matching jobs are posted</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800">
          <Plus className="w-4 h-4" /> New Alert
        </button>
      </div>

      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.active ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-slate-900">{a.title}</div>
                <div className="text-xs text-slate-500">{a.location} · {a.frequency}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggle(a.id)} className="text-slate-400 hover:text-slate-600">
                {a.active ? <ToggleRight className="w-6 h-6 text-indigo-600" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
              <button className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm text-slate-600">
        <strong>Tip:</strong> Set alerts for specific skills or companies to get the most relevant opportunities. You can pause alerts anytime.
      </div>
    </div>
  );
};
