import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrder.scss";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3002/api/getBuyerOrder`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="centerText">Loading orders...</div>;
  }

  if (error) {
    return <div className="centerText errorText">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="heading">My Orders</h1>
      {orders.length === 0 ? (
        <div className="centerText">No orders found.</div>
      ) : (
        <div className="orderList">
          {orders.map((order, index) => (
            <div key={index} className="orderCard">
              <img src={order.thumbnail} alt={order.name} className="orderThumbnail" />
              <h2 className="productName">{order.name}</h2>
              <p>Quantity: {order.quantity || "N/A"}</p>
              <p>Price: ${isNaN(order.price) ? "N/A" : Number(order.price).toFixed(2)}</p>
              <p>
                Total Price: $
                {isNaN(order.price) || isNaN(order.quantity)
                  ? "N/A"
                  : (Number(order.price) * order.quantity).toFixed(2)}
              </p>
              <p className={`status ${order.confirm ? "confirmed" : "pending"}`}>
              Status: {order.confirm ? "Confirmed" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
