import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
          body: JSON.stringify({ email, password, firstName, lastName }),
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
