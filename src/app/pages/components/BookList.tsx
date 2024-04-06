"use client";
import React, { useState } from "react";
import OrderForm from "../order/page";
import Modal from "./Modal";

interface Book {
  id: number;
  title: string;
  price: number;
  cover_image: string;
}

interface BookListProps {
  books: Book[];
  customerId: number;
  customerPoints: number;
}

const BookList: React.FC<BookListProps> = ({
  books,
  customerId,
  customerPoints,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  console.log(customerPoints);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{ color: "black" }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <p className="text-gray-500">id : {book.id}</p>
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full h-48 object-cover mb-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-500">${book.price}</p>
            </div>
            <button
              onClick={() => handleSelectBook(book)}
              className="bg-indigo-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      {selectedBook && (
        <Modal closeModal={closeModal}>
          <div className="p-4">
            <img
              src={selectedBook.cover_image}
              alt={selectedBook.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Buy {selectedBook.title}</h3>
            <OrderForm
              customerId={customerId}
              bookId={selectedBook.id}
              price={selectedBook.price}
              onSubmitSuccess={closeModal}
              pointsCustomer={customerPoints}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BookList;
