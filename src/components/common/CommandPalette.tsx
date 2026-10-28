import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, ArrowRight, X, Briefcase, Building2, Users, FileText, Sparkles, Calculator, GitCompare, LayoutDashboard } from 'lucide-react';

interface CmdItem { id: string; label: string; hint?: string; icon: React.ReactNode; action: () => void; group: string; }

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); } }, [open]);

  const items: CmdItem[] = useMemo(() => [
    { id: 'home', label: 'Home', hint: '/', icon: <Sparkles className="w-4 h-4" />, action: () => navigate('/'), group: 'Navigate' },
    { id: 'explore', label: 'Explore Jobs', hint: '/explore', icon: <Briefcase className="w-4 h-4" />, action: () => navigate('/explore'), group: 'Navigate' },
    { id: 'companies', label: 'Companies', hint: '/companies', icon: <Building2 className="w-4 h-4" />, action: () => navigate('/companies'), group: 'Navigate' },
    { id: 'talent', label: 'Talent', hint: '/talent', icon: <Users className="w-4 h-4" />, action: () => navigate('/talent'), group: 'Navigate' },
    { id: 'ats', label: 'ATS Dashboard', hint: '/ats', icon: <FileText className="w-4 h-4" />, action: () => navigate('/ats'), group: 'Navigate' },
    { id: 'saved', label: 'Saved Jobs', hint: '/saved', icon: <Briefcase className="w-4 h-4" />, action: () => navigate('/saved'), group: 'Navigate' },
    { id: 'applications', label: 'Applications', hint: '/applications', icon: <FileText className="w-4 h-4" />, action: () => navigate('/applications'), group: 'Navigate' },
    { id: 'salary', label: 'Salary Calculator', hint: '/salary-calculator', icon: <Calculator className="w-4 h-4" />, action: () => navigate('/salary-calculator'), group: 'Tools' },
    { id: 'compare', label: 'Compare Jobs', hint: '/compare', icon: <GitCompare className="w-4 h-4" />, action: () => navigate('/compare'), group: 'Tools' },
    { id: 'tracker', label: 'Application Tracker', hint: '/tracker', icon: <LayoutDashboard className="w-4 h-4" />, action: () => navigate('/tracker'), group: 'Tools' },
    { id: 'about', label: 'About', hint: '/about', icon: <Sparkles className="w-4 h-4" />, action: () => navigate('/about'), group: 'Navigate' },
    { id: 'contact', label: 'Contact', hint: '/contact', icon: <FileText className="w-4 h-4" />, action: () => navigate('/contact'), group: 'Navigate' },
  ], [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.hint?.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map: Record<string, CmdItem[]> = {};
    filtered.forEach((i) => { if (!map[i.group]) map[i.group] = []; map[i.group].push(i); });
    return map;
  }, [filtered]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400" />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages, tools, actions..." className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400" />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded-md border border-slate-200">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {Object.keys(grouped).length === 0 && <div className="px-4 py-8 text-center text-sm text-slate-400">No results found.</div>}
          {Object.entries(grouped).map(([group, list]) => (
            <div key={group} className="mb-2">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{group}</div>
              {list.map((item) => (
                <button key={item.id} onClick={() => { item.action(); setOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group">
                  <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{item.icon}</span>
                  <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-slate-900">{item.label}</span>
                  {item.hint && <span className="text-[11px] font-mono text-slate-400">{item.hint}</span>}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><Command className="w-3 h-3" /><span>Press Ctrl/⌘K to toggle</span></span>
          <span>↑↓ navigate · Enter select</span>
        </div>
      </div>
    </div>
  );
};
