import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../services/gemini';
import { saveRoadmap } from '../services/roadmaps';
import './Roadmap.css';

export default function Roadmap() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We load task progress from local storage
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('roadmapProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (!state?.profileData) {
      navigate('/');
      return;
    }

    const { profileData } = state;
    
    // If we navigated here from History (viewing old roadmap), use state directly
    if (state?.roadmap) {
      setRoadmap(state.roadmap);
      setLoading(false);
      return;
    }

    // Check if we already have a cached roadmap in localstorage to avoid re-generating
    const cached = localStorage.getItem('generatedRoadmap');
    const alreadySaved = localStorage.getItem('roadmapSaved') === 'true';
    if (cached) {
      const parsed = JSON.parse(cached);
      setRoadmap(parsed);
      setLoading(false);
      // Save to history if not saved yet (e.g. user navigated away and came back)
      if (!alreadySaved) {
        saveRoadmap({ profileData, roadmap: parsed })
          .then(() => localStorage.setItem('roadmapSaved', 'true'))
          .catch(err => console.error('Failed to save roadmap to history', err));
      }
      return;
    }

    generateRoadmap(profileData)
      .then(data => {
        setRoadmap(data);
        localStorage.setItem('generatedRoadmap', JSON.stringify(data));
        localStorage.removeItem('roadmapSaved'); // reset flag for new roadmap
        saveRoadmap({ profileData, roadmap: data })
          .then(() => localStorage.setItem('roadmapSaved', 'true'))
          .catch(err => console.error('Failed to save roadmap to history', err));
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [state, navigate]);

  const toggleTask = (taskId) => {
    const newProgress = { ...progress, [taskId]: !progress[taskId] };
    setProgress(newProgress);
    localStorage.setItem('roadmapProgress', JSON.stringify(newProgress));
  };

  const handleReset = () => {
    localStorage.removeItem('generatedRoadmap');
    localStorage.removeItem('roadmapProgress');
    localStorage.removeItem('roadmapSaved');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
        <h2 className="text-gradient">Generating your path...</h2>
        <p style={{ color: 'var(--text-muted)' }}>This takes a few seconds as our AI analyzes your skills.</p>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
        <h2 style={{ color: '#ef4444' }}>Error Generating Roadmap</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>{error}</p>
        <button onClick={handleReset} className="btn-primary" style={{ marginTop: '2rem' }}>Go Back</button>
      </div>
    );
  }

  if (!roadmap) return null;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="header-meta">
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', width: '100%' }}>Your Learning Roadmap</h1>
        <div className="badge">Target role: {state?.profileData?.role}</div>
      </div>

      <div className="glass glow" style={{ padding: '1.5rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--secondary)' }}>Skill Gap Analysis</h3>
        <p style={{ lineHeight: 1.6 }}>{roadmap.gapAnalysis}</p>
      </div>

      {roadmap.months?.map(month => (
        <div key={month.month} style={{ marginBottom: '4rem' }}>
          <h2 style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1.5rem' }}>
            Month {month.month}: <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{month.focus}</span>
          </h2>
          
          <div className="roadmap-grid">
            {month.weeks?.map(week => (
              <div key={week.week} className="glass week-card">
                <h4 style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>Week {week.week}: {week.title}</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {week.tasks?.map(task => (
                    <div key={task.id} className="task-item">
                      <input 
                        type="checkbox" 
                        id={task.id} 
                        checked={!!progress[task.id]} 
                        onChange={() => toggleTask(task.id)} 
                      />
                      <label 
                        htmlFor={task.id} 
                        className={`task-label ${progress[task.id] ? 'completed' : ''}`}
                      >
                        {task.description}
                      </label>
                    </div>
                  ))}
                </div>

                {(week.resources?.length > 0 || week.project) && (
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
                    {week.resources && week.resources.length > 0 && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'var(--accent)' }}>Resources:</strong>
                        <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                          {week.resources.map((res, i) => <li key={i}>{res}</li>)}
                        </ul>
                      </div>
                    )}
                    {week.project && (
                      <div>
                        <strong style={{ color: 'var(--success)' }}>Project:</strong> 
                        <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{week.project}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <button onClick={handleReset} className="btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'black' }}>
          Create New Roadmap
        </button>
      </div>
    </div>
  );
}