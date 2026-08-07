import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { computeCoordination } from './CoordinationEngine';
import { Network, Building2, HeartHandshake, Users, Home, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export function CoordinationView() {
  const navigate = useNavigate();
  const { currentIssue, updateIssueState, activeRole, setActiveRole } = useApp();

  const [coordination, setCoordination] = useState(currentIssue?.coordinationResult || null);
  const [revealed, setRevealed] = useState(false);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    if (currentIssue) {
      if (currentIssue.coordinationResult) {
        setCoordination(currentIssue.coordinationResult);
      } else {
        const computed = computeCoordination(currentIssue);
        setCoordination(computed);
      }
    }
  }, [currentIssue]);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCoordination = async () => {
    if (!currentIssue) return;
    setAccepting(true);
    try {
      const updatedCoordination = coordination || computeCoordination(currentIssue);

      const updates = {
        status: 'Accepted — Coordinating Support',
        coordinationResult: updatedCoordination,
        stakeholderStatus: {
          municipality: 'Accepted & Coordinating',
          ngo: 'Pending Join',
          volunteers: 'Pending Join',
          rwa: 'Pending Acknowledgment'
        },
        timeline: [
          ...(currentIssue.timeline || []),
          {
            id: `t-${Date.now()}`,
            title: 'Municipality Accepted & Team Mobilized',
            actor: 'Green Park Municipality',
            timestamp: new Date().toISOString(),
            details: 'Municipality approved AI analysis & activated CleanCity NGO, Youth Volunteers, and RWA for joint response.',
            type: 'coordination'
          }
        ]
      };

      await updateIssueState(updates);
      setCoordination(updatedCoordination);
    } catch (err) {
      console.error('Failed to accept coordination:', err);
      alert('Could not update status. Please check backend connection.');
    } finally {
      setAccepting(false);
    }
  };

  if (!currentIssue) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>No Active Issue Selected</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Select or report an issue to run the Coordination Engine.</p>
        <button onClick={() => navigate('/report')} className="btn btn-primary">Report Issue</button>
      </div>
    );
  }

  const isAccepted = currentIssue.status !== 'Pending Municipality Review';

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Hero Banner Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.85rem', padding: '0.4rem 1rem', fontSize: '0.825rem' }}>
            <Network size={16} /> ★ The Core Innovation Engine
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: '1.2' }}>
            Who Should Collaborate on This Issue?
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            background: 'var(--bg-accent-light)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-accent)',
            marginTop: '1rem'
          }}>
            "The Coordination Engine matches organizations using service area, specialization, and real-time availability — <strong>AI understands the issue, this engine decides who should act on it together.</strong>"
          </p>
        </div>

        {/* Issue Target Banner */}
        <div className="card" style={{ marginBottom: '2rem', background: '#ffffff', border: '1px solid var(--border-accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand-primary)', fontWeight: 700 }}>
                Active Target Issue: #{currentIssue.id}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>{currentIssue.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                📍 {currentIssue.location} | Category: <strong>{currentIssue.aiAnalysis?.category || 'Garbage Accumulation'}</strong> | Urgency: <strong>{currentIssue.aiAnalysis?.priority || 'High'}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={`badge ${isAccepted ? 'badge-status-progress' : 'badge-status-pending'}`} style={{ padding: '0.4rem 0.85rem' }}>
                Status: {currentIssue.status}
              </span>
            </div>
          </div>
        </div>

        {/* CONNECTING GRAPHIC & NETWORK VISUALIZATION */}
        <div className="card" style={{
          marginBottom: '2.5rem',
          background: 'linear-gradient(180deg, #ffffff 0%, #f4f4ff 100%)',
          border: '2px solid var(--brand-light)',
          padding: '2rem',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow circle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-primary)', letterSpacing: '0.05em' }}>
              Multi-Stakeholder Convergence Topology
            </span>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Synthesizing Jurisdiction + Domain Specialization + Zone Proximity
            </h3>
          </div>

          {/* Connected Topology Diagram */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Center Issue Node */}
            <div style={{
              gridColumn: '1 / -1',
              justifySelf: 'center',
              background: 'var(--brand-primary)',
              color: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 10px 25px rgba(79, 70, 229, 0.35)',
              textAlign: 'center',
              maxWidth: '450px',
              width: '100%',
              border: '3px solid #ffffff'
            }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.9, letterSpacing: '0.05em' }}>
                Center Issue Anchor
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.2rem' }}>
                {currentIssue.title}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.25rem' }}>
                Green Park Ward 4 | High Urgency
              </div>
            </div>
          </div>
        </div>

        {/* STAKEHOLDER REVEAL SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* PRIMARY LEAD STAKEHOLDER (Municipality) */}
          {coordination?.primary && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Building2 size={22} color="var(--brand-primary)" />
                <h2 style={{ fontSize: '1.35rem' }}>Primary Lead Authority</h2>
                <span className="badge badge-primary" style={{ marginLeft: '0.5rem' }}>Mandatory Lead</span>
              </div>

              <div className="stakeholder-card primary animate-fade-in" style={{ opacity: revealed ? 1 : 0, transitionDelay: '100ms' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--brand-primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                          {coordination.primary.name}
                        </h3>
                        <span style={{ fontSize: '0.75rem', background: '#dbeafe', color: '#1e40af', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                          Primary Jurisdiction
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
                        Role: Civic Government Body | Ward 4 Municipal Office
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--emerald-600)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ShieldCheck size={16} /> Jurisdiction Verified
                    </span>
                  </div>
                </div>

                <div className="match-reason-box">
                  <strong>Engine Matching Rationale:</strong> "{coordination.primary.matchReason}"
                </div>
              </div>
            </div>
          )}

          {/* SUPPORT COLLABORATING STAKEHOLDERS (NGO, Volunteers, RWA) */}
          {coordination?.support && coordination.support.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Users size={22} color="var(--emerald-600)" />
                <h2 style={{ fontSize: '1.35rem' }}>Recommended Support Collaborators</h2>
                <span className="badge badge-low" style={{ marginLeft: '0.5rem' }}>3 Organizations Matched</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {coordination.support.map((org, index) => {
                  const isNGO = org.role === 'NGO';
                  const isVol = org.role === 'Volunteers';
                  const isRWA = org.role === 'RWA';
                  const Icon = isNGO ? HeartHandshake : isVol ? Users : Home;
                  const color = isNGO ? '#059669' : isVol ? '#d97706' : '#7c3aed';

                  return (
                    <div
                      key={org.id}
                      className="stakeholder-card animate-fade-in"
                      style={{ opacity: revealed ? 1 : 0, transitionDelay: `${(index + 2) * 150}ms` }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-md)',
                          background: `${color}15`,
                          color: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={20} />
                        </div>

                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: color, textTransform: 'uppercase' }}>
                            {org.role} Support Partner
                          </div>
                          <h4 style={{ fontSize: '1.05rem', marginTop: '0.1rem' }}>{org.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {org.specialization}
                          </span>
                        </div>
                      </div>

                      <div className="match-reason-box" style={{ borderLeftColor: color, background: '#fafafb' }}>
                        <strong>Reason:</strong> "{org.matchReason}"
                      </div>

                      {org.resources && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.65rem', paddingLeft: '0.25rem' }}>
                          ⚡ <strong>Available Resources:</strong> {org.resources}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTION BUTTON & ROLE PERMISSION GATE */}
          <div className="card card-hero" style={{ textAlign: 'center', padding: '2rem', marginTop: '1rem' }}>
            {!isAccepted ? (
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--brand-primary)' }}>
                  Accept AI Recommendation & Mobilize Teams
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', maxWidth: '650px', margin: '0 auto 1.5rem' }}>
                  As the <strong>Municipality</strong> role, approving this plan notifies CleanCity NGO, Green Park Youth Volunteers, and RWA to join and begin collaborative cleanup.
                </p>

                {activeRole !== 'Municipality' && (
                  <div style={{
                    background: '#fffbe6',
                    border: '1px solid #ffe58f',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: '#d48806',
                    marginBottom: '1.25rem'
                  }}>
                    <Zap size={16} /> Current Role is <strong>{activeRole}</strong>. Switch to <strong>Municipality</strong> role to click Accept.
                    <button
                      onClick={() => setActiveRole('Municipality')}
                      style={{
                        background: 'var(--brand-primary)',
                        color: '#fff',
                        border: 'none',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        marginLeft: '0.5rem'
                      }}
                    >
                      Switch to Municipality
                    </button>
                  </div>
                )}

                <div>
                  <button
                    onClick={handleAcceptCoordination}
                    disabled={accepting || activeRole !== 'Municipality'}
                    className="btn btn-primary btn-lg pulse-glow"
                    style={{
                      opacity: activeRole !== 'Municipality' ? 0.6 : 1,
                      cursor: activeRole !== 'Municipality' ? 'not-allowed' : 'pointer',
                      fontSize: '1.1rem',
                      padding: '0.9rem 2.5rem'
                    }}
                  >
                    {accepting ? (
                      'Activating Stakeholder Team...'
                    ) : (
                      <>
                        <CheckCircle2 size={20} /> ACCEPT & MOBILIZE TEAM <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--emerald-50)', color: 'var(--emerald-600)', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 700, marginBottom: '1rem', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
                  <CheckCircle2 size={18} /> Coordination Accepted — Multi-Stakeholder Team Activated!
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Municipality accepted review on {new Date().toLocaleTimeString()}. CleanCity NGO, Youth Volunteers, and Green Park RWA can now view and join the effort.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                    Open Stakeholder Dashboard <ArrowRight size={18} />
                  </button>
                  <button onClick={() => navigate('/overview')} className="btn btn-secondary">
                    View Live Multi-Stakeholder Overview
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
