// components/CategoryMenu.tsx
import React from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  return (
    <nav className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex space-x-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={"/books/" + category.name}
                className="text-gray-600 hover:text-gray-800"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryMenu;
