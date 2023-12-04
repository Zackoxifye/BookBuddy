import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Account({ token }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setUserInfo(result);
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <div className="account-div">
      {token ? (
        <>
          <h1 className="account-title">Account Information</h1>
          {userInfo ? (
            <div>
              <p>Email: {userInfo.email}</p>
              <p>First Name: {userInfo.firstName}</p>
              <p>Last Name: {userInfo.lastName}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </>
      ) : (
        <p className="pleaseLogIn">
          Please log in to view your account information.
        </p>
      )}
    </div>
  );
}

Account.propTypes = {
  token: PropTypes.string,
};
