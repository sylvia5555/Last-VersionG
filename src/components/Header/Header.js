import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "./Header.css";
import logo from "../../Assets/gallery/logo2.png";
import { CartContext } from "../../context/CartContext"; 
import { useContext } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userInfo = localStorage.getItem("user-info");
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ إعادة التوجيه إذا لم يكن المستخدم مسجلًا
useEffect(() => {
  const publicRoutes = ["/login", "/register", "/forget-password"];
  if (!userInfo && !publicRoutes.includes(location.pathname)) {
    navigate("/login");
  }
}, [userInfo, location.pathname, navigate]);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <img src={logo} style={{ width: "60px" }} alt="Museum Logo" />
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={`header-link ${location.pathname === "/" ? "home-active" : ""}`} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" className="header-link" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link to="/events" className="header-link" onClick={() => setMenuOpen(false)}>
          Events
        </Link>
        <Link to="/sections" className="header-link" onClick={() => setMenuOpen(false)}>
          Departments
        </Link>
        <Link to="/contact" className="header-link" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <Link to="/ticket" className="header-link" onClick={() => setMenuOpen(false)}>
          Buy a ticket?
        </Link>
        <Link to="/Shop" className="header-link" onClick={() => setMenuOpen(false)}>Shop</Link>
      </nav>

      <div className="header-right">
        {userInfo ? (
          <button className="btn logout-btn" onClick={() => {
            localStorage.removeItem("user-info");
            navigate("/login");
          }}>
            Logout
          </button>
        ) : (
          <>
            <Link className="btn login-btn" to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link className="btn register-btn" to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        )}

        <Link to="/profile" className="icon" onClick={() => setMenuOpen(false)}>
          <FaUser size={22} title="Profile" />
        </Link>
<Link to="/cart" className="icon cart-icon" onClick={() => setMenuOpen(false)}>
  <FaShoppingCart size={22} title="Cart" />
  {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
</Link>

        {/* <div className={`toggle-icon ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div> */}
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/sections" onClick={() => setMenuOpen(false)}>Departments</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/ticket" onClick={() => setMenuOpen(false)}>Buy a Ticket?</Link>
          <Link to="/Shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
