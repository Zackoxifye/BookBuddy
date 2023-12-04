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
