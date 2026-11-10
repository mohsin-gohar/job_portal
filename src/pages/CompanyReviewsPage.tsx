import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Filter, Building2 } from 'lucide-react';

const reviews = [
  { id: 1, company: 'Linear Labs', rating: 4.6, role: 'Senior Frontend Engineer', pros: 'Great engineering culture, modern stack, excellent work-life balance', cons: 'Fast-paced, high expectations', date: '2 weeks ago', helpful: 24 },
  { id: 2, company: 'Anthra Neural', rating: 4.2, role: 'ML Engineer', pros: 'Cutting-edge AI work, strong compensation, smart colleagues', cons: 'Long hours during product launches', date: '1 month ago', helpful: 18 },
  { id: 3, company: 'Stripeflow', rating: 4.8, role: 'Product Designer', pros: 'Beautiful product, collaborative design team, remote-friendly', cons: 'Documentation could be better', date: '3 weeks ago', helpful: 31 },
  { id: 4, company: 'Notion', rating: 4.4, role: 'Full Stack Engineer', pros: 'Flexible hours, strong benefits, interesting product challenges', cons: 'Some process overhead', date: '5 days ago', helpful: 12 },
];

export const CompanyReviewsPage: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-7 h-7 text-amber-500" /> Company Reviews
          </h1>
          <p className="text-sm text-slate-500 mt-1">Real employee reviews from verified tech professionals</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800">
          Write a Review
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', '4+ Stars', 'Engineering', 'Product', 'Design'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  {r.company.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{r.company}</div>
                  <div className="text-xs text-slate-500">{r.role} · {r.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-sm font-medium">
                <Star className="w-4 h-4 fill-amber-500" /> {r.rating}
              </div>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs font-medium text-emerald-700 mb-1">Pros</div>
                <p className="text-slate-600">{r.pros}</p>
              </div>
              <div>
                <div className="text-xs font-medium text-rose-700 mb-1">Cons</div>
                <p className="text-slate-600">{r.cons}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <button className="flex items-center gap-1 hover:text-slate-700">
                <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({r.helpful})
              </button>
              <button className="flex items-center gap-1 hover:text-slate-700">
                <MessageSquare className="w-3.5 h-3.5" /> Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
