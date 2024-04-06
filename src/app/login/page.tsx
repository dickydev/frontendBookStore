"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Dashboard from "../pages/page";
import Link from "next/link";

const LoginForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<any>(
        "http://localhost:4001/customers/login",
        { name, email }
      );
      const responseData = response.data.customer;

      if (responseData && responseData.name && responseData.email) {
        const pointsResponse = await axios.get<any>(
          `http://localhost:4001/customers/${responseData.id}`
        );

        console.log("point res : ", pointsResponse.data.points);

        const points = pointsResponse.data.points;

        localStorage.setItem("name", responseData.name);
        localStorage.setItem("email", responseData.email);
        localStorage.setItem("id", responseData.id);
        localStorage.setItem("points", points);

        console.log("Login successful:", responseData);
        setIsLoggedIn(true);
        router.push("/pages");
      } else {
        setError("Invalid response format");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="max-w-md mx-auto mt-8 shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-white-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            style={{ color: "black" }}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            style={{ color: "black" }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-dark border border-blue-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Login
        </button>

        <Link href="/" style={{ marginTop: 20 }}>
          <button className="w-full my-5 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
            Go to Dashboard
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
