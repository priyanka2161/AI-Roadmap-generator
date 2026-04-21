import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Login from './pages/Login';
import History from './pages/History';
import { isLoggedIn, getUser, logout } from './services/auth';
import "./App.css";

function Navbar() {
  const user = getUser();
  const loggedIn = isLoggedIn();
  return (
    <nav className="navbar">
      <Link to="/" className="logo text-gradient">AI Roadmappify</Link>
      <div className="nav-links">
        
        {loggedIn ? (
          <>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Hi, {user?.name?.split(' ')[0]} 
            </span>
            <button
              className="btn-login"
              onClick={() => { logout(); window.location.href = '/'; }}
            >
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-login">Log in</Link>
        )}
        
        <Link to={loggedIn ? '/generate' : '/login'} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
          Get Started
        </Link>
        {loggedIn && (
          <Link to="/history" className="nav-link">History</Link>
        )}
      </div>
    </nav>
  );
}


function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      name: "",
      email: "",
      message: "",
      contactOpen: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ sent: true });
    setTimeout(
      () =>
        this.setState({
          sent: false,
          name: "",
          email: "",
          message: "",
          contactOpen: false,
        }),
      2000
    );
  };

  toggleContact = () => {
    this.setState((prev) => ({ contactOpen: !prev.contactOpen }));
  };

  render() {
    const { sent, name, email, message, contactOpen } = this.state;

    return (
      <div>
        <Navbar />

        <section className="hero" id="home">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Personal <br />
              <span className="highlight">Learning Roadmap</span>
              <br />
              Starts Here
            </h1>
            <p className="hero-desc">
              Tell us your goal. Our AI breaks it into a clear, structured
              roadmap path — from zero to mastery, one milestone at a time.
            </p>
            <div className="hero-buttons">
              <a href="#about" className="btn-primary">
                How It Works
              </a>
            </div>
          </div>
          <div className="hero-glow" />
        </section>

        <section className="about" id="about">
          <div className="about-inner">
            <div className="about-left">
              <p className="section-label">About the Project</p>
              <h2 className="section-title">
                We turn ambition into{" "}
                <span className="highlight">actionable steps</span>
              </h2>
              <p className="section-desc">
                AI-Roadmappify uses cutting-edge language models to
                analyse your current level and target destination, then
                constructs a curated, week-by-week learning plan —
                completely personalised to you.
              </p>
              <Link to={isLoggedIn() ? '/generate' : '/login'} className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                Build My Roadmap →
              </Link>
            </div>

            <div className="about-cards">
              <div className="card">
                <span className="card-icon">🎯</span>
                <h3>Personalised Guidance</h3>
                <p>Roadmaps adapt to your existing knowledge, pace, and learning style.</p>
              </div>
              <div className="card">
                <span className="card-icon">🗺️</span>
                <h3>Structured Milestones</h3>
                <p>Complex topics broken into bite-sized, achievable checkpoints.</p>
              </div>
              <div className="card">
                <span className="card-icon">⚡</span>
                <h3>AI Intelligence</h3>
                <p>Powered by state-of-the-art models that understand context and intent.</p>
              </div>
              <div className="card">
                <span className="card-icon">📈</span>
                <h3>Progress Tracking</h3>
                <p>See how far you've come and what's next — always stay motivated.</p>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-inner footer-center">
            <span className="footer-logo text-gradient">AI Roadmappify</span>
            <p className="footer-desc">
              Simplifying learning with AI. From beginner to expert — we map the journey so you can focus on moving forward.
            </p>
            <div className="footer-contact">
              <button className="btn-primary" onClick={this.toggleContact}>
                Contact Us
              </button>

            </div>
          </div>
        </footer>

        {/* Contact Popup Modal outside of footer to escape backdrop-filter containing block */}
        {contactOpen && (
          <div className="popup-overlay" onClick={(e) => e.target === e.currentTarget && this.toggleContact()}>
            <div className="popup-form">
              <h3 className="popup-title">Get In Touch</h3>
              <form className="contact-form" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Your message…"
                  value={message}
                  onChange={(e) => this.setState({ message: e.target.value })}
                  required
                  rows="4"
                />
                <div className="form-actions">
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    {sent ? "✓ Sent!" : "Send Message"}
                  </button>
                  <button type="button" className="btn-close" onClick={this.toggleContact}>
                    ✕
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}


function GeneratePage() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Home />
      </main>
    </>
  );
}


function RoadmapPage() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Roadmap />
      </main>
    </>
  );
}

function HistoryPage() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <History />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <GeneratePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <RoadmapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

