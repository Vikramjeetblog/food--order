import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Order() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/myOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      const data = await response.json();
      console.log(data);
      setOrderData(data.items);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />

      <div className="container">
        <div className="row">
          {orderData?.length === 0 && <p>You have no orders yet.</p>}

          {orderData?.slice(0).reverse().map((item, index) => {
            return (
              <div
                className="col-12 col-md-6 col-lg-3"
                key={`${item.product}-${index}`}
              >
                <div
                  className="card mt-3"
                  style={{ width: "16rem", maxHeight: "360px" }}
                >
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "120px", objectFit: "fill" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.product}</h5>
                    <div
                      className="container w-100 p-0"
                      style={{ height: "38px" }}
                    >
                      <span className="m-1">Qty: {item.quantity}</span>
                      <span className="m-1">Size: {item.size}</span>
                      <div className=" d-inline ms-2 h-100 w-20 fs-5">
                        ₹{item.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
