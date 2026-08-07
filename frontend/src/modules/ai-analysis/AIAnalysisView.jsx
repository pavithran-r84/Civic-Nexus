import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { analyzeIssueWithGemini } from './geminiService';
import { Brain, ArrowRight, Clock, ShieldAlert, Tag, Loader2, Sparkles, Image as ImageIcon, Info } from 'lucide-react';

export function AIAnalysisView() {
  const navigate = useNavigate();
  const { currentIssue, updateIssueState } = useApp();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(currentIssue?.aiAnalysis || null);

  useEffect(() => {
    async function runAnalysis() {
      if (!currentIssue) return;
      if (currentIssue.aiAnalysis) {
        setAnalysisResult(currentIssue.aiAnalysis);
        return;
      }
      setAnalyzing(true);
      try {
        const result = await analyzeIssueWithGemini(currentIssue);
        setAnalysisResult(result);
        await updateIssueState({ aiAnalysis: result });
      } catch (err) {
        console.error('Analysis error:', err);
      } finally {
        setAnalyzing(false);
      }
    }
    runAnalysis();
  }, [currentIssue]);

  if (!currentIssue) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p>No active issue selected. Please report an issue first.</p>
        <button onClick={() => navigate('/report')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Report New Issue
        </button>
      </div>
    );
  }

  const isDemoMode = analysisResult?.isOfflineDemo ?? !import.meta.env.VITE_GEMINI_API_KEY;

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Brain size={14} /> Step 2: AI Classification & Risk Assessment
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>AI Issue Understanding</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Gemini AI evaluates the report text, image context, and location sensitivity to determine category, priority, and target timeline.
          </p>

          {/* Honest Demo Mode Indicator Note */}
          {isDemoMode && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginTop: '0.85rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: '#fffbe6',
              border: '1px solid #ffe58f',
              color: '#d48806',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              <Info size={14} /> Demo mode: analysis based on description text & sample photo context.
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {analyzing && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <Loader2 size={40} className="pulse-glow" style={{ color: 'var(--brand-primary)', margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Analyzing Report & Photo with AI...</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Evaluating visual evidence, public safety risks, and operational complexity.
            </p>
          </div>
        )}

        {/* Analysis Result Display */}
        {!analyzing && analysisResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Target Issue Context Summary */}
            <div className="card card-hero" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Target Report #{currentIssue.id}
                  </span>
                  <h2 style={{ fontSize: '1.35rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
                    {currentIssue.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    📍 {currentIssue.location} | Reported by {currentIssue.reporter}
                  </p>
                </div>
                {currentIssue.beforePhoto && (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={currentIssue.beforePhoto}
                      alt="Report Evidence"
                      style={{ width: '110px', height: '85px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      borderRadius: '4px',
                      padding: '2px 4px',
                      fontSize: '0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}>
                      <ImageIcon size={10} /> Photo
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Diagnosis Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {/* Category Card */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                  <Tag size={18} /> Classified Category
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {analysisResult.category}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Auto-matched taxonomy
                </div>
              </div>

              {/* Priority Card */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--rose-600)', marginBottom: '0.75rem', fontWeight: 600 }}>
                  <ShieldAlert size={18} /> Urgency Rating
                </div>
                <div>
                  <span className={`badge ${analysisResult.priority === 'High' ? 'badge-high' : 'badge-medium'}`} style={{ fontSize: '0.9rem', padding: '0.35rem 0.85rem' }}>
                    {analysisResult.priority} Priority
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Based on sensitivity & risk
                </div>
              </div>

              {/* Resolution Target Card */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-600)', marginBottom: '0.75rem', fontWeight: 600 }}>
                  <Clock size={18} /> Target SLA
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-600)' }}>
                  {analysisResult.estimatedResolution}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Estimated resolution window
                </div>
              </div>
            </div>

            {/* AI Reasoning Narrative Card */}
            <div className="card" style={{ background: '#fafafb', borderLeft: '4px solid var(--brand-primary)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--brand-primary)" /> Photo & Text Severity Rationale
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                "{analysisResult.reason}"
              </p>
            </div>

            {/* Clear CTA Leading into Coordination View */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--brand-light)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-accent)', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--brand-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                AI Analysis Complete — Ready for Stakeholder Matching
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem' }}>
                The issue understanding layer is complete. Now hand off to the <strong>Coordination Engine</strong> to identify and assemble the optimal multi-organizational response team.
              </p>

              <button
                onClick={() => navigate('/coordination')}
                className="btn btn-primary btn-lg pulse-glow"
                style={{ fontSize: '1.05rem', padding: '0.85rem 2.25rem' }}
              >
                Find the Right Team <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
