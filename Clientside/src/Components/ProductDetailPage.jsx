
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import "./ProductDetailPage.scss";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  })

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

    const checkProductInCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/findOnCart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 201 && res.data.cart) {
          setIsInCart(true);
        }
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    const checkIfFavorite = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/checkWishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200 && res.data.isFavorite) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    fetchProductDetails();
    checkProductInCart();
    checkIfFavorite();
  }, [productId, token]);

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3002/api/addCart`,
        { productID: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        alert("Added to cart Successfully");
        setIsInCart(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const url = isFavorite ? `removeFromWishlist` : `addToWishlist`;

      const res = await axios.post(
        `http://localhost:3002/api/${url}/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleMouseOver = (image, index) => {
    const currentMainImage = mainImage;
    setMainImage(image);
    setProduct((prevState) => ({
      ...prevState,
      images: prevState.images.map((img, imgIndex) => (imgIndex === index ? currentMainImage : img)),
    }));
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-page">
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorite ? <AiFillHeart size={28} color="red" /> : <AiOutlineHeart size={28} color="#333" />}
      </div>

      <div className="product-container">
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
                onMouseOver={() => handleMouseOver(image, index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="details-section">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-quantity">Available Quantity: {product.quantity}</p>

          <div className="button-group">
            {isInCart ? (
              <button className="go-to-cart-button" onClick={() => navigate("/cart")}>
                Go to Cart
              </button>
            ) : (
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
            {/* <button className="buy-now-button">Buy Now</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
