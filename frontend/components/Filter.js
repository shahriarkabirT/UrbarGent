import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useFetchAllCategoriesQuery } from "../store/slices/api/categoryApiSlice"; 

const sortOptions = [
  { value: "", label: "Select" },
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const Filter = ({ state, dispatch }) => {
  const { data: categories, isLoading, isError } = useFetchAllCategoriesQuery();

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  const handleSort = (e) => {
    dispatch({ type: "SET_SORT", payload: e.target.value });
  };

  const handleCategory = (e) => {
    dispatch({ type: "SET_CATEGORY", payload: e.target.value });
  };

  return (
    <div className="px-4 py-4 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md border rounded-md text-black text-lg">
      {/* Search Input */}
      <div className="relative w-full md:w-auto flex items-center">
        <input
          type="text"
          placeholder="Search your products..."
          className="px-10 py-2 border rounded-lg w-full md:w-80"
          value={state.search}
          onChange={handleSearch}
        />
        <AiOutlineSearch
          className="text-gray-600 cursor-pointer absolute top-2 left-2"
          size={24}
        />
      </div>

      {/* Filters Container */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
        {/* Category Dropdown */}
        <div className="flex items-center">
          <h1 className="mr-2">Category:</h1>
          <select
            className="p-2 border rounded-lg"
            value={state.category}
            onChange={handleCategory}
            disabled={isLoading || isError}
          >
            <option value="">All Categories</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center">
          <h1 className="mr-2">Sort By:</h1>
          <select className="p-2 border rounded-lg" value={state.sort} onChange={handleSort}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;