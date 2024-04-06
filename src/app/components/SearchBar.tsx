const SearchBar: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search for books..."
        className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
