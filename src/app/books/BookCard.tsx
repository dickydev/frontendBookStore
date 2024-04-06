import React, { useState } from "react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  tags: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  imageUrl,
  tags,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const handleViewDetails = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover mb-4"
      />
      <div className="mb-2" style={{ color: "black" }}>
        <h3 className="text-xl text-black-500 font-semibold">{title}</h3>
        <p className="text-gray-500">{author}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Tags: {tags}</p>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>

      {isPopupVisible && (
        <div
          style={{ color: "black" }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img src={imageUrl} alt="" />
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <p className="text-lg">{author}</p>
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mt-4"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
