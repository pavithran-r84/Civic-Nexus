import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MunicipalityView } from './MunicipalityView';
import { NgoVolunteerView } from './NgoVolunteerView';
import { ColonySocietyView } from './ColonySocietyView';
import { LayoutDashboard, Building2, HeartHandshake, Users, Home } from 'lucide-react';

export function StakeholderDashboardPage() {
  const navigate = useNavigate();
  const { activeRole, setActiveRole } = useApp();

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <LayoutDashboard size={14} /> Stakeholder Collaboration Workspace
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Stakeholder Operations Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Role-specific action portals connected to the single shared REST state.
          </p>
        </div>

        {/* Role Selection Tabs in Dashboard Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'Municipality', label: 'Municipality Command', icon: Building2 },
            { id: 'NGO', label: 'CleanCity NGO', icon: HeartHandshake },
            { id: 'Volunteers', label: 'Youth Volunteers', icon: Users },
            { id: 'RWA', label: 'Green Park RWA', icon: Home }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveRole(tab.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.875rem' }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic View based on Active Role */}
        {activeRole === 'Municipality' && (
          <MunicipalityView onNavigateToCoordination={() => navigate('/coordination')} />
        )}
        {(activeRole === 'NGO' || activeRole === 'Volunteers') && (
          <NgoVolunteerView />
        )}
        {activeRole === 'RWA' && (
          <ColonySocietyView />
        )}
        {activeRole === 'Citizen' && (
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <h3>You are currently in the Citizen Role</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem' }}>
              Switch to Municipality, NGO, Volunteers, or RWA using the top bar or tabs above to perform stakeholder actions.
            </p>
            <button onClick={() => setActiveRole('Municipality')} className="btn btn-primary">
              Switch to Municipality Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
