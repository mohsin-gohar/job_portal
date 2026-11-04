import React, { useState } from 'react';
import { Send, Search, MoreHorizontal, Paperclip } from 'lucide-react';

const conversations = [
  { id: 1, name: 'Sarah Chen', role: 'Recruiter at Stripeflow', last: 'Would you be open to a quick call this week?', time: '2h', unread: 2, avatar: 'S' },
  { id: 2, name: 'Linear Labs Hiring', role: 'Hiring Team', last: 'Thanks for applying! We reviewed your profile.', time: '1d', unread: 0, avatar: 'L' },
  { id: 3, name: 'Mike Johnson', role: 'Engineering Manager at Notion', last: 'Great to connect! Your React work looks solid.', time: '3d', unread: 0, avatar: 'M' },
];

export const MessagesPage: React.FC = () => {
  const [active, setActive] = useState(conversations[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
      <div className="bg-white border border-slate-200 rounded-2xl h-full flex overflow-hidden">
        <div className="w-80 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Messages</h2>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input placeholder="Search messages" className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full p-4 flex gap-3 text-left hover:bg-slate-50 transition-colors ${active.id === c.id ? 'bg-indigo-50' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-white flex items-center justify-center font-semibold shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-slate-900 truncate">{c.name}</span>
                    <span className="text-xs text-slate-400">{c.time}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">{c.role}</div>
                  <div className="text-xs text-slate-600 truncate mt-0.5">{c.last}</div>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center shrink-0">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-white flex items-center justify-center font-semibold">
                {active.avatar}
              </div>
              <div>
                <div className="font-medium text-slate-900">{active.name}</div>
                <div className="text-xs text-slate-500">{active.role}</div>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg"><MoreHorizontal className="w-5 h-5 text-slate-500" /></button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="max-w-md bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-800">
                Hi! I came across your profile and think you'd be a great fit for our Senior Frontend role. Would you be open to a quick chat this week?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-md bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
                Hi Sarah, thanks for reaching out! Yes, I'm open to hearing more. How about Thursday afternoon?
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg"><Paperclip className="w-5 h-5 text-slate-500" /></button>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
