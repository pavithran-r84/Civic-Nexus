import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Network, ArrowRight, ShieldCheck, UserCheck, Brain, Building2, CheckCircle2, BarChart3 } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const processSteps = [
    {
      step: '01',
      title: 'Report',
      actor: 'Citizen',
      desc: 'Submit photo, location pin, and issue details in 30 seconds.',
      icon: UserCheck,
      color: '#3b82f6'
    },
    {
      step: '02',
      title: 'AI Classify',
      actor: 'Gemini AI',
      desc: 'Determines category, urgency, public risk, and estimated SLA.',
      icon: Brain,
      color: '#8b5cf6'
    },
    {
      step: '03',
      title: 'Coordinate',
      actor: 'Coordination Engine',
      desc: 'Matches Municipality, NGO, Volunteers, and RWA with visible reasoning.',
      icon: Network,
      color: '#4f46e5',
      highlight: true
    },
    {
      step: '04',
      title: 'Act',
      actor: 'Multi-Stakeholders',
      desc: 'Municipality dispatches equipment while NGO, Volunteers, and RWA join efforts.',
      icon: Building2,
      color: '#d97706'
    },
    {
      step: '05',
      title: 'Verify',
      actor: 'Community Proof',
      desc: 'Before/after photo validation, SLA audit log, and resolution celebration.',
      icon: CheckCircle2,
      color: '#059669'
    }
  ];

  return (
    <div className="page-wrapper animate-fade-in" style={{ paddingTop: '3rem' }}>
      <div className="container">
        {/* Hero Banner */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
            <Sparkles size={16} /> AI-Assisted Community Coordination Platform
          </div>

          <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: '1.15', letterSpacing: '-0.03em' }}>
            Transforming Citizen Reports into <span style={{ color: 'var(--brand-primary)' }}>Coordinated Community Action</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
            Existing civic apps collect reports. <strong>Civic Nexus</strong> solves them. Our intelligent <strong>Coordination Engine</strong> analyzes issue context and recommends exactly which Municipality, NGO, Volunteer group, and RWA should act together.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/report')} className="btn btn-primary btn-lg pulse-glow" style={{ fontSize: '1.1rem', padding: '0.9rem 2.25rem' }}>
              Try the Green Park Demo <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/coordination')} className="btn btn-secondary btn-lg" style={{ fontSize: '1.1rem', padding: '0.9rem 2rem' }}>
              <Network size={20} color="var(--brand-primary)" /> View Coordination Engine
            </button>
          </div>
        </div>

        {/* 5-STEP PROCESS PREVIEW WITH COORDINATE AS ITS OWN STEP */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              End-to-End Civic Architecture
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.35rem' }}>How Civic Nexus Resolves Community Issues</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
            {processSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className={`card ${s.highlight ? 'card-hero' : ''}`}
                  style={{
                    position: 'relative',
                    borderTop: `4px solid ${s.color}`,
                    background: s.highlight ? 'linear-gradient(180deg, #ffffff 0%, #f4f4ff 100%)' : 'var(--bg-surface)'
                  }}
                >
                  {s.highlight && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '12px',
                      background: 'var(--brand-primary)',
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em'
                    }}>
                      ★ CORE INNOVATION
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color, opacity: 0.8 }}>
                      {s.step}
                    </span>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: `${s.color}15`,
                      color: s.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: s.color, textTransform: 'uppercase' }}>
                    {s.actor}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginTop: '0.15rem', marginBottom: '0.4rem' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Feature Card */}
        <div className="card card-hero" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> The Gap No Existing Platform Fills
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              AI Understands the Issue. The Coordination Engine Decides Who Should Act Together.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Most civic platforms dump reports onto a single municipal portal where they stall in queues. Civic Nexus dynamically mobilizes neighborhood resources — pairing municipal jurisdiction with specialized NGOs, youth volunteer squads, and local RWAs.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/report')} className="btn btn-primary">
                Report Issue as Rahul <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/about')} className="btn btn-secondary">
                Read Product Philosophy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
