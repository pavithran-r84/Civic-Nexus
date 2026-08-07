import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LocationPicker } from './LocationPicker';
import { Sparkles, Image as ImageIcon, CheckCircle, ArrowRight } from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    label: 'Garbage Dump (Green Park School)',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    defaultTitle: 'Garbage accumulation near Green Park Government School',
    defaultDesc: 'Uncollected municipal solid waste accumulation blocking the sidewalk and entrance gate of Green Park Government School. Poses sanitation and health risk to students.'
  },
  {
    label: 'Broken Streetlight',
    url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80',
    defaultTitle: 'Broken streetlight causing dark road hazard in Ward 4',
    defaultDesc: 'Non-functional streetlight fixture causing complete darkness and public safety concerns at night near Ward 4 park entrance.'
  },
  {
    label: 'Pothole on Main Road',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    defaultTitle: 'Deep asphalt pothole causing traffic deceleration',
    defaultDesc: 'Large road crater blocking main lane of Green Park Ward 4 road, posing hazard to two-wheelers.'
  }
];

export function ReportIssuePage() {
  const navigate = useNavigate();
  const { createNewIssueState } = useApp();

  const [title, setTitle] = useState(SAMPLE_IMAGES[0].defaultTitle);
  const [description, setDescription] = useState(SAMPLE_IMAGES[0].defaultDesc);
  const [locationText, setLocationText] = useState('Green Park Ward 4, Near School Gate 2');
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_IMAGES[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectSample = (sample) => {
    setSelectedPhoto(sample.url);
    setTitle(sample.defaultTitle);
    setDescription(sample.defaultDesc);
  };

  const handlePreFill = () => {
    handleSelectSample(SAMPLE_IMAGES[0]);
    setLocationText('Green Park Ward 4, Near School Gate 2');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newIssue = {
      id: `issue-${Date.now()}`,
      title,
      description,
      location: locationText,
      locality: 'Green Park',
      reporter: 'Rahul (Citizen)',
      reportedAt: new Date().toISOString(),
      status: 'Pending Municipality Review',
      beforePhoto: selectedPhoto,
      afterPhoto: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
      aiAnalysis: null,
      coordinationResult: null,
      stakeholderStatus: {
        municipality: 'Pending Review',
        ngo: 'Waiting for Municipality Acceptance',
        volunteers: 'Waiting for Municipality Acceptance',
        rwa: 'Waiting for Municipality Acceptance'
      },
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'Report Submitted',
          actor: 'Rahul (Citizen)',
          timestamp: new Date().toISOString(),
          details: `Reported issue: ${title}`,
          type: 'report'
        }
      ]
    };

    try {
      await createNewIssueState(newIssue);
      navigate('/ai-analysis');
    } catch (err) {
      console.error('Failed to submit issue:', err);
      alert('Failed to submit report. Ensure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Step 1: Citizen Reporting
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Report a Civic Issue</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Report problems in your neighborhood. Our AI analyzes the urgency, and our Coordination Engine mobilizes local teams.
          </p>
        </div>

        {/* Demo Quick Pre-fill Banner */}
        <div style={{
          background: 'var(--brand-light)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={20} color="var(--brand-primary)" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--brand-primary)', fontSize: '0.9rem' }}>
                Preset Demo Scenario: Green Park Locality
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                Issue: "Garbage accumulation near Green Park Government School"
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePreFill}
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem', padding: '0.4rem 0.85rem' }}
          >
            Auto-fill Demo Issue
          </button>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Photo Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Photo Evidence & Sample Preset Selection
            </label>

            {/* Quick Sample Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              {SAMPLE_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSample(img)}
                  style={{
                    position: 'relative',
                    height: '110px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedPhoto === img.url ? '3px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {img.label}
                  </div>
                  {selectedPhoto === img.url && (
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      background: 'var(--brand-primary)',
                      color: '#fff',
                      borderRadius: '50%',
                      padding: '2px'
                    }}>
                      <CheckCircle size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Image Preview */}
            {selectedPhoto && (
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                maxHeight: '220px',
                border: '1px solid var(--border-subtle)',
                position: 'relative'
              }}>
                <img src={selectedPhoto} alt="Selected Issue" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(0,0,0,0.75)',
                  color: '#fff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <ImageIcon size={14} /> Photo Attached & Ready for Vision AI
                </div>
              </div>
            )}
          </div>

          {/* Issue Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Issue Headline / Summary
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Waste dump blocking school gate"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Issue Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Detailed Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you see, exact location details, and any safety or health concerns..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Location Picker */}
          <LocationPicker
            locationText={locationText}
            setLocationText={setLocationText}
          />

          {/* Submit Action */}
          <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg pulse-glow"
              style={{ width: '100%' }}
            >
              {isSubmitting ? (
                'Submitting Report...'
              ) : (
                <>
                  <Sparkles size={18} /> Analyze with AI & Proceed <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
