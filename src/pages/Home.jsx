import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    github: '',
    skills: '',
    interests: '',
    role: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Basic GitHub Profile validation/fetch
      let githubData = null;
      if (formData.github) {
        const ghRes = await fetch(`https://api.github.com/users/${formData.github}`);
        if (!ghRes.ok) throw new Error('GitHub user not found');
        githubData = await ghRes.json();
      }

      // We'll pass the data to the Roadmap page via state
      const profileData = {
        ...formData,
        githubProfile: githubData
      };

      navigate('/roadmap', { state: { profileData } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass glow" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
        <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>AI-Roadmappify</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Generate your personalized 6-month learning journey.
        </p>

        {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>GitHub Username (Optional)</label>
            <input
              type="text"
              name="github"
              placeholder="e.g. invalid-username"
              value={formData.github}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Skills</label>
            <textarea
              name="skills"
              required
              rows="2"
              placeholder="e.g. HTML, CSS, basic JavaScript"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Interests</label>
            <textarea
              name="interests"
              rows="2"
              placeholder="e.g. AI, Web Development, Cloud"
              value={formData.interests}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Target Role</label>
            <input
              type="text"
              name="role"
              required
              placeholder="e.g. Backend Developer at a Startup"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Generate Roadmap'}
          </button>
        </form>
      </div>
    </div>
  );
}
