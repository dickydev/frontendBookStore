import React from "react";

interface ProfileProps {
  name: string;
  email: string;
}

const ProfilePage: React.FC<ProfileProps> = ({ name, email }) => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="bg-white p-6 shadow-md rounded-md">
        <p className="text-gray-800 mb-4">
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p className="text-gray-800 mb-4">
          <span className="font-semibold">Email:</span> {email}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
