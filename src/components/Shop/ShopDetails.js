import React, { useState, useEffect, useContext } from "react";
import "./ShopDetails.css";
// import ShopData from "./ShopData";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ShopDetails = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useParams();
  // const item = ShopData.find((item) => item.id === parseInt(id));

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product from API based on ID
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


  // const increaseValue = () => {
  //   setValue(value + 1);
  // };

  // const decreaseValue = () => {
  //   if (value > 1) {
  //     setValue(value - 1);
  //   }
  // };

  // end button

  // button item count
  const [value, setValue] = useState(1);

  // active tab

  const [activeTab, setActiveTab] = useState("description");

  // reviews
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !name || rating === 0) return;

    const newReview = { text: reviewText, name, rating };
    setReviews([newReview, ...reviews]);
    setReviewText("");
    setName("");
    setRating(0);
  };

  // end reviews

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>The item does not exist.</p>;

  return (
    <>
      {item ? (
        <div className="divContainer">
          <div className="item-details">
            <div className="item-img">
              <img src={item.pictureUrl} alt={item.name}></img>
            </div>
            <div className="item-heading">
              <h1 >{item.name}</h1>
              <p className="item-price">{item.price}$</p>
              <p className="item-desc">{item.description}</p>
              <div className="item-btn">
                <div className="quantity-input">
                  {/* <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      setValue(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  /> */}
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
                {/* <Link to={"/CartPayment"}>
                  <button className="add-to-cart">Buy Now</button>
                </Link> */}
                <button
                  className="add-to-cart btn"
               onClick={() => {
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(basketData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Basket saved:", data);
      navigate("/CartPayment");
    })
    .catch((err) => {
      console.error("Failed to save basket:", err);
    });
}}
                >
                  Buy Now
                </button>
              </div>
              <hr />
              <Link
                to={`/category/${item.souvenierType}`}
                className="itemCategory">
                <p className="item-category">
                  Category: <span>{item.souvenierType}</span>
                </p>
              </Link>

              <p className="item-tags">
                {/* Tags: <span>{item.tags.join(", ")}</span> */}
              </p>
            </div>
          </div>

          <div className="tabs-container">
            {/* Tabs Header */}
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

            {/* Tabs Content */}
            <div className="tabs-content">
              {activeTab === "description" && (
                <div>
                  <p>
                    Own a Piece of History Step back in time and bring the
                    grandeur of Ancient Egypt into your collection with this
                    exquisite replica of the Statue of Ra-Hotep. Crafted with
                    museum-grade precision, this piece embodies the elegance and
                    mystery of Egypt’s Golden Age.
                  </p>
                </div>
              )}
              {activeTab === "additional" && (
                <div>
                  <p>
                    🔹 Authentic Detailing – Meticulously sculpted to capture
                    the intricate carvings, lifelike posture, and original red
                    ochre pigment found in the ancient masterpiece. <br />
                    🔹 Premium Materials – Made from high-quality limestone
                    resin, with hand-painted details to reflect the
                    craftsmanship of the original 4th Dynasty artifact. <br />
                    🔹 Perfect Display Piece – Whether for your home, office, or
                    gallery, this stunning statue adds a touch of history and
                    sophistication to any space. <br />
                    🔹 Limited Edition – Each piece comes with a certificate of
                    authenticity, ensuring its place as a
                  </p>
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
                          {"★".repeat(review.rating) +
                            "☆".repeat(5 - review.rating)}
                        </span>
                        <p>{review.text}</p>
                      </div>
                    ))
                  )}

                  <h3>Leave a Review</h3>
                  <form onSubmit={handleSubmit} className="review-form">
                    <label>Your Rating:</label>
                    {/* Star Rating */}
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
      ) : (
        <p>The item is out of the stock</p>
      )}
    </>
  );
};

export default ShopDetails;