import React from "react";

const SingleBookCard = ({ book, token, onCheckoutClick }) => {
  const handleCheckout = () => {
    console.log("Token in SingleBookCard: ", token);
    if (!token) {
      alert("Please log in to check out books.");
      return;
    }
    if (!book.available) {
      alert("This book is not available for checkout.");
      return;
    }
    onCheckoutClick(book.id, token);
  };

  return (
    <div className="singleBookCard">
      <img src={book.coverimage} alt={book.title} />
      <p className="singleBookTitle">Title: {book.title}</p>
      <p className="singleBookAuthor">Author: {book.author}</p>
      <p className="singleBookDescription">Description: {book.description}</p>
      {book.available ? (
        <p className="singleBookAvailable">Available</p>
      ) : (
        <p className="singleBookAvailable">Not Available</p>
      )}
      <button onClick={handleCheckout}>Checkout Book</button>
    </div>
  );
};

export default SingleBookCard;
