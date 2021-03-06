import { useEffect, useState } from "react";
import Book from "../book/Book";
import Loader from "../loader/Loader";

const Books = () => {
  const [books, setbooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    fetch("https://in3.dev/knygos/")
      .then((response) => response.json())
      .then((data) => setbooks(data))
      .catch((error) => setErrorMsg(error.message));
  }, []);

  useEffect(() => {
    fetch("https://in3.dev/knygos/types/")
      .then((response) => response.json())
      .then((data) => setbooks(data))
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => (
          <Book
            key={book.id}
            title={book.title}
            author={book.author}
            url={book.img}
            type={
              types.lenght > 0 &&
              types.find((type) => type.id === book.type).title
            }
            price={book.price}
          />
        ))
      ) : (
        <Loader />
      )}

      {/* {errorMsg && <h1>{errorMsg}</h1>} */}
    </div>
  );
};

export default Books;
