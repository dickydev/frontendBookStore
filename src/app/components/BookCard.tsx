// components/BookCard.tsx

import Image from "next/image";

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  tags: string;
}

const BookCard: React.FC<Book> = ({ id, title, author, imageUrl, tags }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4" style={{ color: "black" }}>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{author}</p>
        <p className="text-sm text-gray-600">{tags}</p>
      </div>
    </div>
  );
};

export default BookCard;
