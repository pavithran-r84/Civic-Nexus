import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Lock, CheckCircle2, Megaphone, MessageSquare } from 'lucide-react';

export function ColonySocietyView() {
  const { currentIssue, updateIssueState } = useApp();
  const [residentNote, setResidentNote] = useState('');
  const [acknowledging, setAcknowledging] = useState(false);

  if (!currentIssue) return <div>No issue selected</div>;

  const isMunicipalityAccepted = currentIssue.status !== 'Pending Municipality Review';
  const currentStatus = currentIssue.stakeholderStatus?.rwa || 'Waiting for Municipality Acceptance';
  const hasAcknowledged = currentStatus.includes('Acknowledged');

  const matchReason = 'Represents residents directly affected in this locality (Ward 4)';

  const handleAcknowledge = async () => {
    if (!isMunicipalityAccepted) return;
    setAcknowledging(true);
    try {
      const updates = {
        stakeholderStatus: {
          ...currentIssue.stakeholderStatus,
          rwa: 'Acknowledged & Resident Advisory Issued'
        },
        notes: {
          ...currentIssue.notes,
          rwa: residentNote || 'RWA broadcasted cleanup schedule to Ward 4 residents WhatsApp group.'
        },
        timeline: [
          ...(currentIssue.timeline || []),
          {
            id: `t-${Date.now()}`,
            title: 'RWA Acknowledged & Issued Resident Notice',
            actor: 'Green Park RWA',
            timestamp: new Date().toISOString(),
            details: residentNote ? `Notice: ${residentNote}` : 'Green Park RWA verified issue on-site and notified school gate neighbors.',
            type: 'rwa'
          }
        ]
      };
      await updateIssueState(updates);
      setResidentNote('');
    } catch (err) {
      console.error('Failed to acknowledge:', err);
    } finally {
      setAcknowledging(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Card */}
      <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge" style={{ background: '#f5f3ff', color: '#7c3aed', border: '1px solid rgba(124, 58, 237, 0.2)', marginBottom: '0.4rem' }}>
              <Home size={12} /> Green Park RWA Dashboard
            </span>
            <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>Green Park Residents Welfare Association</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Locality Resident Representative Body | 1,200 Households Covered
            </p>
          </div>
          <div>
            <span className={`badge ${hasAcknowledged ? 'badge-status-resolved' : 'badge-status-pending'}`}>
              {hasAcknowledged ? <CheckCircle2 size={14} /> : null} {currentStatus}
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
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Engine Matching Rationale
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          "{matchReason}"
        </p>
      </div>

      {/* Action Card */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Megaphone size={18} color="#7c3aed" /> Community Broadcast & Acknowledgment
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
            <Lock size={24} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Action Locked — Pending Municipality Review
            </div>
            <p style={{ fontSize: '0.85rem' }}>
              RWA community broadcast features unlock after Green Park Municipality accepts the issue for joint coordination.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Resident Community Advisory Note
              </label>
              <input
                type="text"
                value={residentNote}
                onChange={(e) => setResidentNote(e.target.value)}
                placeholder="e.g., Sanitation drive scheduled for 10 AM near School Gate 2. Please keep driveway clear."
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
                onClick={handleAcknowledge}
                disabled={acknowledging || hasAcknowledged}
                className="btn btn-primary"
                style={{ background: '#7c3aed' }}
              >
                {acknowledging ? 'Broadcasting...' : hasAcknowledged ? '✓ Advisory Issued & Acknowledged' : 'Acknowledge & Broadcast to Residents →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
