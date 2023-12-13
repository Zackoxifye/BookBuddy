import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CheckedOutBooks from "./CheckedOut";

export default function Account({ token, userId }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
            <div className="user-information">
              <p className="user-email">Email: {userInfo.email}</p>
              <p className="user-first-name">
                First Name: {userInfo.firstname}
              </p>
              <p className="user-last-name">Last Name: {userInfo.lastname}</p>
              <CheckedOutBooks userId={userId} token={token} />
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
