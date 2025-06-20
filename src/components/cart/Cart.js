import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">Shopping Cart</h2>
      {apiError && <p className="error-message">{apiError}</p>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <Link to="/shop">
            <button className="btn shop-btn">Return to Shop</button>
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Subtotal ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.title, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="qty-btn minus"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.title, item.quantity + 1)
                        }
                        className="qty-btn plus"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.title)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Cart Totals</h3>
            <p>
              Total: <strong>${subtotal.toLocaleString()}</strong>
            </p>

            <div className="checkout-buttons">
              <button
                className="checkout-btn"
                onClick={() => {
                  const token = getAuthToken();
                  if (!token) return;

                  const basketData = {
                    items: cartItems.map((item) => ({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      quantity: item.quantity,
                    })),
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
                          orderId: data.orderId || cartItems[0].id, // Adjust based on response
                        },
                      });
                    })
                    .catch((err) => {
                      console.error("Failed to save basket:", err);
                      setApiError("Failed to proceed to checkout.");
                    });
                }}
              >
                Proceed to Checkout
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;