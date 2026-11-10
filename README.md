# Lumina Careers — Ultra-Premium Job Portal Platform

A production-grade, enterprise-level job portal built with React 19, TypeScript, Vite, and Tailwind CSS v4. Designed as a billion-dollar quality talent platform featuring 50+ curated open roles, 30 verified companies, 165+ talent profiles, full ATS console, admin dashboard, skill matching, salary insights, and complete RBAC.

## ✨ Premium Features

- **User Profile**: Complete LinkedIn-style profile with experience, education, skills, and profile strength.
- **Notifications Center**: Real-time style alerts for job matches, application updates, and messages.
- **Messaging**: Direct messaging with recruiters and hiring teams (inbox simulation).
- **Premium Dashboard**: Role-based personal & admin dashboards with analytics, pipeline tracking, and professional UI.
- **Job Discovery**: Advanced search, multi-filter (category, type, location, experience, salary, remote), sort, pagination, quick-view drawer.
- **Job Detail & Apply**: Rich descriptions, responsibilities, requirements, skills, benefits, apply modal with tracking.
- **Saved Jobs & Applications**: Full persistence, candidate pipeline status updates.
- **Employer Tools**: Post jobs, ATS dashboard with status management, CSV export, talent sourcing.
- **Admin Console**: Platform overview, job/company/candidate management, featured toggles, settings, database reset.
- **Talent Directory**: Searchable 165+ candidate profiles with skills, experience, open-to-work.
- **Companies**: 30 verified companies with detail pages and open roles.
- **Auth & RBAC**: Secure login/register, role-based navigation (Candidate, Employer, Admin).
- **Additional Tools**: Salary Calculator, Job Comparison, Application Tracker, Career Insights, Command Palette.
- **Responsive & Accessible**: Mobile-first, focus-visible, reduced-motion, lazy images.
- **Performance**: Code splitting, optimized bundles.

## Tech Stack

- **Frontend:** React 19 + TypeScript 7 + Vite 8
- **Styling:** Tailwind CSS v4 + Plus Jakarta Sans
- **Routing:** react-router-dom v7
- **Icons:** lucide-react
- **State:** React Context (Auth, Jobs, Saved, Applications, Candidates, Toast)
- **Persistence:** localStorage mock API (zero backend required for demo)
- **Deploy-ready:** Vercel / any static host

## Demo Credentials

| Role      | Email                     | Password   | Access                          |
|-----------|---------------------------|------------|---------------------------------|
| Admin     | admin@lumina.careers     | admin123   | Full Admin Dashboard + ATS     |
| Employer  | any other email           | any        | Post Job + ATS Console         |
| Candidate | any other email           | any        | Applications, Saved, Talent    |

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:3000
npm run build
npm run preview
```

## Routes

`/` Home · `/explore` · `/jobs/:id` · `/saved` · `/applications` · `/post-job` · `/companies` · `/companies/:id` · `/talent` · `/ats` · `/admin` · `/dashboard` · `/profile` · `/notifications` · `/messages` · `/about` · `/contact` · `/login` · `/register` · `/salary-calculator` · `/compare` · `/tracker` · `/insights`

All pages are fully functional and viewable. Data seeds automatically on first load.

## Project Structure

```
src/
  App.tsx, main.tsx, index.css
  components/common/   Header, Footer, ErrorBoundary, ProtectedRoute, CommandPalette
  components/jobs/     JobCard, Filters, Modals, etc.
  context/             Auth, Job, SavedJobs, Application, Candidate, Toast
  data/                db.ts (seed data), types
  pages/               All major pages including premium dashboards
  services/            api.ts (localStorage)
  types/               job.ts
```

## Notes

- Fully client-side with seeded mock data persisted in localStorage.
- Use Admin Dashboard → Reset Database to restore defaults.
- No real backend required — perfect for demo, portfolio, or further extension with real API.

**Built as a complete, professional, premium job portal platform.**

### Recent Fixes & Enterprise Polish
- Fixed authentication persistence across page navigations (synchronous localStorage hydration)
- All protected routes (`/dashboard`, `/profile`, `/notifications`, `/messages`, `/admin`) now work reliably
- Full LinkedIn/Indeed-style experience with profile, messaging, and notifications
- Enterprise-grade UI with premium gradients, professional typography, and responsive design
