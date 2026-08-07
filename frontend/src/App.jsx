import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ReportIssuePage } from './modules/citizen-report/ReportIssuePage';
import { AIAnalysisView } from './modules/ai-analysis/AIAnalysisView';
import { CoordinationView } from './modules/coordination-engine/CoordinationView';
import { StakeholderDashboardPage } from './modules/stakeholder-dashboard/StakeholderDashboardPage';
import { OverviewPage } from './components/OverviewPage';
import { IssueTimelinePage } from './modules/resolution-verification/IssueTimelinePage';
import { CommunityAnalyticsPage } from './modules/community-analytics/CommunityAnalyticsPage';

export function App() {
  return (
    <AppProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/report" element={<ReportIssuePage />} />
              <Route path="/ai-analysis" element={<AIAnalysisView />} />
              <Route path="/coordination" element={<CoordinationView />} />
              <Route path="/dashboard" element={<StakeholderDashboardPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/timeline" element={<IssueTimelinePage />} />
              <Route path="/analytics" element={<CommunityAnalyticsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>

          {/* Minimal Clean Footer */}
          <footer style={{
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.5rem 0',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <strong>Civic Nexus</strong> — Multi-Stakeholder Community Coordination Engine
              </div>
              <div>
                Green Park Ward 4 Demo | Population 5,000 | 1 km²
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
