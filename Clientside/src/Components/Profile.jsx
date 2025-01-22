import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileInfo from "./ProfilePage";
import Cart from "./Cart";
import WishList from "./Wishlist";
import MyOrder from "./MyOrder";
import "./Profile.scss";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [accType, setAccType] = useState(null); // To store the user's account type
  const [error, setError] = useState(null); // To handle API errors
  const token = localStorage.getItem("token");

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/getuserData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          const user = res.data.usr;
          setAccType(user.accType); // Set the user's account type
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to Logout?");
    if (!confirmDelete) return;
    localStorage.removeItem("token");
    alert("Successfully logged out!");
    navigate("/login");
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Conditional rendering for menu items and sections
  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <h2>My Account</h2>
        <ul>
          <li onClick={() => handleSectionChange("profile")}>Profile</li>
          {accType === "Buyer" && (
            <>
              <li onClick={() => handleSectionChange("cart")}>Cart</li>
              <li onClick={() => handleSectionChange("wishlist")}>Wishlist</li>
              <li onClick={() => handleSectionChange("orders")}>My Orders</li>
            </>
          )}
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="profile-content">
        {error && <div className="error-message">{error}</div>} {/* Display error if API fails */}
        {activeSection === "profile" && <ProfileInfo />}
        {activeSection === "cart" && accType === "Buyer" && <Cart />}
        {activeSection === "wishlist" && accType === "Buyer" && <WishList />}
        {activeSection === "orders" && accType === "Buyer" && <MyOrder />}
      </div>
    </div>
  );
};

export default ProfilePage;
