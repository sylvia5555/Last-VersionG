import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loginimg from "../../Assets/gallery/welcom2.jpg";
import "../../App.css";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showContent, setShowContent] = useState(true); 
  useEffect(() => {
    document.body.classList.add("loginp");
    return () => {
      document.body.classList.remove("loginp");
    };
  }, []);

    useEffect(() => {
      setTimeout(() => setShowContent(true), 300);
    }, []);

    const handleForgetPassword = async (e) => {
      e.preventDefault();
      setMessage("");
      setError("");
  
      try {
        console.log(" Sending request to API...");
  
        const response = await axios.post(
          "http://night-at-the-museum.runasp.net/api/account/ForgetPassword",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("✅ API Response:", response.data);
  
        if (response.data.message) { 
          setMessage(response.data.message);
      } else {
          setError("Something went wrong. Please try again.");
      }
      
      } catch (err) {
        console.error("❌ API Error:", err);
        setError(err.response?.data?.message || "Failed to send request.");
      }
    };

  return (
    <div className="loginp" style={{ marginTop: "100px" }}>
      <h2 className="heading" style={{ marginLeft: "114px", textAlign: "left" }}>
        Forgot your password? <br /> No worries, we got you!
      </h2>

      <div
        className="create-account-container"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "-70px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div className={`content-wrapper ${showContent ? "show" : ""}`}>
          <div className="image-side">
            <img src={loginimg} alt="Forget Password" className="account-image" />
          </div>

          <div className="form-side">
            {showContent ? (
              <div
                style={{
                  padding: "50px",
                  width: "500px",
                  textAlign: "center",
                  marginTop: "-50px",
                  marginLeft: "-69px",
                }}
                className="content"
              >
                <h2
                  style={{
                    color: "var(--main)",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: "1.8rem",
                  }}
                >
                  Reset Password
                </h2>

                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleForgetPassword}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px",
                        background: "#f7f7f7",
                        width: "100%",
                        fontSize: "1rem",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{
                      background: "var(--linear-gradient)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Submit
                  </button>
                </form>
                <p style={{ marginTop: "15px", fontSize: "1rem" }}>
                  Remember your password?{" "}
                  <Link to="/login" style={{ color:"#0a2540", cursor: "pointer", fontWeight: "bold" }}>
                    Login Now!
                  </Link>
                </p>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontSize: "1.2rem", color: "green" }}>
                An email has been sent to reset your password. Please check your inbox.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
