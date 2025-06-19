import React, { useState, useEffect, useContext } from "react";
import "./Shop.css";
import ShopData from "./ShopData";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  // Fetch types on mount
  useEffect(() => {
    fetch("http://night-at-the-museum.runasp.net/api/Souvenir/Types")
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  // Fetch products when sort or type changes
  useEffect(() => {
    let url = `http://night-at-the-museum.runasp.net/api/Souvenir?sort=${sortOption}`;
    if (selectedTypeId) {
      url += `&Typeid=${selectedTypeId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Unexpected structure:", data);
        }
      })
      .catch((error) => console.error("Error fetching souvenirs:", error));
  }, [sortOption, selectedTypeId]);

  return (
    <>
      <div className="general-heading">
        <p>Buy a special gift!</p>
        <h1>Shop</h1>
      </div>
      <form className="shop-toolbar" method="get">
        <div className="toolbar-content">

          {/* Sort Dropdown */}
          <select
            className="orderby"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Default (Name)</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          {/* Search Field */}
          <input
            type="text"
            className="shop-search"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>
      </form>

      <div className="shop-container columns-4">
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className="shop-item" key={item.id}>
                <Link to={`/item/${item.id}`} className="itemTitle">
                  <img src={item.pictureUrl} alt="briefTours" />
                </Link>
                <h3 className="head">{item.name}</h3>

                <Link
                  to={`/category/${item.souvenierType}`}
                  className="itemCategory"
                >
                  <p>Category: {item.souvenierType}</p>

                </Link>

                <div className="categoryContianer">
                  <button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        title: item.name,
                        img: item.pictureUrl,
                        price: item.price,
                        quantity: item.quantity || 1, 
                      })
                    }
                  >
                    Add to cart
                  </button>
                  <p className="itemPrice">${item.price}</p>
                  
                </div>

              </div>
            ))) : (
            <p>No items match your search.</p>
          )
        }
      </div>
    </>
  );
};

export default Shop;