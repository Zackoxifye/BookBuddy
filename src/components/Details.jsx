import React, { useState, useEffect } from "react";
import SingleBookCard from "./SingleBookCard";
import { useParams } from "react-router-dom";
import { fetchSingleBook } from "../API";

const DetailsPage = ({ token }) => {
  console.log("token in details page: ", token);
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function selectedBook() {
      try {
        const data = await fetchSingleBook(bookId);
        setBook(data.book);
      } catch (err) {
        console.log(err);
      }
    }
    selectedBook();
  }, [bookId]);

  const handleCheckout = async (bookId, token) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: bookId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Update the book status or perform any other necessary actions
        console.log("Book successfully checked out:", result);
        alert("Book successfully checked out!");
      } else {
        // Handle error response from the server
        console.error("Checkout failed:", result);
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div id="singleBookDetails">
      {book && (
        <SingleBookCard
          book={book}
          token={token}
          onCheckoutClick={handleCheckout}
        />
      )}
    </div>
  );
};

export default DetailsPage;
