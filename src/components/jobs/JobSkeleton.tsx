import React from 'react';

export const JobSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 animate-pulse space-y-4 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 w-full">
          <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
          <div className="space-y-2 w-3/4">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-5 bg-slate-200 rounded w-2/3" />
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-slate-100 shrink-0" />
      </div>
      <div className="space-y-2 pt-1">
        <div className="h-3.5 bg-slate-200 rounded w-full" />
        <div className="h-3.5 bg-slate-200 rounded w-4/5" />
      </div>
      <div className="h-3 bg-slate-100 rounded w-1/2" />
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="h-3.5 bg-slate-200 rounded w-1/2" />
        <div className="h-8 bg-slate-200 rounded-xl w-20 shrink-0" />
      </div>
    </div>
  );
};
