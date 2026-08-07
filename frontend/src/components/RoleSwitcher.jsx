import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Building2, HeartHandshake, Users, Home } from 'lucide-react';

const ROLES = [
  { id: 'Citizen', label: 'Citizen', icon: UserCheck, color: '#3b82f6', bg: '#eff6ff' },
  { id: 'Municipality', label: 'Municipality', icon: Building2, color: '#4f46e5', bg: '#eef2ff' },
  { id: 'NGO', label: 'CleanCity NGO', icon: HeartHandshake, color: '#059669', bg: '#ecfdf5' },
  { id: 'Volunteers', label: 'Youth Volunteers', icon: Users, color: '#d97706', bg: '#fffbeb' },
  { id: 'RWA', label: 'Green Park RWA', icon: Home, color: '#7c3aed', bg: '#f5f3ff' }
];

export function RoleSwitcher() {
  const { activeRole, setActiveRole } = useApp();

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      background: 'var(--bg-subtle)',
      padding: '0.25rem',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)'
    }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', paddingLeft: '0.5rem', paddingRight: '0.25rem' }}>
        Role:
      </span>
      {ROLES.map(role => {
        const Icon = role.icon;
        const isActive = activeRole === role.id;
        return (
          <button
            key={role.id}
            onClick={() => setActiveRole(role.id)}
            title={`Switch view to ${role.label}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: isActive ? 600 : 500,
              border: isActive ? `1px solid ${role.color}` : '1px solid transparent',
              background: isActive ? role.bg : 'transparent',
              color: isActive ? role.color : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Icon size={14} color={isActive ? role.color : 'var(--text-muted)'} />
            <span>{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}
