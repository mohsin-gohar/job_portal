import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No jobs found matching your criteria',
  description = 'Try widening your search terms, removing active filters, or selecting all categories.',
  onReset,
  resetText = 'Clear All Filters',
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-10 sm:p-14 text-center max-w-lg mx-auto shadow-soft">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500 mb-5 ring-1 ring-slate-200/70">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-display font-bold text-slate-950 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
      {onReset && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-950 rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{resetText}</span>
          </button>
        </div>
      )}
    </div>
  );
};
