import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { CheckCircle2, Clock, ShieldCheck, User, Building2, HeartHandshake, Users, Home, Sparkles } from 'lucide-react';

export function IssueTimelinePage() {
  const { currentIssue } = useApp();

  const isResolved = currentIssue?.status === 'Resolved';

  useEffect(() => {
    if (isResolved) {
      // Trigger canvas-confetti celebration once upon resolution
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti trigger exception:', e);
      }
    }
  }, [isResolved]);

  if (!currentIssue) {
    return <div className="page-wrapper container">No active issue context.</div>;
  }

  const timeline = currentIssue.timeline || [];

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'report': return <User size={16} color="var(--brand-primary)" />;
      case 'ai': return <Sparkles size={16} color="#8b5cf6" />;
      case 'coordination':
      case 'municipality': return <Building2 size={16} color="var(--brand-primary)" />;
      case 'ngo': return <HeartHandshake size={16} color="var(--emerald-600)" />;
      case 'volunteers': return <Users size={16} color="var(--amber-600)" />;
      case 'rwa': return <Home size={16} color="#7c3aed" />;
      default: return <Clock size={16} color="var(--text-muted)" />;
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Verification Success Header (if resolved) */}
        {isResolved && (
          <div className="card card-hero" style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '2px solid var(--emerald-500)',
            marginBottom: '2rem',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--emerald-600)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 20px rgba(5, 150, 105, 0.35)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h1 style={{ color: '#065f46', fontSize: '2rem', marginBottom: '0.5rem' }}>
              Issue Verified & Resolved Successfully!
            </h1>
            <p style={{ color: '#047857', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              Multi-stakeholder collaboration complete. Green Park Municipality, CleanCity NGO, Youth Volunteers, and RWA successfully restored sanitation near Green Park Government School.
            </p>

            <div style={{ display: 'inline-flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="badge badge-status-resolved" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                Total Resolution Time: 4.8 Hours
              </span>
              <span className="badge badge-status-resolved" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                4 Stakeholder Organizations Participating
              </span>
            </div>
          </div>
        )}

        {/* Issue Summary Banner */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Report #{currentIssue.id} Timeline & Audit Log
          </span>
          <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
            {currentIssue.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            📍 {currentIssue.location} | Reported by {currentIssue.reporter}
          </p>
        </div>

        {/* Before / After Evidence Slider */}
        <div className="card" style={{ marginBottom: '2.5rem' }}>
          <BeforeAfterSlider
            beforePhoto={currentIssue.beforePhoto}
            afterPhoto={currentIssue.afterPhoto}
          />
        </div>

        {/* Chronological Audit Log Timeline */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="var(--brand-primary)" /> Multi-Stakeholder Action Log
          </h3>

          <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
            {/* Vertical timeline spine */}
            <div style={{
              position: 'absolute',
              top: '8px',
              bottom: '8px',
              left: '19px',
              width: '2px',
              background: 'var(--border-subtle)'
            }} />

            {timeline.map((item, idx) => (
              <div key={item.id || idx} style={{ position: 'relative', paddingBottom: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {/* Node icon */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '2px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  flexShrink: 0,
                  marginLeft: '-23px'
                }}>
                  {getTimelineIcon(item.type)}
                </div>

                <div style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1.1rem',
                  flex: 1,
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {item.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-primary)', marginBottom: '0.35rem' }}>
                    Actor: {item.actor}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
