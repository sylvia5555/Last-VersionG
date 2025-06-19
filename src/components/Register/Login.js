
import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import loginimg from "../../Assets/gallery/welcom2.jpg";
import "../../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showContent, setShowContent] = useState(false); // ✅ إضافة useState
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  async function login() {
    let item = { email, password };

    try {
      let response = await fetch("http://night-at-the-museum.runasp.net/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      
      let result = await response.json();
      console.log("User data:", result);

      if (result && result.token) {
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/");
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="loginp" style={{ marginTop: "100px" }}>
      <h2 className="heading" style={{ marginLeft: "114px", textAlign: "left" }}>
        Welcome back! Glad<br />to see you again!
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
        <div className={`content-wrapper ${showContent ? "show" : ""}`}> {/* ✅ إصلاح المشكلة */}
          <div className="image-side">
            <img src={loginimg} alt="Login" className="account-image" />
          </div>

          <div className="form-side">
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
                Login
              </h2>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <p style={{ textAlign: "right", cursor: "pointer", fontSize: "0.9rem" }}>
                 <Link to="/forget-password" className="fp" style={{fontSize:"17px !important"}}>Forgot Password?</Link>
                </p>
                <button
                  type="button"
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
                  onClick={login}
                >
                  Login
                </button>
              </form>

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                  <hr style={{ width: "30%", border: "none", borderTop: "1px solid #ccc" }} />
                  <span style={{ margin: "0 10px", fontSize: "1rem", color: "#666" }}>or login with</span>
                  <hr style={{ width: "30%", border: "none", borderTop: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <FaGoogle size={32} style={{ color: "#DB4437", cursor: "pointer" }} />
                  <FaFacebook size={32} style={{ color: "#1877F2", cursor: "pointer" }} />
                  <FaXTwitter size={32} style={{ color: "#000000", cursor: "pointer" }} />
                </div>
              </div>
              <p style={{ marginTop: "15px", fontSize: "1rem" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }} className="head changs">
                  Register Now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
