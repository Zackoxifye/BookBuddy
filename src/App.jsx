import { useState } from "react";
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
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";

function App() {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div id="navbar">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/login">Login</Link>
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
          <Route path="/books/:bookId" element={<SingleBook />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
