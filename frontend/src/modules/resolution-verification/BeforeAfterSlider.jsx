import React, { useState } from 'react';
import { Sparkles, Sliders } from 'lucide-react';

export function BeforeAfterSlider({ beforePhoto, afterPhoto }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'side-by-side'

  const defaultBefore = beforePhoto || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80';
  const defaultAfter = afterPhoto || 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
          <Sparkles size={18} color="var(--brand-primary)" /> Verification Evidence (Before vs. After)
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setViewMode('slider')}
            className={`btn ${viewMode === 'slider' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
          >
            <Sliders size={12} /> Interactive Slider
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`btn ${viewMode === 'side-by-side' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {viewMode === 'slider' ? (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '340px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          userSelect: 'none'
        }}>
          {/* After Image (Background) */}
          <img
            src={defaultAfter}
            alt="Resolved Area"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(5, 150, 105, 0.9)',
            color: '#fff',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: 700,
            backdropFilter: 'blur(4px)'
          }}>
            AFTER (Cleaned & Sanitized)
          </div>

          {/* Before Image (Foreground Clipped) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: `${sliderPos}%`,
            overflow: 'hidden',
            borderRight: '3px solid #ffffff'
          }}>
            <img
              src={defaultBefore}
              alt="Reported Garbage Pile"
              style={{ width: '1000px', maxWidth: 'none', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(225, 29, 72, 0.9)',
              color: '#fff',
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 700,
              backdropFilter: 'blur(4px)'
            }}>
              BEFORE (Reported Accumulation)
            </div>
          </div>

          {/* Slider Range Control overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'ew-resize',
              zIndex: 10
            }}
          />

          {/* Vertical Divider Indicator Handle */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            width: '4px',
            background: '#ffffff',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--brand-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              ↔
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', position: 'relative' }}>
            <img src={defaultBefore} alt="Before" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(225,29,72,0.9)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              BEFORE
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', position: 'relative' }}>
            <img src={defaultAfter} alt="After" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(5,150,105,0.9)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              AFTER
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
