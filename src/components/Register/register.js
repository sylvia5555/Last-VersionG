import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import welcom from "../../Assets/gallery/welcom2.jpg";

export default function Register() {
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [PasswordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function signup(event) {
    event.preventDefault();

    if (password !== PasswordConfirmation) {
      setError("Passwords do not match!");
      return;
    }

    let item = { UserName, email, password, PasswordConfirmation };
    try {
      let response = await fetch(
        "http://night-at-the-museum.runasp.net/api/account/register",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let result = await response.json();
      console.log("User data:", result);

      if (result && result.token) {
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/login");
      } else {
        setError("Invalid registration details");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="regpage" style={{ marginTop: "140px" }}>
      <h2 className="heading reh" style={{ marginLeft: "114px", textAlign: "left" }}>
        Hello! Register to <br /> get started!
      </h2>
      <div className="container">
        <img src={welcom} className="reimg" alt="Welcome" />
        <form className="regf" onSubmit={signup}>
          <h2
            style={{
              color: "var(--main)",
              fontWeight: "bold",
              marginBottom: "30px",
              fontSize: "1.8rem",
              textAlign: "center",
            }}
          >
            Register
          </h2>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <input type="text" value={UserName} placeholder="UserName" onChange={(e) => setUserName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={PasswordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            Register
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link head changs">
              Login Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
