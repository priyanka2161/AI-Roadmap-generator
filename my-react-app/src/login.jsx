import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "login",
      email: "",
      password: "",
      name: "",
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in with email: " + this.state.email);
    this.setState({ email: "", password: "" });
  };

  handleSignUp = (e) => {
    e.preventDefault();
    alert(
      "Signed up with name: " +
        this.state.name +
        ", email: " +
        this.state.email
    );
    this.setState({ name: "", email: "", password: "" });
  };

  switchTab = (tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab, email, password, name } = this.state;

    return (
      <div className="login-page">
        <div className="login-container">
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

          {tab === "login" && (
            <form className="contact-form" onSubmit={this.handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <button type="submit" className="btn-primary">
                Log In
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
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <button type="submit" className="btn-primary">
                Sign Up
              </button>
            </form>
          )}

          <Link to="/">
            <button className="btn-secondary" style={{ marginTop: "12px" }}>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;