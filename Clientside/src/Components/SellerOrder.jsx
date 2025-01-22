import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerOrder.scss";

const SellerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3002/api/getSellerOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleConfirm = async (productId) => {
    
    try {
      const res = await axios.put(
        `http://localhost:3002/api/confirmOrder/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setOrders(orders.map(order => 
          order.productID === productId ? { ...order, confirm: true } : order
        ));
      }
    } catch (error) {
      setError("Failed to confirm order");
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="seller-order-container">
      <h2>Seller Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found</div>
      ) : (
        <div className="order-grid">
          {orders.map((order,index) => (
            <div key={index} className="order-card">
              <p><strong>Buyer Name:</strong> {order.buyername}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Product Name:</strong> {order.productname}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p>
                <strong>Status:</strong>
                {order.confirm ? (
                  <span className="confirmed">Confirmed</span>
                ) : (
                  <button className="confirm-button" onClick={() => handleConfirm(order.productID)}>Confirm</button>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrder;
