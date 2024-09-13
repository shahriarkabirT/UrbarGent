// pages/categories.jsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFetchAllCategoriesQuery } from '@/store/slices/api/categoryApiSlice'; // Adjust import based on your file structure

const Categories = () => {
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  if (isLoading) return <p className="content-center">Loading categories...</p>;
  if (error) return <p>Error fetching categories: {error.message}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {categoryList.length === 0 ? (
        <p>No categories available</p>
      ) : (
        categoryList.map((category) => (
          <Link key={category._id} href={`/products?category=${category._id}`} className="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </Link>
        ))
      )}
    </div>
  );
};

export default Categories;