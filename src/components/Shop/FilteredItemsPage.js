import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FilteredItemsPage = () => {
  const { categoryName } = useParams(); // URL param: Jewelry, Statue, etc.
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "http://nightatthemuseum.runasp.net/api/Souvenir"
        );
        const data = await res.json();

        if (Array.isArray(data.data)) {
          const filtered = data.data.filter(
            (item) =>
              item.souvenierType.toLowerCase() === categoryName.toLowerCase()
          );
          setItems(filtered);
        } else {
          console.error("Invalid API response:", data);
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching souvenirs", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryName]);

  return (
    <div className="divContainer">
      <div className="general-heading">
        <p>Items in</p>
        <h1>{categoryName}</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items found in this category.</p>
      ) : (
        <div className="shop-container columns-4">
          {items.map((item) => (
            <div key={item.id} className="shop-item">
              <Link to={`/item/${item.id}`} className="itemTitle">
                <img src={item.pictureUrl} alt={item.name} />
              </Link>
              <h3>{item.name}</h3>
              <p className="itemPrice">₺{item.price}</p>
              <button>Add to cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredItemsPage;