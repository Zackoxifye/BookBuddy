import React from "react";

const bookModal = ({ book }) => {
  return (
    <div>
      <div className="bookCard">
        <img src={book?.imageUrl} alt={book?.name} />
        <p>
          Title: {book?.title}
          <br />
          Author: {book?.author}
          <br />
          Availability: {book?.available}
        </p>
      </div>
    </div>
  );
};

export default bookModal;
