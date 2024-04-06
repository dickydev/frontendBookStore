"use client";
import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BookCard from "./components/BookCard";
import CategoryMenu from "./components/CategoryMenu";
import ShoppingCartItem from "./components/ShoppingCartItem";

const HomeIndex = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);
  const [loadedBooks, setLoadedBooks] = useState<Book[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [numToShow, setNumToShow] = useState(12);

  useEffect(() => {
    fetch("http://localhost:4001/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);

        setLoadedBooks(data.slice(0, visibleCount));
      });
  }, []);

  const getTags = (books: Book[]): Category[] => {
    const tagsSet = new Set<string>();
    books.forEach((book) => {
      const bookTags = book.tags.split(",");
      bookTags.forEach((tag) => {
        tagsSet.add(tag.trim());
      });
    });

    return Array.from(tagsSet).map((tag, index) => ({
      id: index.toString(),
      name: tag,
    }));
  };

  useEffect(() => {
    const newVisibleBooks = books.slice(0, numToShow);
    setVisibleBooks(newVisibleBooks);
  }, [books, numToShow]);

  const handleLoadMore = () => {
    setNumToShow(numToShow + 12);
  };

  const tags = getTags(books);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
    setLoadedBooks(books.slice(0, visibleCount + 9));
  };

  interface Book {
    id: string;
    title: string;
    writer: string;
    cover_image: string;
    tags: string;
  }

  interface Category {
    id: string;
    name: string;
  }

  const categories = getTags(books);

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <CategoryMenu categories={categories} />
        <h2 className="text-2xl font-semibold mb-4">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadedBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              imageUrl={book.cover_image}
              author={book.writer}
              id={book.id}
              tags={book.tags}
            />
          ))}
        </div>
        {books.length > visibleCount && (
          <button
            onClick={loadMore}
            className="bg-white w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mx-auto mt-4"
          >
            Load More
          </button>
        )}

        <h2 className="text-2xl font-semibold mt-8 mb-4">Shopping Cart</h2>
        {loadedBooks.map((item) => (
          <ShoppingCartItem
            price={0}
            quantity={0}
            imageUrl={item.cover_image}
            key={item.id}
            {...item}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomeIndex;
