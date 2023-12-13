import React from "react";

const BookCard = ({ book, onDetailsClick }) => {
  return (
    <div className="bookCard">
      <img src={book.coverimage} alt={book.title} />
      <p>
        Title: {book.title}
        <br />
        Author: {book.author}
      </p>
      {book.available ? <p>Available</p> : <p>Not Available</p>}
      <button onClick={() => onDetailsClick(book.id)}>See Details</button>
    </div>
  );
};

export default BookCard;
