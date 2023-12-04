import React, { useState, useEffect } from "react";
import { fetchSingleBook } from "../API";

export default function SingleBook({ selectedBookId, setSelectedBookId }) {
  const [singleBook, setSingleBook] = useState(null);
  const allBooksAPI =
    "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

  useEffect(() => {
    async function getSingleBook(bookId) {
      try {
        const res = await fetch(`${allBooksAPI}/${bookId}`);
        const json = await res.json();
        console.log(json);
        setSingleBook();
      } catch (error) {
        console.log(error);
      }
    }
    getSingleBook(selectedBookId);
  }, []);
  return (
    <div>
      <p>Title: {Book?.title}</p>
      <p>Author: {Book?.author}</p>
      <p>Status: {Book?.available}</p>
      <button onClick={() => setSelectedBookId(null)}>Close</button>
    </div>

    // <div className="singlebook-div">
    //   <h1>Single Book</h1>
    //   <div id="single-book-container">
    //     {books?.map((book) => (
    //       <BookCard key={book.id} book={book} />
    //     ))}
    //   </div>
    // </div>
  );
}
