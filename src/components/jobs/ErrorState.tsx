import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-white border border-rose-200/80 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-soft">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto text-rose-600 mb-5 ring-1 ring-rose-200/70">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-display font-bold text-slate-950 tracking-tight">API Request Failed</h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
        {error}
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-950 rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
};
