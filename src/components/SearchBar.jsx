import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search courses or instructors..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;