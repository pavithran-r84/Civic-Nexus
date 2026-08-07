import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileText, Building2, HeartHandshake, Users, Home, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export function OverviewPage() {
  const navigate = useNavigate();
  const { currentIssue } = useApp();

  if (!currentIssue) {
    return <div className="page-wrapper container">No active issue context found.</div>;
  }

  const st = currentIssue.stakeholderStatus || {};
  const coord = currentIssue.coordinationResult;

  const stakeholders = [
    {
      role: 'Municipality',
      name: coord?.primary?.name || 'Green Park Municipality',
      status: st.municipality || 'Pending Review',
      reason: coord?.primary?.matchReason || 'Jurisdictional authority for this ward',
      icon: Building2,
      color: '#4f46e5'
    },
    {
      role: 'NGO',
      name: coord?.support?.find(s => s.role === 'NGO')?.name || 'CleanCity NGO',
      status: st.ngo || 'Waiting for Municipality Acceptance',
      reason: coord?.support?.find(s => s.role === 'NGO')?.matchReason || 'Active in Green Park, specializes in waste management',
      icon: HeartHandshake,
      color: '#059669'
    },
    {
      role: 'Volunteers',
      name: coord?.support?.find(s => s.role === 'Volunteers')?.name || 'Green Park Youth Volunteers',
      status: st.volunteers || 'Waiting for Municipality Acceptance',
      reason: coord?.support?.find(s => s.role === 'Volunteers')?.matchReason || '12 active members, covers the school zone area',
      icon: Users,
      color: '#d97706'
    },
    {
      role: 'RWA',
      name: coord?.support?.find(s => s.role === 'RWA')?.name || 'Green Park Residents Welfare Association',
      status: st.rwa || 'Waiting for Municipality Acceptance',
      reason: coord?.support?.find(s => s.role === 'RWA')?.matchReason || 'Represents residents directly affected in this locality',
      icon: Home,
      color: '#7c3aed'
    }
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <FileText size={14} /> Single Source of Truth Overview
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Multi-Stakeholder Issue Status</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Real-time shared state across Citizen, Municipality, NGO, Volunteers, and RWA.
          </p>
        </div>

        {/* Issue Card */}
        <div className="card card-hero" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>
                  Issue #{currentIssue.id}
                </span>
                <span className="badge badge-high" style={{ fontSize: '0.7rem' }}>
                  {currentIssue.aiAnalysis?.priority || 'High'} Priority
                </span>
              </div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{currentIssue.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={14} color="var(--rose-600)" /> {currentIssue.location} | Reported by {currentIssue.reporter}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-status-progress" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                Status: {currentIssue.status}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Stakeholder Status Cards with Visible Match Reasons */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--brand-primary)" /> Per-Stakeholder Participation & Reasoning
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {stakeholders.map((s, idx) => {
              const Icon = s.icon;
              const isDone = s.status.includes('Accepted') || s.status.includes('Joined') || s.status.includes('Acknowledged') || s.status.includes('Resolved');
              return (
                <div key={idx} className="card" style={{ borderTop: `4px solid ${s.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={18} color={s.color} />
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: s.color }}>{s.role}</span>
                    </div>
                    <span className={`badge ${isDone ? 'badge-status-resolved' : 'badge-status-pending'}`} style={{ fontSize: '0.7rem' }}>
                      {isDone ? <CheckCircle2 size={12} /> : null} {s.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{s.name}</h4>

                  <div style={{
                    background: 'var(--bg-subtle)',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    borderLeft: `3px solid ${s.color}`
                  }}>
                    <strong>Engine Reason:</strong> "{s.reason}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Embedded Action Navigation */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/coordination')} className="btn btn-primary">
            View Coordination Engine ★ <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Go to Stakeholder Action Dashboard
          </button>
          <button onClick={() => navigate('/timeline')} className="btn btn-secondary">
            View Verification & Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
