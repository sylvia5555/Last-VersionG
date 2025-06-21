import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://night-at-the-museum.runasp.net/api/Souvenir/Types"
        );
        const data = await res.json();
        setCategories(data); // data is an array of objects with { id, name }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="divContainer">
      <h1>Select a Category</h1>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
