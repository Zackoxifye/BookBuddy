import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
      } else {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setSuccessMessage(result.message);
        console.log("You've been successfuly signed in");
        navigate("/account");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  }
  return (
    <div className="login-div">
      <h1 className="login-title">Login</h1>
      {error && <p>{error}</p>}
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label>
            Email:{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
