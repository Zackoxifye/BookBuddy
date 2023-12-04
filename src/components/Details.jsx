import React, { useState, useEffect } from "react";
import bookModal from "./bookModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSingleBook } from "../../../API";

const DetailsPage = () => {
  const [books, setBooks] = useState([]);
  const { id } = useParams();
  console.log(id);
  const [book, setBook] = useState(null);
  useEffect(() => {
    async function selectedBook() {
      try {
        const data = await fetchSingleBook(id);
        console.log(data.book);
        setBook(data.book);
      } catch (err) {
        console.log(err);
      }
    }
    selectedBook();
  }, []);
  return (
    <div id="bookDetails">
      <bookModal book={book} />
    </div>
  );
};

export default DetailsPage;
