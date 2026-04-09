<<<<<<< HEAD
import React, { Component } from "react";
import "./App.css";

class App extends Component {
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
        <nav className="navbar">
          <span className="logo">AI Roadmapify</span>
          <button className="btn-login">Log in</button>
        </nav>

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
              <a href="#about" className="btn-secondary">
                Get Started →
              </a>
            </div>
          </div>
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
                AI-Roadmap-Generator uses cutting-edge language models to
                analyse your current level and target destination, then
                constructs a curated, week-by-week learning plan —
                completely personalised to you.
              </p>
            </div>

            <div className="about-cards">
              <div className="card">
                <span className="card-icon">🎯</span>
                <h3>Personalised Guidance</h3>
                <p>
                  Roadmaps adapt to your existing knowledge, pace, and learning
                  style.
                </p>
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
            <span className="footer-logo">AI Roadmapify</span>
            <p className="footer-desc">
              Simplifying learning with AI. From beginner to expert — we map the journey so you can focus on moving forward.
            </p>
            <div className="footer-contact">
              <button className="btn-primary" onClick={this.toggleContact}>
                Contact Us
              </button>

              {contactOpen && (
                <div className="popup-form">
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
                    />
                    <button type="submit" className="btn-primary">
                      {sent ? "✓ Sent!" : "Send Message"}
                    </button>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={this.toggleContact}
                    >
                      ✕
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
>>>>>>> 6b043049ceb331b4cbccc008e698d588eeb509bc
