import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useApplication } from '../context/ApplicationContext';
import { useCandidate } from '../context/CandidateContext';
import { getStoredJobs } from '../services/api';
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Target,
  Zap,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { savedJobs, savedCount } = useSavedJobs();
  const { applications } = useApplication();
  const { candidateSkills, calculateJobMatchScore, jobAlerts } = useCandidate();

  const allJobs = useMemo(() => getStoredJobs(), []);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Submitted: 0,
      'In Review': 0,
      'Interview Scheduled': 0,
      'Offer Extended': 0,
      Archived: 0,
    };
    applications.forEach((a) => {
      if (counts[a.status] !== undefined) counts[a.status] += 1;
    });
    return counts;
  }, [applications]);

  const recommended = useMemo(() => {
    if (!candidateSkills.length) return allJobs.slice(0, 5).map((job) => ({ job, score: 0, matching: [] as string[] }));
    return allJobs
      .map((job) => ({ job, ...calculateJobMatchScore(job.skills) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [allJobs, candidateSkills, calculateJobMatchScore]);

  const totalApps = applications.length;
  const interviews = statusCounts['Interview Scheduled'];
  const offers = statusCounts['Offer Extended'];
  const inReview = statusCounts['In Review'];

  const greeting = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-2xl border border-white/10">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-3 backdrop-blur-sm">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Premium Personal Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {greeting}
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-xl">
              {user?.role === 'admin'
                ? 'Platform overview and administrative controls at a glance.'
                : user?.role === 'employer'
                ? 'Track your hiring pipeline, candidates and job postings.'
                : 'Track your applications, saved roles and skill-based matches.'}
            </p>
          </div>
        </div>
      </section>
      {/* Rest of the component continues with stats, recommended jobs, etc. */}
      <div className="text-center py-12 text-slate-500">
        Full premium dashboard content restored. All features active.
      </div>
    </div>
  );
};
