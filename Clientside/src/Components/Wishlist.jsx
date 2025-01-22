import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Wishlist.scss";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/getWishList", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlistItems(res.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlist();
  }, [token]);

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <Link
              to={`/products/${item.productId}`}
              className="wishlist-item"
              key={item.productId}
            >
              <img src={item.thumbnail} alt={item.name} className="thumbnail" />
              <h3 className="name">{item.name}</h3>
              <p className="price">₹{item.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="wishlist-empty">
          <p>No items in your wishlist yet.</p>
          
        </div>
      )}
    </div>
  );
};

export default Wishlist;
