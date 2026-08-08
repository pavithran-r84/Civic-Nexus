import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  RoleSwitcher  from './RoleSwitcher';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Network, LayoutDashboard, FileText, BarChart3, Info, PlusCircle, Menu, X } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const { activeRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS_BY_ROLE = {
  "Citizen": [
    { path: "/", label: "Home", icon: ShieldAlert },
    { path: "/report", label: "Report Issue", icon: PlusCircle },
    { path: "/overview", label: "Overview", icon: FileText },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ],
  "Municipality": [
    { path: "/", label: "Home", icon: ShieldAlert },
    { path: "/coordination", label: "Coordination Engine", icon: Network },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/overview", label: "Overview", icon: FileText },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ],
  "CleanCity NGO": [
    { path: "/", label: "Home", icon: ShieldAlert },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/overview", label: "Overview", icon: FileText },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ],
 "Youth Volunteers": [
    { path: "/", label: "Home", icon: ShieldAlert },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/overview", label: "Overview", icon: FileText },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ],
  "Green Park RWA": [
    { path: "/", label: "Home", icon: ShieldAlert },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/overview", label: "Overview", icon: FileText },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ],
  };
  const navLinks =
  NAV_LINKS_BY_ROLE[activeRole] || NAV_LINKS_BY_ROLE.Citizen;

  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="glass-nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--brand-primary) 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <Network size={20} />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)' }}>
            Civic<span style={{ color: 'var(--brand-primary)' }}>Nexus</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navLinks.map(link => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: active || link.highlight ? 600 : 500,
                  color: active
                    ? 'var(--brand-primary)'
                    : link.highlight
                    ? '#4f46e5'
                    : 'var(--text-secondary)',
                  background: active
                    ? 'var(--brand-light)'
                    : link.highlight
                    ? 'rgba(79, 70, 229, 0.08)'
                    : 'transparent',
                  border: link.highlight ? '1px solid var(--border-accent)' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={active || link.highlight ? 'var(--brand-primary)' : 'var(--text-muted)'} />
                <span>{link.label}</span>
                {link.highlight && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--brand-primary)',
                    display: 'inline-block'
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Role Switcher & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="role-switcher-container">
            <RoleSwitcher />
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '0.5rem',
              display: 'none'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontWeight: 500
                }}
              >
                <Icon size={18} color="var(--brand-primary)" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 990px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .role-switcher-container { font-size: 0.75rem; }
        }
      `}</style>
    </header>
  );
}
