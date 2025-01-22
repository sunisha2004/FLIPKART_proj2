import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [bill, setBill] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/getCart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setCartItems(res.data.cartItems);
        }
      } catch (err) {
        setError("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [token]);

  useEffect(() => {
    const calculateBill = () => {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setBill(total);
    };
    calculateBill();
  }, [cartItems]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/getUserAddresses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setAddresses(res.data.data);
        }
      } catch (err) {
        setError("Failed to load addresses. Please try again.");
      }
    };
    fetchAddresses();
  }, [token]);

  const incrementQuantity = async (productId) => {
    try {
      const res = await axios.put(`http://localhost:3002/api/incrementCartQuantity/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productID === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      }
    } catch (err) {
      setError("Unable to increment quantity. Please try again.");
    }
  };
  

  const decrementQuantity = async (productId) => {
    try {
      const res = await axios.put(`http://localhost:3002/api/decrementCartQuantity/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productID === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error decrementing quantity:", err);
    }
  };

  const deleteItem = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:3002/api/deleteCartItem/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setCartItems(cartItems.filter((item) => item.productID !== productId));
      }
    } catch (err) {
      setError("Failed to delete the item. Please try again.");
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address to place the order.");
      return;
    }
    setIsProcessing(true);
    try {
      const fullAddress = `${selectedAddress.city}, ${selectedAddress.district}, ${selectedAddress.pincode}, ${selectedAddress.country}`;
      const orderData = { cartItems, address: fullAddress };
      const res = await axios.post("http://localhost:3002/api/placeOrder", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        alert("Order placed successfully!");
        setCartItems([]);
        setSelectedAddress(null);
      }
    } catch (err) {
      setError("Failed to place the order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  

  if (loading) {
    return <div className="cart-content">Loading your cart...</div>;
  }

  if (error) {
    return <div className="cart-content error">{error}</div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-items-section">
        <h2>My Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productID} className="cart-item">
              <img src={item.thumbnail} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.productID)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.productID)}>+</button>
                </div>
                <button onClick={() => deleteItem(item.productID)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="cart-summary-section">
        <h2>Price Details</h2>
        <div className="bill-details">
          <p>Total Amount</p>
          <p>₹{bill}</p>
        </div>
        <div className="address-section">
          <h3>Delivery Address</h3>
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div key={index} className="address-option">
                <input
                  type="radio"
                  name="address"
                  value={index}
                  onChange={() => setSelectedAddress(address)}
                />
                <label>
                  {`${address.city}, ${address.district}, ${address.pincode}`}
                </label>
              </div>
            ))
          ) : (
            <p>No addresses available</p>
          )}
        </div>
        <button
  onClick={handlePlaceOrder}
  className="place-order-button"
  disabled={isProcessing || cartItems.length === 0}
>
  {isProcessing ? "Processing..." : "Place Order"}
</button>

      </div>
    </div>
  );
};

export default Cart;
