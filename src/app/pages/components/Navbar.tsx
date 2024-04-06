import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Bookstore</Link>
        </h1>
        <nav>
          <ul
            className="flex space-x-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/pages">BookList</Link>
            </li>
            <li>
              <Link href="/pages/components/profile">Profile</Link>
            </li>
            <li className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mx-auto">
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
