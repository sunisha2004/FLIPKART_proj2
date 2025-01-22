import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Category.scss"; // Import the SCSS file

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/getProductsByCategory/${category}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchProductsByCategory();
  }, [category, token]);

  return (
    <div className="category-page">
      <h2>Products in {category}</h2>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img src={product.thumbnail} alt={product.name} className="product-thumbnail" />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
