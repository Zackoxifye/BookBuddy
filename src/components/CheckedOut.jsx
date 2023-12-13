import React, { useEffect, useState } from "react";
import { fetchCheckedOutBooks } from "../API";
import { returnBook } from "../API";

const CheckedOutBooks = ({ userId, token }) => {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await fetchCheckedOutBooks(userId, token);
        setCheckedOutBooks(result.reservation);
      } catch (error) {
        console.error("Error fetching checked out books: ", error);
      }
    };

    fetchBooks();
  }, [userId, token]);

  const handleReturn = async (bookId) => {
    try {
      const result = await returnBook(bookId, token);
      console.log("Book returned successfully:", result);
      window.location.reload();
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  return (
    <div>
      <h2 className="checkout-title">Checked Out Books</h2>
      {checkedOutBooks && checkedOutBooks.length > 0 ? (
        <ul>
          {checkedOutBooks.map((book) => (
            <div key={book.id}>
              <p className="ManageBookTitle">{book.title}</p>
              <button onClick={() => handleReturn(book.id)}>Return Book</button>
            </div>
          ))}
        </ul>
      ) : (
        <p className="no-books">No books checked out.</p>
      )}
    </div>
  );
};

export default CheckedOutBooks;
