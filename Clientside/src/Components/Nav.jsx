import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.scss";

const Navbar = ({setName}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Successfully logged out!");
    // location.reload();
    navigate("/")
  };

  const handlecart=()=>{
    navigate("/cart")
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="logo">
          Flipkart <span className="explore">Explore <span className="plus">Plus</span></span>
        </span>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products, brands and more"
          onChange={(e) => setName(e.target.value)}/>
        <button className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </div>
      <div className="navbar-right">
      <Link to="/" className="menu-item">Home</Link>
        {token ? (
          <div className="dropdown">
            <button className="dropdown-btn">Account</button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="menu-item">Login</Link>
        )}
        <div className="menu-item">More</div>
        <div className="menu-item cart">
          <FaShoppingCart className="cart-icon" onClick={handlecart} />
          <span className="cart-count"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;