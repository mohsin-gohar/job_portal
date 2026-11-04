import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { JobProvider } from './context/JobContext';
import { SavedJobsProvider } from './context/SavedJobsContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { CandidateProvider } from './context/CandidateContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage').then((m) => ({ default: m.JobDetailPage })));
const SavedJobsPage = lazy(() => import('./pages/SavedJobsPage').then((m) => ({ default: m.SavedJobsPage })));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage })));
const PostJobPage = lazy(() => import('./pages/PostJobPage').then((m) => ({ default: m.PostJobPage })));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage').then((m) => ({ default: m.CompaniesPage })));
const CompanyDetailPage = lazy(() => import('./pages/CompanyDetailPage').then((m) => ({ default: m.CompanyDetailPage })));
const TalentPage = lazy(() => import('./pages/TalentPage').then((m) => ({ default: m.TalentPage })));
const AtsDashboardPage = lazy(() => import('./pages/AtsDashboardPage').then((m) => ({ default: m.AtsDashboardPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ExplorePage = lazy(() => import('./pages/ExplorePage').then((m) => ({ default: m.ExplorePage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const SalaryCalculatorPage = lazy(() => import('./pages/SalaryCalculatorPage').then((m) => ({ default: m.SalaryCalculatorPage })));
const CompareJobsPage = lazy(() => import('./pages/CompareJobsPage').then((m) => ({ default: m.CompareJobsPage })));
const ApplicationTrackerPage = lazy(() => import('./pages/ApplicationTrackerPage').then((m) => ({ default: m.ApplicationTrackerPage })));
const CareerInsightsPage = lazy(() => import('./pages/CareerInsightsPage').then((m) => ({ default: m.CareerInsightsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const MessagesPage = lazy(() => import('./pages/MessagesPage').then((m) => ({ default: m.MessagesPage })));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <JobProvider>
            <SavedJobsProvider>
              <ApplicationProvider>
                <CandidateProvider>
                  <div className="min-h-screen flex flex-col bg-slate-50">
                    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white">
                      Skip to main content
                    </a>
                    <Header />
                    <CommandPalette />
                    <main id="main-content" className="flex-1" tabIndex={-1}>
                      <ErrorBoundary>
                        <Suspense fallback={<PageFallback />}>
                          <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/explore" element={<ExplorePage />} />
                            <Route path="/jobs/:id" element={<JobDetailPage />} />
                            <Route path="/saved" element={<SavedJobsPage />} />
                            <Route path="/applications" element={<ApplicationsPage />} />
                            <Route path="/post-job" element={<PostJobPage />} />
                            <Route path="/companies" element={<CompaniesPage />} />
                            <Route path="/companies/:id" element={<CompanyDetailPage />} />
                            <Route path="/talent" element={<TalentPage />} />
                            <Route path="/ats" element={<AtsDashboardPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/salary-calculator" element={<SalaryCalculatorPage />} />
                            <Route path="/compare" element={<CompareJobsPage />} />
                            <Route path="/tracker" element={<ApplicationTrackerPage />} />
                            <Route path="/insights" element={<CareerInsightsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
                            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                            <Route path="*" element={<NotFoundPage />} />
                          </Routes>
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                    <Footer />
                  </div>
                </CandidateProvider>
              </ApplicationProvider>
            </SavedJobsProvider>
          </JobProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
