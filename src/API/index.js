//____________________________________________FETCH_ALL_BOOKS_________________________________

import { allBooksAPI } from "../constants/APIConstants";

const fetchAllBooks = async () => {
  try {
    const response = await fetch(allBooksAPI);
    const responseData = await response.json();
    const allBooks = responseData.books;
    console.log("From fetchAllBooks: ", allBooks);
    return allBooks;
  } catch (error) {
    console.log("Uh oh! There was an issue fetching all books!", error);
  }
};

//___________________________________________FETCH_SINGLE_BOOK______________________________

const fetchSingleBook = async (bookId) => {
  try {
    const response = await fetch(`${allBooksAPI}/${bookId}`);
    const responseData = await response.json();
    const book = responseData;
    console.log("From fetchSingleBook");
    return book;
  } catch (error) {
    console.log("Uh Oh! There was an issue fetching this book!", error);
  }
};

export { fetchAllBooks, fetchSingleBook };

//____________________________________FETCH_CHECKED_OUT_BOOKS_____________________________________________

export const fetchCheckedOutBooks = async (userId, token) => {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch checked-out books");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching checked-out books:", error);
    throw error;
  }
};

//______________________________________RETURN_BOOK____________________________________________

export const returnBook = async (bookId, token) => {
  try {
    const response = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to return the book");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error returning the book:", error);
    throw error;
  }
};
