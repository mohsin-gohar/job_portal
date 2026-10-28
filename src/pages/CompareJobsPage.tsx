import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { Job } from '../types/job';
import {
  ArrowLeft,
  GitCompare,
  Plus,
  X,
  MapPin,
  DollarSign,
  Search,
  ArrowRight,
} from 'lucide-react';

export const CompareJobsPage: React.FC = () => {
  const { jobs } = useJobs();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  const selectedJobs = useMemo(
    () => selectedIds.map((id) => jobs.find((j) => j.id === id)).filter(Boolean) as Job[],
    [selectedIds, jobs]
  );

  const filteredPickerJobs = useMemo(() => {
    const q = pickerSearch.trim().toLowerCase();
    return jobs.filter((j) => {
      if (selectedIds.includes(j.id)) return false;
      if (!q) return true;
      return j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    });
  }, [jobs, selectedIds, pickerSearch]);

  const addJob = (id: string) => {
    if (selectedIds.length >= 4) return;
    setSelectedIds((prev) => [...prev, id]);
    setPickerOpen(false);
    setPickerSearch('');
  };

  const removeJob = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const formatSalary = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-2">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Job Comparison Tool</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Compare Jobs Side-by-Side
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Select up to 4 roles to compare salary, benefits, skills and more.
          </p>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Browse Jobs</span>
        </Link>
      </div>
      {selectedJobs.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <GitCompare className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">No jobs selected yet</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
            Add up to 4 jobs to compare their salary, location, skills, and benefits in a clean table.
          </p>
          <button
            onClick={() => setPickerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Job</span>
          </button>
        </div>
      )}
    </div>
  );
};
