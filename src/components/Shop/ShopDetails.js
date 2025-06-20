import React, { useState, useEffect, useContext } from "react";
import "./ShopDetails.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ShopDetails = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [apiError, setApiError] = useState("");

  // Authentication logic
  const getAuthToken = () => {
    const storedUser = localStorage.getItem("user-info");
    if (!storedUser) {
      setApiError("Please log in to proceed.");
      navigate("/login");
      return null;
    }
    return JSON.parse(storedUser).token;
  };

  // Fetch product
  useEffect(() => {
    fetch(`http://night-at-the-museum.runasp.net/api/Souvenir/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching item:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !name || rating === 0) return;
    const newReview = { text: reviewText, name, rating };
    setReviews([newReview, ...reviews]);
    setReviewText("");
    setName("");
    setRating(0);
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>The item does not exist.</p>;

  return (
    <div className="divContainer">
      <div className="item-details">
        <div className="item-img">
          <img src={item.pictureUrl} alt={item.name} />
        </div>
        <div className="item-heading">
          <h1>{item.name}</h1>
          <p className="item-price">${item.price}</p>
          <p className="item-desc">{item.description}</p>
          <div className="item-btn">
            <div className="quantity-input">
              <button
                onClick={() => setValue((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                -
              </button>
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  setValue(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
              <button onClick={() => setValue((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add-to-cart btn"
              onClick={() =>
                addToCart({
                  id: item.id,
                  title: item.name,
                  img: item.pictureUrl,
                  price: item.price,
                  quantity: value,
                })
              }
            >
              Add To Cart
            </button>
            <button
              className="add-to-cart btn"
              onClick={() => {
                const token = getAuthToken();
                if (!token) return;

                const basketData = {
                  items: [
                    {
                      id: item.id,
                      title: item.name,
                      price: item.price,
                      quantity: value,
                    },
                  ],
                };

                fetch("http://night-at-the-museum.runasp.net/api/basket", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(basketData),
                })
                  .then((res) => {
                    if (!res.ok) throw new Error("Failed to save basket");
                    return res.json();
                  })
                  .then((data) => {
                    console.log("Basket saved:", data);
                    navigate("/CartPayment", {
                      state: {
                        source: "shop",
                        items: basketData.items,
                        orderId: data.orderId || item.id, // Adjust based on response
                      },
                    });
                  })
                  .catch((err) => {
                    console.error("Failed to save basket:", err);
                    setApiError("Failed to proceed to checkout.");
                  });
              }}
            >
              Buy Now
            </button>
          </div>
          {apiError && <p className="error-message">{apiError}</p>}
          <hr />
          <Link to={`/category/${item.souvenierType}`} className="itemCategory">
            <p className="item-category">
              Category: <span>{item.souvenierType}</span>
            </p>
          </Link>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "additional" ? "active" : ""}
            onClick={() => setActiveTab("additional")}
          >
            Additional information
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>
        <div className="tabs-content">
          {activeTab === "description" && (
            <div>
              <p>{item.description}</p>
            </div>
          )}
          {activeTab === "additional" && (
            <div>
              <p>Additional information about {item.name}.</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="reviews-section">
              <h3>Reviews</h3>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <strong>{review.name}</strong>
                    <span className="stars">
                      {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                    </span>
                    <p>{review.text}</p>
                  </div>
                ))
              )}
              <h3>Leave a Review</h3>
              <form onSubmit={handleSubmit} className="review-form">
                <label>Your Rating:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= (hoverRating || rating)
                          ? "filled-star"
                          : "empty-star"
                      }
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <label>Your Review:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;