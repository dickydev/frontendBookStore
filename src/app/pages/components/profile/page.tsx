"use client";
import React from "react";
import Navbar from "../Navbar";
import ProfilePage from "../ProfilePage";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import AuthLayout from "@/app/contexts/AuthContext";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localName = localStorage.getItem("name");
      const localEmail = localStorage.getItem("email");
      if (localName && localEmail) {
        setName(localName);
        setEmail(localEmail);
      }
    }
  }, []);

  return (
    <>
      <AuthLayout>
        <Navbar />
        <ProfilePage name={name} email={email} />
        <Footer />
      </AuthLayout>
    </>
  );
};

export default Profile;
