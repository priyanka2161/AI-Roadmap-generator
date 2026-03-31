import React, { Component } from "react";
import './App.css';
import { useState, useEffect } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "home",
    };
  }

  changePage = (page) => {
    this.setState({ page });
  };

  render() {
    return (
      <div className="container">
        <h1>AI-Roadmap-Generator</h1>

        
        <div className="nav-buttons">
          <button
            onClick={() => this.changePage("home")}
            className={this.state.page === "home" ? "active" : ""}
          >
            Home
          </button>

          <button
            onClick={() => this.changePage("about")}
            className={this.state.page === "about" ? "active" : ""}
          >
            About
          </button>

          <button
            onClick={() => this.changePage("contact")}
            className={this.state.page === "contact" ? "active" : ""}
          >
            Contact
          </button>
        </div>

        
        <div className="page-content">
          {this.state.page === "home" && <h2>🏠 Home Page</h2>}

          {this.state.page === "about" && (
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              
              <h2>Our Mission</h2>

              <p style={{ color: "#cbd5e1" }}>
                Simplifying <span style={{ color: "#a855f7" }}>Learning</span> with AI.
                We turn complex topics into structured learning paths.
              </p>

              <div style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "30px"
              }}>
                <div style={cardStyle}>
                  <h3>Personalized Guidance</h3>
                  <p>Roadmaps tailored to your level.</p>
                </div>

                <div style={cardStyle}>
                  <h3>Structured Progress</h3>
                  <p>Break topics into milestones.</p>
                </div>

                <div style={cardStyle}>
                  <h3>AI Intelligence</h3>
                  <p>Smart AI-powered learning paths.</p>
                </div>
              </div>

            </div>
          )}

          {this.state.page === "contact" && (
            <div>
              <h2>📞 Contact Us</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent!");
                }}
              >
                <div>
                  <label>Name:</label><br />
                  <input type="text" required />
                </div>

                <br />

                <div>
                  <label>Email:</label><br />
                  <input type="email" required />
                </div>

                <br />

                <div>
                  <label>Message:</label><br />
                  <textarea required></textarea>
                </div>

                <br />

                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const cardStyle = {
  width: "250px",
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(147,51,234,0.3)",
  color: "white",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
};
export default App;