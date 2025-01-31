

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

const categories = [
  "Lipstick", "Makeup", "NailPolish", "Jewels", "Skincare",
   "Hair Care", "Body Care", "Perfume"
];

const Home = ({ name }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(20000);

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!token) {
        try {
          const res = await axios.get("http://localhost:3002/api/getAllProducts");
          if (res.status === 200) {
            setProducts(res.data.products);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        try {
          const res = await axios.get("http://localhost:3002/api/getAllOtherProducts", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.status === 200) {
            setProducts(res.data.products);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          localStorage.removeItem("token");
          location.reload();
        }
      }
    };

    fetchAllProducts();
  }, [token]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesName = product.name?.toLowerCase().includes(name?.toLowerCase() || "");
    const matchesPrice = product.price <= priceRange;
    return matchesCategory && matchesName && matchesPrice;
  });

  return (
    <div className="home-page">
      <h2>All Products</h2>

      {/* Category Filter */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        {selectedCategory && (
          <button className="clear-filter-button" onClick={() => setSelectedCategory("")}>Clear Filter</button>
        )}
      </div>

      {/* Price Filter Slider */}
      <div className="price-filter">
        <label>Max Price: ₹{priceRange}</label>
        <input
          type="range"
          min="0"
          max="20000"
          step="10"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="product-item">
              <img src={product.thumbnail} alt={product.name} className="product-thumbnail" />
              <span className="product-name">{product.name}</span>
              <br /><br />
              <div className="product-price">₹{product.price}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Home;

