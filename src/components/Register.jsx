import React, { useState } from "react";

export default function Register({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, firstname, lastname }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
      } else {
        setToken(result.token);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="register-div">
      <h1 className="register-title">Register</h1>
      {error && <p>{error}</p>}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <label>
            First Name:{" "}
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <br />
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
          <button className="register-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
