import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCandidate } from '../context/CandidateContext';
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Edit3,
  Plus,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  Download,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { candidateSkills } = useCandidate();
  const [editing, setEditing] = useState(false);

  const profile = {
    name: user?.name || 'Alex Chen',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    about: 'Passionate full-stack engineer with 6+ years building high-performance web applications. Specialized in React, TypeScript, and design systems. Open to senior IC and tech lead roles.',
    email: user?.email || 'alex@example.com',
    phone: '+1 (415) 555-0123',
    website: 'alexchen.dev',
    experience: [
      { role: 'Senior Frontend Engineer', company: 'Linear Labs', period: '2023 – Present', desc: 'Led the design system and canvas performance optimizations.' },
      { role: 'Frontend Engineer', company: 'Stripeflow', period: '2020 – 2023', desc: 'Built the billing dashboard and real-time payment flows.' },
    ],
    education: [
      { degree: 'B.S. Computer Science', school: 'Stanford University', year: '2019' },
    ],
  };

  const completion = 78;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-3xl font-bold shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{profile.name}</h1>
              <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Open to work</span>
            </div>
            <p className="text-lg text-slate-300">{profile.title}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location}</span>
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {profile.email}</span>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            {editing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">Profile Strength</h2>
          <span className="text-sm font-mono text-emerald-600">{completion}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-2 rounded-full" style={{ width: `${completion}%` }} />
        </div>
        <p className="text-xs text-slate-500 mt-2">Add 2 more skills and a project to reach 100%</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-900 mb-3">About</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{profile.about}</p>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Experience</h2>
              <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
            </div>
            <div className="space-y-5">
              {profile.experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{exp.role}</div>
                    <div className="text-sm text-slate-600">{exp.company} · {exp.period}</div>
                    <p className="text-sm text-slate-500 mt-1">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Education</h2>
              <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
            </div>
            {profile.education.map((edu, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{edu.degree}</div>
                  <div className="text-sm text-slate-600">{edu.school} · {edu.year}</div>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-900">Skills</h2>
              <button className="text-xs text-indigo-600 font-medium">+ Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(candidateSkills.length ? candidateSkills : ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Next.js']).map((skill) => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">{skill}</span>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            <h2 className="font-semibold text-slate-900">Contact Info</h2>
            <div className="text-sm space-y-2 text-slate-600">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {profile.email}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {profile.phone}</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> {profile.website}</div>
            </div>
            <button className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
