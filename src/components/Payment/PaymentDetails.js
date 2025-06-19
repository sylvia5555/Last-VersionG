import React, { useState, useEffect, useContext } from "react";
import "./PaymentDetails.css";
import deliveryMethods from "./delivery.json";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function PaymentDetails({ hiddenFields = [] }) {
  const { cartItems } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Radio Button
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");

  const handleChangeofRadio = (event) => {
    setSelectedDeliveryMethod(event.target.value);
  };

  // Email
  const [email, setEmail] = useState("");

  // Phone Number
  const countryCodes = {
    Egypt: "+20",
    "United States": "+1",
    "United Kingdom": "+44",
    France: "+33",
    Germany: "+49",
    India: "+91",
    China: "+86",
    Canada: "+1",
    Australia: "+61",
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("+20");

  // Nationality
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const names = data.map(
          (country) => country.demonyms?.eng?.m || country.name.common
        );
        setNationalities(names.sort());
      })
      .catch((error) => console.error("Error fetching nationalities:", error));
  }, []);

  const handleSelectNationality = (nationality) => {
    setSelectedNationality(nationality);
    setShowDropdown(false);
    setSearchTerm("");
  };

  // City
  const egyptianCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Asyut",
    "Mansoura",
    "Tanta",
    "Fayoum",
    "Zagazig",
    "Ismailia",
    "Aswan",
    "Damanhur",
    "Minya",
    "Beni Suef",
    "Hurghada",
    "Qena",
    "Sohag",
  ];

  const [filteredCities, setFilteredCities] = useState(egyptianCities);
  const [selectedCity, setSelectedCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
    setCitySearch("");
  };

  const handleCitySearch = (e) => {
    const value = e.target.value.toLowerCase();
    setCitySearch(value);
    const filtered = egyptianCities.filter((city) =>
      city.toLowerCase().includes(value)
    );
    setFilteredCities(filtered);
    setShowCityDropdown(true);
  };

  return (
    <div className="divContainer">
      <h2>Billing Details</h2>
      <div className="Payment-container">
        <div className="billing-section">
          <form>
            <div className="form-group">
              <div className="name-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" required />
              </div>
              <div className="name-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <div className="phone-input">
                <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                  {Object.entries(countryCodes).map(([country, code]) => (
                    <option key={country} value={code}>
                      {country} ({code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            {!hiddenFields.includes("nationality") && (
              <div className="form-group">
                <label>Nationality</label>
                <div className="dropdown-container">
                  <input
                    type="text"
                    placeholder="Search or select nationality"
                    value={searchTerm || selectedNationality}
                    onClick={() => setShowDropdown(!showDropdown)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                  <div className={`dropdown-options ${showDropdown ? "show" : ""}`}>
                    {nationalities
                      .filter((nation) =>
                        nation.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((nation, index) => (
                        <div key={index} onClick={() => handleSelectNationality(nation)}>
                          {nation}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {!hiddenFields.includes("city") && (
              <div className="form-group">
                <label>Town / City *</label>
                <div className="dropdown-container">
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={citySearch || selectedCity}
                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                    onChange={handleCitySearch}
                    required
                  />
                  {showCityDropdown && (
                    <div className={`dropdown-options ${showCityDropdown ? "show" : ""}`}>
                      {filteredCities.map((city, index) => (
                        <div key={index} onClick={() => handleSelectCity(city)}>
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!hiddenFields.includes("street") && (
              <div className="form-group">
                <label>Street Address *</label>
                <input type="text" required placeholder="House number and street name" />
              </div>
            )}

            {!hiddenFields.includes("delivery") && (
              <div className="delivery-form">
                <h3>Select Your Delivery Method</h3>
                <div className="deliveryDetails">
                  {deliveryMethods.map((method) => (
                    <div className="deliveryOption" key={method.ShortName}>
                      <h4>{method.ShortName}</h4>
                      <p>
                        {method.Description} <br />
                        {method.DeliveryTime} <br />& Cost: {method.Cost}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="radio-group">
                  {deliveryMethods.map((method) => (
                    <label key={method.ShortName}>
                      <input
                        type="radio"
                        name="ticketType"
                        value={method.ShortName}
                        checked={selectedDeliveryMethod === method.ShortName}
                        onChange={handleChangeofRadio}
                        required
                      />
                      {method.ShortName}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <Link to={"/payment"}>
              <button type="submit" className="place-order-btn">
                Proceed to Payment
              </button>
            </Link>
          </form>
        </div>

        <div className="order-summary">
          <h3>Your Order</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.title} × {item.quantity}
                  </td>
                  <td>₺{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Subtotal</td>
                <td>₺{subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>₺{subtotal.toLocaleString()}</strong>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="payment-method">
            <h4>Direct Bank Transfer</h4>
            <p>
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
          </div>

          <Link to={"/payment"}>
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
