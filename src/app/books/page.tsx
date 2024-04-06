"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BookCard from "./BookCard";

const BooksDashboard = () => {
  const [scienceBooks, setScienceBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001/books");
        setScienceBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredBooks(scienceBooks);
    } else {
      const filtered = scienceBooks.filter((book) =>
        selectedTags.every((tag) => book.tags.includes(tag))
      );
      setFilteredBooks(filtered);
    }
  }, [selectedTags, scienceBooks]);

  useEffect(() => {
    const regex = new RegExp(searchTerm, "i");
    const filtered = scienceBooks.filter(
      (book) => regex.test(book.title) || regex.test(book.writer)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, scienceBooks]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 mb-20">
        <h2 className="text-2xl font-semibold mb-4">Books</h2>
        <div className="flex items-center md:flex-row md:items-center md:justify-between space-x-4 mb-4">
          <input
            style={{ color: "black" }}
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <select
            multiple
            style={{ color: "black" }}
            value={selectedTags}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setSelectedTags(selectedOptions);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            {[...new Set(scienceBooks.map((book) => book.tags))]
              .reduce((acc, curr) => acc.concat(curr), [])
              .map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.writer}
              imageUrl={book.cover_image}
              tags={book.tags}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BooksDashboard;
