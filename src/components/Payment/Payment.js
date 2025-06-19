import React from "react";
import "./Payment.css";

const Payment = () => {
  return (
    <div className="divContainer">
      <div className="payment">
        {/* <div className="payment-logo">
          <p>p</p>
        </div> */}

        <h2>Payment Gateway</h2>
        <div className="form">
          <div className=" space icon-relative">
            <label className="label">Card holder:</label>
            <input type="text" className="input" placeholder="Coding Market" />
            <i className="fas fa-user"></i>
          </div>
          <div className="space icon-relative">
            <label className="label">Card number:</label>
            <input
              type="text"
              className="input"
              data-mask="0000 0000 0000 0000"
              placeholder="Card Number"
            />
            <i className="far fa-credit-card"></i>
          </div>
          <div className="card-grp space">
            <div className="card-item icon-relative">
              <label className="label">Expiry date:</label>
              <input
                type="text"
                name="expiry-data"
                className="input"
                data-mask="00 / 00"
                placeholder="00 / 00"
              />
              <i className="far fa-calendar-alt"></i>
            </div>
            <div className="card-item icon-relative">
              <label className="label">CVC:</label>
              <input
                type="text"
                className="input"
                data-mask="000"
                placeholder="000"
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <button type="submit">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
