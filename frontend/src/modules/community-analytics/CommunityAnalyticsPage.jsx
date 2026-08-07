import React, { useEffect, useState } from 'react';
import { getCommunityStats } from '../../api/issuesApi';
import { BarChart3, CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';

export function CommunityAnalyticsPage() {
  const [stats, setStats] = useState({
    totalIssues: 142,
    resolvedIssues: 118,
    pendingIssues: 24,
    avgResolutionTime: '5.2h',
    topIssue: 'Garbage'
  });

  useEffect(() => {
    getCommunityStats().then(data => {
      if (data) setStats(data);
    });
  }, []);

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <BarChart3 size={14} /> Locality Performance Metrics
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Green Park Analytics Overview</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            High-level operational stats for Green Park locality (Population 5,000 | Area 1 km²).
          </p>
        </div>

        {/* Minimal KPI Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <Layers size={24} color="var(--brand-primary)" style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.totalIssues}</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Reports</div>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <CheckCircle2 size={24} color="var(--emerald-600)" style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald-600)' }}>{stats.resolvedIssues}</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Resolved Issues</div>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <AlertTriangle size={24} color="var(--amber-600)" style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--amber-600)' }}>{stats.pendingIssues}</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Action</div>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Clock size={24} color="var(--sky-600)" style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--sky-600)' }}>{stats.avgResolutionTime}</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg SLA Resolution</div>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>🗑️</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.topIssue}</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Top Issue Category</div>
          </div>
        </div>
      </div>
    </div>
  );
}
