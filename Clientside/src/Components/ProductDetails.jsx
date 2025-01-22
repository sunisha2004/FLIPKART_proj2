import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetailPage.scss";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/getProduct/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          const productData = res.data.product;
          setProduct(productData);
          setMainImage(productData.thumbnail); // Set the initial main image
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId, token]);

  const handleMouseOver = (image) => {
    const currentMainImage = mainImage;
    setMainImage(image);
    setProduct((prevState) => ({
      ...prevState,
      images: prevState.images.map((img) => (img === image ? currentMainImage : img)),
    }));
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-page">
      <div className="product-container">
        {/* Right Section: Product Details */}
        <div className="details-section">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-quantity">Available Quantity: {product.quantity}</p>

          <div className="button-group">
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="buy-now-button">Buy Now</button>
          </div>
        </div>

        {/* Left Section: Images */}
        <div className="image-section">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-section">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="thumbnail"
                onMouseOver={() => handleMouseOver(image)} // Swap main and thumbnail images on hover
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
