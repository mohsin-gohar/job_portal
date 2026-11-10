import React, { useState } from 'react';
import { Users, UserPlus, MessageSquare, Search, MapPin } from 'lucide-react';

const people = [
  { id: 1, name: 'Sarah Chen', title: 'Recruiter at Stripeflow', location: 'San Francisco', mutual: 12, avatar: 'S' },
  { id: 2, name: 'Alex Rivera', title: 'Staff Engineer at Linear', location: 'Remote', mutual: 8, avatar: 'A' },
  { id: 3, name: 'Priya Sharma', title: 'Product Manager at Anthra', location: 'New York', mutual: 5, avatar: 'P' },
  { id: 4, name: 'Jordan Lee', title: 'Design Lead at Notion', location: 'Seattle', mutual: 15, avatar: 'J' },
  { id: 5, name: 'Mike Johnson', title: 'Engineering Manager', location: 'Austin', mutual: 3, avatar: 'M' },
];

export const NetworkPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = people.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-7 h-7" /> My Network
        </h1>
        <p className="text-sm text-slate-500 mt-1">Connect with recruiters, engineers, and hiring managers</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search people by name or title..."
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 text-center hover:shadow-sm transition-shadow">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-white text-xl font-bold flex items-center justify-center mx-auto">
              {p.avatar}
            </div>
            <div className="mt-3 font-semibold text-slate-900">{p.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">{p.title}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-1">
              <MapPin className="w-3 h-3" /> {p.location}
            </div>
            <div className="text-xs text-indigo-600 mt-2">{p.mutual} mutual connections</div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-950 text-white text-xs font-medium rounded-lg hover:bg-slate-800">
                <UserPlus className="w-3.5 h-3.5" /> Connect
              </button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <MessageSquare className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
