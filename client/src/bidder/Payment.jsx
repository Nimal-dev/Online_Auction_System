import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './payment.css';

const Payment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/viewproductbyid', {
          id: location.state.id,
        });

        const result = response.data;
        setPaymentData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [location.state.id]);

  const handlePayNow = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/updatePaymentStatus/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: 'yes' }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const initPayment = async () => {
    if (!paymentData) {
      console.error('Payment data not available');
      return;
    }

    try {
      const orderResponse = await axios.post('http://localhost:4000/pay', { amount: paymentData.BidAmount });
      const { order } = orderResponse.data;

      const options = {
        key: 'rzp_test_hIaSK6cefLTfML', // Replace with your Razorpay API key
        amount: order.amount,
        currency: order.currency,
        name: paymentData.ProductName,
        description: paymentData.Description,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post('http://localhost:4000/verify', response);
            if (verifyResponse.data.message === "Payment verified successfully") {
              handlePayNow(paymentData._id); // Update payment status after successful payment
            }
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  const handleProceedToPay = () => {
    if (!paymentData) {
      console.error('Payment data not available');
      return;
    }
    initPayment();
  };

  return (
    <div>
      {!paymentData && <p>Loading...</p>}
      {paymentData && (
        <div className="App">
          <div className="container">
            <h2>Order Details</h2>
            <p><strong>Product Name:</strong> {paymentData.ProductName}</p>
            <p><strong>Category:</strong> {paymentData.Category}</p>
            <p><strong>Description:</strong> {paymentData.Description}</p>
            <p><strong>Minimum Bid Amount:</strong> &#x20B9; {paymentData.Minamount}</p>
            <p><strong>Winning Bid Amount:</strong> &#x20B9; {paymentData.BidAmount}</p>
            <p><strong>Auction Date:</strong> {paymentData.AuctionDate}</p>
            <p><strong>Start Time:</strong> {paymentData.StartTime}</p>
            <p><strong>End Time:</strong> {paymentData.EndTime}</p>
            <p><strong>Winner Name:</strong> {paymentData.BidderName}</p>
            {paymentData.paymentStatus === 'yes' ? (
              <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green', fontSize: '20px' }}><b>Paid</b></p>
            ) : (
              <button onClick={handleProceedToPay} className="buy_btn">
                Proceed to Pay
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
