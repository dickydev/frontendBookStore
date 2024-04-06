"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "../components/Footer";
import BookList from "./components/BookList";
import AuthLayout from "../contexts/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localName = localStorage.getItem("name");
      const localEmail = localStorage.getItem("email");
      const localCustomerId = localStorage.getItem("id");
      const localPoints = localStorage.getItem("points");
      if (localName && localEmail) {
        setName(localName);
        setEmail(localEmail);
        setCustomerId(Number(localCustomerId));
        setPoints(Number(localPoints));
      }
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4001/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const localPoints = localStorage.getItem("points");
  console.log(localPoints);

  return (
    <>
      <AuthLayout>
        <Navbar />
        <BookList
          books={books}
          customerId={customerId || 0}
          customerPoints={points || 0}
        />
        <Footer />
      </AuthLayout>
    </>
  );
};

export default Dashboard;
