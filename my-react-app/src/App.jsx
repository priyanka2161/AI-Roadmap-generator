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