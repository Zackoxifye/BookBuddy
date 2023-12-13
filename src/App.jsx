import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookLogo from "./assets/books.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navigations from "./components/Navigations";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Details from "./components/Details";

function App() {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          {!token && <Link to="/login">Login</Link>}
          {token && (
            <Link
              to="/"
              onClick={() => {
                localStorage.setItem("token", "");
                setToken("");
              }}
            >
              Logout
            </Link>
          )}
          <Link to="/register">Register</Link>
          <Link to="/account">Account</Link>
        </div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/books/:bookId" element={<Details token={token} />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
