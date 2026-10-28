import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getStoredJobs } from '../services/api';
import { TrendingUp, BarChart3, DollarSign, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

export const CareerInsightsPage: React.FC = () => {
  const jobs = useMemo(() => getStoredJobs(), []);

  const byCategory = useMemo(() => {
    const map: Record<string, { count: number; totalMin: number; totalMax: number }> = {};
    jobs.forEach((j) => {
      const cat = j.category || 'Other';
      if (!map[cat]) map[cat] = { count: 0, totalMin: 0, totalMax: 0 };
      map[cat].count += 1;
      map[cat].totalMin += j.salaryMin;
      map[cat].totalMax += j.salaryMax;
    });
    return Object.entries(map)
      .map(([name, v]) => ({ name, count: v.count, avgMin: Math.round(v.totalMin / v.count), avgMax: Math.round(v.totalMax / v.count) }))
      .sort((a, b) => b.count - a.count);
  }, [jobs]);

  const maxCount = Math.max(...byCategory.map((c) => c.count), 1);

  const topSkills = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach((j) => (j.skills || []).forEach((s) => { counts[s] = (counts[s] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [jobs]);

  const maxSkill = topSkills.length ? topSkills[0][1] : 1;
  const remoteCount = jobs.filter((j) => j.isRemote).length;
  const avgSalary = jobs.length ? Math.round(jobs.reduce((s, j) => s + (j.salaryMin + j.salaryMax) / 2, 0) / jobs.length) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-2">
          <BarChart3 className="w-3.5 h-3.5" /><span>Career Insights</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Job Market Trends</h1>
        <p className="text-sm text-slate-500 mt-1">Live analytics across {jobs.length} listings and salary bands.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" /> Listings by Category
          </h2>
          <div className="space-y-3">
            {byCategory.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">{c.name}</span>
                  <span className="text-slate-500">{c.count} · ${(c.avgMin / 1000).toFixed(0)}k–${(c.avgMax / 1000).toFixed(0)}k</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${(c.count / maxCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Most In-Demand Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {topSkills.map(([skill, count]) => (
              <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                {skill}<span className="text-[10px] font-mono text-slate-400">{count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Ready to find your next role?</h3>
          <p className="text-sm text-indigo-100 mt-1">Browse {jobs.length} verified listings and apply today.</p>
        </div>
        <Link to="/explore" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 text-sm font-bold rounded-xl hover:bg-indigo-50 transition-colors">
          <span>Browse Jobs</span><ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Listings</div>
          <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Salary</div>
          <div className="text-2xl font-bold text-emerald-600">${(avgSalary / 1000).toFixed(0)}k</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Remote Roles</div>
          <div className="text-2xl font-bold text-indigo-600">{remoteCount}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Categories</div>
          <div className="text-2xl font-bold text-slate-900">{byCategory.length}</div>
        </div>
      </div>
    </div>
  );
};
