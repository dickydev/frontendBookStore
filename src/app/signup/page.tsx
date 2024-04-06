"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //   const [latestId, setLatestId] = useState<number>();
  const [points, setPoints] = useState<number>(100);
  //   const [error, setError] = useState("");
  const [latestId, setLatestId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await fetch("http://localhost:4001/customers/");
        if (!response.ok) {
          throw new Error("Failed to fetch latest customer ID");
        }
        const data = await response.json();
        console.log(data);

        // Mencari nilai tertinggi dari ID
        let maxId = 0;
        data.forEach((customer: { id: number }) => {
          if (customer.id > maxId) {
            maxId = customer.id;
          }
        });

        console.log("Max ID:", maxId + 1);
        setLatestId(maxId + 1);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLatestId();

    // Cleanup function if needed
    return () => {
      // Perform cleanup tasks here
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Mendapatkan ID terbaru dari database
      //   const response = await axios.get(
      //     "http://localhost:4001/customers/latestId"
      //   );

      //   const latestId = response.data.latestId;
      //   setLatestId(latestId);
      //   console.log(latestId);

      // Membuat data baru untuk dikirimkan
      const newCustomer = {
        id: latestId, // Increment id terbaru untuk membuat id baru
        name: name,
        email: email,
        points: points, // Menetapkan nilai points secara otomatis
      };

      // Melakukan post data ke endpoint untuk register customer
      await axios.post("http://localhost:4001/customers", newCustomer);
      console.log("Registration successful");
      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ color: "black" }}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
            Id
          </label>
          <input
            disabled
            type="text"
            id="id"
            value={latestId}
            onChange={(e) => setLatestId(parseInt(e.target.value))}
            style={{ color: "black" }}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            style={{ color: "black" }}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="points"
            className="block text-gray-700 font-medium mb-2"
          >
            Points
          </label>
          <input
            type="number"
            id="points"
            disabled
            value={points}
            style={{ color: "black" }}
            onChange={(e) => setPoints(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
