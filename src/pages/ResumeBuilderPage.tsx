import React, { useState } from 'react';
import { FileText, Download, Eye, Plus, Trash2 } from 'lucide-react';

export const ResumeBuilderPage: React.FC = () => {
  const [sections, setSections] = useState([
    { id: 1, title: 'Professional Summary', content: 'Senior Frontend Engineer with 6+ years of experience building scalable React applications...' },
    { id: 2, title: 'Experience', content: 'Linear Labs — Senior Frontend Engineer (2023–Present)\n• Led design system architecture\n• Improved canvas performance by 40%' },
    { id: 3, title: 'Skills', content: 'React, TypeScript, Tailwind CSS, Node.js, GraphQL, Next.js, Testing' },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-7 h-7" /> Resume Builder
          </h1>
          <p className="text-sm text-slate-500 mt-1">Create a professional resume optimized for tech roles</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl hover:bg-slate-50">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((s) => (
            <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <button className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
              <textarea
                defaultValue={s.content}
                className="w-full min-h-[100px] text-sm text-slate-700 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-y"
              />
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-2xl text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Section
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Resume Strength</h3>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-2 rounded-full" style={{ width: '82%' }} />
            </div>
            <div className="text-sm text-emerald-600 font-medium">82% Complete</div>
            <ul className="mt-3 text-xs text-slate-500 space-y-1">
              <li>✓ Professional summary</li>
              <li>✓ Work experience</li>
              <li>✓ Skills listed</li>
              <li>○ Add education</li>
              <li>○ Add projects</li>
            </ul>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
            <h3 className="font-semibold text-indigo-900 text-sm mb-2">ATS Tips</h3>
            <ul className="text-xs text-indigo-700 space-y-1.5">
              <li>• Use standard section headings</li>
              <li>• Include keywords from job descriptions</li>
              <li>• Quantify achievements with numbers</li>
              <li>• Keep formatting simple and clean</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
