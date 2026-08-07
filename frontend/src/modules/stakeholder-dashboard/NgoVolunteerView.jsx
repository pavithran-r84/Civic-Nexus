import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, Users, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export function NgoVolunteerView() {
  const { currentIssue, updateIssueState, activeRole } = useApp();
  const [pledgeText, setPledgeText] = useState('');
  const [joining, setJoining] = useState(false);

  if (!currentIssue) return <div>No issue selected</div>;

  const isMunicipalityAccepted = currentIssue.status !== 'Pending Municipality Review';
  const isNGO = activeRole === 'NGO';
  const orgName = isNGO ? 'CleanCity NGO' : 'Green Park Youth Volunteers';
  const roleKey = isNGO ? 'ngo' : 'volunteers';
  const currentStatus = currentIssue.stakeholderStatus?.[roleKey] || 'Waiting for Municipality Acceptance';
  const hasJoined = currentStatus.includes('Joined') || currentStatus.includes('Active');

  const matchReason = isNGO
    ? 'Active in Green Park, specializes in waste management & segregation'
    : '12 active members, covers the school zone area directly';

  const handleJoinEffort = async () => {
    if (!isMunicipalityAccepted) return;
    setJoining(true);
    try {
      const updates = {
        stakeholderStatus: {
          ...currentIssue.stakeholderStatus,
          [roleKey]: 'Joined Effort & Pledged Resources'
        },
        notes: {
          ...currentIssue.notes,
          [roleKey]: pledgeText || (isNGO ? 'Pledged 2 waste bins & 4 supervisors' : 'Pledged 8 youth volunteers for manual cleanup')
        },
        timeline: [
          ...(currentIssue.timeline || []),
          {
            id: `t-${Date.now()}`,
            title: `${orgName} Joined Collaborative Effort`,
            actor: orgName,
            timestamp: new Date().toISOString(),
            details: pledgeText ? `Joined with pledge: ${pledgeText}` : `${orgName} accepted Coordination Engine request and dispatched field members.`,
            type: roleKey
          }
        ]
      };
      await updateIssueState(updates);
      setPledgeText('');
    } catch (err) {
      console.error('Failed to join effort:', err);
    } finally {
      setJoining(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Card */}
      <div className="card" style={{ borderLeft: `4px solid ${isNGO ? 'var(--emerald-600)' : 'var(--amber-600)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className={`badge ${isNGO ? 'badge-low' : 'badge-medium'}`} style={{ marginBottom: '0.4rem' }}>
              {isNGO ? <HeartHandshake size={12} /> : <Users size={12} />} {orgName} Dashboard
            </span>
            <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>{orgName}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Matched Support Organization | Green Park Locality
            </p>
          </div>
          <div>
            <span className={`badge ${hasJoined ? 'badge-status-resolved' : 'badge-status-pending'}`}>
              {hasJoined ? <CheckCircle2 size={14} /> : null} {currentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Match Reason Banner */}
      <div style={{
        background: '#fafafb',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem'
      }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Engine Matching Recommendation
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          "{matchReason}"
        </p>
      </div>

      {/* Join Action Gate */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isNGO ? <HeartHandshake size={18} color="var(--emerald-600)" /> : <Users size={18} color="var(--amber-600)" />} Resource Pledge & Collaborative Action
        </h4>

        {!isMunicipalityAccepted ? (
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            <Lock size={24} style={{ margin: '0 auto 0.5rem', display: 'block', color: 'var(--text-muted)' }} />
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Action Locked — Pending Municipality Acceptance
            </div>
            <p style={{ fontSize: '0.85rem' }}>
              The Coordination Engine matched {orgName}, but organizational join actions open only after Green Park Municipality accepts the review.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Pledge Volunteer Members & Equipment
              </label>
              <input
                type="text"
                value={pledgeText}
                onChange={(e) => setPledgeText(e.target.value)}
                placeholder={isNGO ? "e.g., Pledging 2 waste collection bins & 4 supervisors" : "e.g., Dispatched 8 youth volunteers for site segregation"}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleJoinEffort}
                disabled={joining || hasJoined}
                className="btn btn-primary"
                style={{ background: isNGO ? 'var(--emerald-600)' : 'var(--amber-600)' }}
              >
                {joining ? 'Registering Join Action...' : hasJoined ? '✓ Joined & Pledged' : 'Join Collaborative Effort →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
