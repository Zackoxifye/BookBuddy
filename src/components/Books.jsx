import React, { useState, useEffect } from "react";
import { fetchAllBooks } from "../API";
import BookCard from "./bookCard";
import { Link, useNavigate } from "react-router-dom";
import SingleBook from "./SingleBook";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      try {
        const data = await fetchAllBooks();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBooks();
  }, []);
  return (
    <div className="books-div">
      <h1 className="books-page-title">Books</h1>
      <div id="all-books-container">
        {books?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDetailsClick={() => navigate(`books/${book.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
