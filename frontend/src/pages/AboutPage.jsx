import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Network, Brain, Building2, HeartHandshake, Users, Home, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Info size={14} /> Product Philosophy & Innovation Thesis
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>About Civic Nexus</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Bridging the gap between citizen complaints and effective, multi-agency civic action.
          </p>
        </div>

        {/* The Thesis Narrative Card */}
        <div className="card card-hero" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #f4f4ff 100%)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--brand-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Network size={22} /> The Innovation Core
          </h2>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: '1.6', marginBottom: '1rem', fontStyle: 'italic' }}>
            "AI understands the issue. The Coordination Engine decides who should work on it together. This is the layer no existing civic platform provides."
          </p>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: '1.7' }}>
            Traditional municipal issue reporting tools fail because they treat civic problems as single-agency tickets. A major garbage dump near a primary school requires more than just a garbage truck — it needs municipal authority for heavy equipment, specialized NGO leadership for waste sorting, local youth volunteers for rapid site cleanup, and resident welfare associations (RWAs) for community awareness. Civic Nexus automates this cross-organizational synthesis.
          </p>
        </div>

        {/* The Preset Demo Locality Context */}
        <div className="card" style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Preset Demo Locality — Green Park</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>POPULATION</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>5,000 Residents</div>
            </div>
            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>COVERAGE AREA</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>1 km² (Ward 4)</div>
            </div>
            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>STAKEHOLDERS</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>5 Fixed Profiles</div>
            </div>
          </div>
        </div>

        {/* Stakeholder Network Profiles */}
        <div className="card" style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>The 5 Synchronized Stakeholder Roles</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Building2 size={20} color="#4f46e5" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Green Park Municipality (Primary Lead):</strong> Holds jurisdictional authority, provides heavy compaction machinery, and coordinates official clearance.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <HeartHandshake size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>CleanCity NGO (Support Partner):</strong> Active in Green Park, brings specialized waste segregation expertise and sanitation supervisors.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Users size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Green Park Youth Volunteers (Support Partner):</strong> 12 active local members covering the school zone for rapid on-ground manual cleanout.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Home size={20} color="#7c3aed" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Green Park RWA (Support Partner):</strong> Represents 1,200 neighborhood households to issue resident advisories and maintain site stewardship.
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/coordination')} className="btn btn-primary btn-lg pulse-glow">
            Experience the Coordination Engine <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
