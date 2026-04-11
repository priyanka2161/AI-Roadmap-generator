import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../services/auth";
import "./Login.css";

// Wrapper to provide navigate hook to class component
function LoginWithNavigate(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "login",
      email: "",
      password: "",
      name: "",
      loading: false,
      error: null,
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      await login({ email: this.state.email, password: this.state.password });
      this.props.navigate("/");
      window.location.reload(); // refresh so App re-reads auth state
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSignUp = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      await signup({ name: this.state.name, email: this.state.email, password: this.state.password });
      this.props.navigate("/");
      window.location.reload();
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  switchTab = (tab) => {
    this.setState({ tab, error: null });
  };

  render() {
    const { tab, email, password, name, loading, error } = this.state;

    return (
      <div className="login-page">
        <div className="login-container glass">
          <h2 className="login-title text-gradient">AI Roadmappify</h2>
          <p className="login-subtitle">
            {tab === "login"
              ? "Welcome back! Sign in to continue."
              : "Create your account and get started."}
          </p>

          <div className="tab-buttons">
            <button
              className={tab === "login" ? "active-tab" : ""}
              onClick={() => this.switchTab("login")}
            >
              Login
            </button>
            <button
              className={tab === "signup" ? "active-tab" : ""}
              onClick={() => this.switchTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          {tab === "login" && (
            <form className="contact-form" onSubmit={this.handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
                disabled={loading}
              />
              <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
                {loading ? "Signing in…" : "Log In"}
              </button>
            </form>
          )}

          {tab === "signup" && (
            <form className="contact-form" onSubmit={this.handleSignUp}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
                required
                disabled={loading}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
                disabled={loading}
              />
              <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
                {loading ? "Creating account…" : "Sign Up"}
              </button>
            </form>
          )}

          <Link to="/" style={{ display: "block", marginTop: "1rem" }}>
            <button className="btn-secondary" style={{ width: "100%" }}>
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginWithNavigate;
