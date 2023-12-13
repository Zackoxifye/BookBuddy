import React, { useState, useEffect } from "react";
import { fetchAllBooks } from "../API";
import BookCard from "./bookCard";
import { Link, useNavigate } from "react-router-dom";

export default function Books() {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllBooks() {
      try {
        const data = await fetchAllBooks();
        setAllBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBooks();
  }, []);

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBooks(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <div className="books-div">
      <h1 className="books-page-title">Books</h1>
      <div className="book-search-section">
        <h2 className="search-book-title">Search for a Book Here!</h2>
        <input
          className="book-search-bar"
          type="text"
          placeholder="Search for a book"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div id="all-books-container">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDetailsClick={() => navigate(`/books/${book.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
