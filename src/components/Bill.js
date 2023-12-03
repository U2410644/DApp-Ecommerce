import React from 'react';

const Bill = ({ location }) => {
  // Access the total price from location state
  const { totalPrice } = location.state;

  return (
    <div className="container mt-4">
      <h2>Your Bill</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Total Amount: ₹{totalPrice.toLocaleString()}</h5>
          <button type="button" className="btn btn-primary">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
