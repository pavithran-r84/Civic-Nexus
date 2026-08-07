import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, CheckCircle2, Send, ShieldAlert, ArrowRight, Camera } from 'lucide-react';

export function MunicipalityView({ onNavigateToCoordination }) {
  const { currentIssue, updateIssueState } = useApp();
  const [allocatedStaff, setAllocatedStaff] = useState('Sanitation Team #4 (6 Crew Members)');
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  if (!currentIssue) return <div>No issue selected</div>;

  const isAccepted = currentIssue.status !== 'Pending Municipality Review';
  const isResolved = currentIssue.status === 'Resolved';

  const handleUpdateProgress = async (newStatus, timelineTitle) => {
    setUpdating(true);
    try {
      const updates = {
        status: newStatus,
        stakeholderStatus: {
          ...currentIssue.stakeholderStatus,
          municipality: newStatus
        },
        notes: {
          ...currentIssue.notes,
          municipality: notes || 'Municipality dispatched trucks and equipment.'
        },
        timeline: [
          ...(currentIssue.timeline || []),
          {
            id: `t-${Date.now()}`,
            title: timelineTitle,
            actor: 'Green Park Municipality',
            timestamp: new Date().toISOString(),
            details: `Status set to ${newStatus}. ${notes}`,
            type: 'municipality'
          }
        ]
      };
      await updateIssueState(updates);
      setNotes('');
    } catch (err) {
      console.error('Failed to update progress:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ borderLeft: '4px solid var(--brand-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
              <Building2 size={12} /> Municipality Command View
            </span>
            <h3 style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>Green Park Municipal Authority</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Jurisdictional Authority for Ward 4 | Responsible for heavy equipment & sanitation dispatch
            </p>
          </div>
          <div>
            {!isAccepted ? (
              <button onClick={onNavigateToCoordination} className="btn btn-primary pulse-glow">
                Go to Coordination Engine & Accept Review <ArrowRight size={16} />
              </button>
            ) : (
              <span className="badge badge-status-progress" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                <CheckCircle2 size={14} /> Review Accepted & Coordinating
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={18} color="var(--brand-primary)" /> Municipal Operations & Dispatch Controls
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Allocated Municipal Unit
            </label>
            <input
              type="text"
              value={allocatedStaff}
              onChange={(e) => setAllocatedStaff(e.target.value)}
              placeholder="e.g. Ward 4 Heavy Compactor Truck #2"
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Operation Dispatch Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Dispatched compactor truck and 4 sanitation workers..."
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Work Progress Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleUpdateProgress('Cleaning Started', 'Cleaning Operations Started')}
            disabled={updating || !isAccepted || isResolved}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Mark "Cleaning Started"
          </button>

          <button
            onClick={() => handleUpdateProgress('Waste Collected', 'Waste Collected & Transported')}
            disabled={updating || !isAccepted || isResolved}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Mark "Waste Collected"
          </button>

          <button
            onClick={() => handleUpdateProgress('Area Sanitized', 'School Gate Zone Sanitized')}
            disabled={updating || !isAccepted || isResolved}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Mark "Area Sanitized"
          </button>

          <button
            onClick={() => handleUpdateProgress('Resolved', 'Issue Fully Resolved & Verified')}
            disabled={updating || !isAccepted || isResolved}
            className="btn btn-success"
            style={{ fontSize: '0.85rem', marginLeft: 'auto' }}
          >
            <CheckCircle2 size={16} /> Complete & Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
}
