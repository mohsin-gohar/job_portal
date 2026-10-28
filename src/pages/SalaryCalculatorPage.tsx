import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, ArrowRight } from 'lucide-react';

const TAX = [{ min: 0, max: 11600, rate: 0.10 }, { min: 11601, max: 47150, rate: 0.12 }, { min: 47151, max: 100525, rate: 0.22 }, { min: 100526, max: 191950, rate: 0.24 }, { min: 191951, max: 243725, rate: 0.32 }, { min: 243726, max: 609350, rate: 0.35 }, { min: 609351, max: Infinity, rate: 0.37 }];
const STATES: Record<string, number> = { 'California': 0.093, 'New York': 0.109, 'Texas': 0, 'Florida': 0, 'Washington': 0, 'Illinois': 0.0495, 'Pennsylvania': 0.0307, 'Massachusetts': 0.05, 'Colorado': 0.044, 'Remote': 0 };

export const SalaryCalculatorPage: React.FC = () => {
  const [gross, setGross] = useState(120000);
  const [state, setState] = useState('California');
  const [filing, setFiling] = useState<'single' | 'married'>('single');
  const [ret, setRet] = useState(6);
  const [health, setHealth] = useState(200);

  const calc = useMemo(() => {
    const annual = gross;
    let federal = 0, rem = annual;
    for (const b of TAX) { const t = Math.min(rem, b.max - b.min + 1); if (t <= 0) break; federal += t * b.rate; rem -= t; if (rem <= 0) break; }
    const std = filing === 'single' ? 14600 : 29200;
    federal = Math.max(0, federal - std * 0.22);
    const stateTax = annual * (STATES[state] ?? 0.05);
    const ss = Math.min(annual, 168600) * 0.062;
    const med = annual * 0.0145;
    const retirement = annual * (ret / 100);
    const h = health * 12;
    const total = federal + stateTax + ss + med + retirement + h;
    const net = annual - total;
    return { federal, stateTax, ss, med, retirement, h, total, net, monthly: net / 12, biweekly: net / 26, rate: (total / annual) * 100 };
  }, [gross, state, filing, ret, health]);

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-2">
          <Calculator className="w-3.5 h-3.5" /><span>Salary Calculator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Take-Home Pay Estimator</h1>
        <p className="text-sm text-slate-500 mt-1">Estimate your net salary after federal, state, and FICA taxes.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Inputs</h2>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Annual Gross Salary</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="number" value={gross} onChange={(e) => setGross(Number(e.target.value) || 0)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white" />
            </div>
            <input type="range" min={30000} max={500000} step={5000} value={gross}
              onChange={(e) => setGross(Number(e.target.value))} className="w-full mt-2 accent-emerald-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-400">
              {Object.keys(STATES).map((s) => <option key={s} value={s}>{s} ({(STATES[s] * 100).toFixed(2)}%)</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Filing Status</label>
            <div className="grid grid-cols-2 gap-2">
              {(['single', 'married'] as const).map((s) => (
                <button key={s} onClick={() => setFiling(s)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${filing === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'}`}>
                  {s === 'single' ? 'Single' : 'Married Filing Jointly'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Retirement Contribution: {ret}%</label>
            <input type="range" min={0} max={25} step={1} value={ret} onChange={(e) => setRet(Number(e.target.value))} className="w-full accent-emerald-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Monthly Health Premium</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="number" value={health} onChange={(e) => setHealth(Number(e.target.value) || 0)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-400 focus:bg-white" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-100 mb-1">Estimated Take-Home Pay</div>
            <div className="text-4xl font-bold tracking-tight mb-1">{fmt(calc.net)}</div>
            <div className="text-sm text-emerald-100">per year · {fmt(calc.monthly)}/month · {fmt(calc.biweekly)} biweekly</div>
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
              <span className="text-emerald-100">Effective tax rate</span>
              <span className="font-bold">{calc.rate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

