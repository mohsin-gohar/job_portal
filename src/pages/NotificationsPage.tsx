import React from 'react';
import { Bell, Briefcase, Users, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

const notifications = [
  { id: 1, type: 'job', title: 'New job matches your skills', desc: 'Senior Frontend Engineer at Linear Labs is a 92% match', time: '2h ago', unread: true },
  { id: 2, type: 'application', title: 'Application status updated', desc: 'Your application for Product Designer at Anthra Neural moved to Interview', time: '5h ago', unread: true },
  { id: 3, type: 'message', title: 'New message from recruiter', desc: 'Sarah from Stripeflow sent you a message', time: '1d ago', unread: false },
  { id: 4, type: 'network', title: 'Someone viewed your profile', desc: 'A hiring manager at Notion viewed your profile', time: '2d ago', unread: false },
  { id: 5, type: 'job', title: 'Saved job is closing soon', desc: 'Staff Engineer role at Vercel expires in 3 days', time: '3d ago', unread: false },
];

const icons: Record<string, React.ReactNode> = {
  job: <Briefcase className="w-4 h-4" />,
  application: <CheckCircle2 className="w-4 h-4" />,
  message: <MessageSquare className="w-4 h-4" />,
  network: <Users className="w-4 h-4" />,
};

export const NotificationsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6" /> Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">Stay updated on your job search and applications</p>
        </div>
        <button className="text-sm text-indigo-600 font-medium">Mark all as read</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors ${n.unread ? 'bg-indigo-50/30' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.unread ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
              {icons[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900 text-sm">{n.title}</span>
                {n.unread && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
              </div>
              <p className="text-sm text-slate-600 mt-0.5">{n.desc}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" /> {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
