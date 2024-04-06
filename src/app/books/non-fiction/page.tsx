"use client";
import React from "react";
import BookCard from "../BookCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

const NonFinctionBookDashboard = () => {
  // Filter buku-buku yang memiliki tag "science"
  // const scienceBooks = books.filter((book) => book.tags.includes("science"));
  const [nonfictionBooks, setNonFictionBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data buku dari endpoint book
        const response = await axios.get("http://localhost:4001/books");

        // Filter buku-buku yang memiliki tag "science"
        const filteredBooks = response.data.filter((book: any) =>
          book.tags.includes("essay")
        );

        // Mengatur state scienceBooks dengan buku-buku yang memiliki tag "science"
        setNonFictionBooks(filteredBooks);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 mb-20">
        <h2 className="text-2xl font-semibold mb-4">Essay Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nonfictionBooks.map((book) => (
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

export default NonFinctionBookDashboard;
