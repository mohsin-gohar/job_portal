import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { JobApplication } from '../types/job';
import { LayoutDashboard, Briefcase, Clock, CheckCircle2, XCircle, Send, Calendar, ArrowRight } from 'lucide-react';

const COLUMNS: { key: JobApplication['status']; label: string; color: string }[] = [
  { key: 'Submitted', label: 'Submitted', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { key: 'In Review', label: 'In Review', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'Interview Scheduled', label: 'Interview', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'Offer Extended', label: 'Offer', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'Archived', label: 'Archived', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export const ApplicationTrackerPage: React.FC = () => {
  const { applications } = useApplication();
  const grouped = useMemo(() => {
    const map: Record<string, JobApplication[]> = {};
    COLUMNS.forEach((c) => (map[c.key] = []));
    applications.forEach((a) => {
      if (map[a.status]) map[a.status].push(a);
      else map['Submitted'].push(a);
    });
    return map;
  }, [applications]);

  const total = applications.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Application Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Track Your Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">Visualize every application from submission to offer.</p>
        </div>
        <Link to="/explore" className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
          <Briefcase className="w-4 h-4" />
          <span>Find More Jobs</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Applications</div>
          <div className="text-2xl font-bold text-slate-900">{total}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">In Review</div>
          <div className="text-2xl font-bold text-blue-600">{grouped['In Review'].length}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Interviews</div>
          <div className="text-2xl font-bold text-amber-600">{grouped['Interview Scheduled'].length}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Offers</div>
          <div className="text-2xl font-bold text-emerald-600">{grouped['Offer Extended'].length}</div>
        </div>
      </div>
      {total === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
            <LayoutDashboard className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">No applications yet</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Start applying to roles and track your progress here.</p>
          <Link to="/explore" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-500 transition-colors">
            <span>Browse Jobs</span><ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
      {total > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {COLUMNS.map((col) => (
            <div key={col.key} className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border mb-3 ${col.color}`}>
                <span className="text-xs font-bold uppercase tracking-wider">{col.label}</span>
                <span className="ml-auto text-xs font-bold">{grouped[col.key].length}</span>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {grouped[col.key].map((app) => (
                  <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs hover:shadow-soft transition-shadow">
                    <div className="text-sm font-bold text-slate-900 truncate">{app.jobTitle}</div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{app.company}</div>
                    <div className="text-[10px] text-slate-400 mt-2">Applied {new Date(app.appliedAt).toLocaleDateString()}</div>
                  </div>
                ))}
                {grouped[col.key].length === 0 && (
                  <div className="text-center text-[11px] text-slate-400 py-6">No applications</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
