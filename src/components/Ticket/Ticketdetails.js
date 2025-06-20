import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TicketsData from "./Ticketsdata";
import "./Ticketdetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ticket = TicketsData.find((ticket) => ticket.id === parseInt(id));

  // State for form
  const [value, setValue] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Authentication logic
  const getAuthToken = () => {
    const storedUser = localStorage.getItem("user-info");
    if (!storedUser) {
      setApiError("Please log in to proceed.");
      navigate("/login");
      return null;
    }
    return JSON.parse(storedUser).token;
  };

  // Map ticket title to MuseumId
  const getMuseumId = (museumName) => {
    if (museumName === "Children Museum") return 1;
    if (museumName === "Main Museum") return 2;
    return null;
  };

  // Map selected ticket type to TicketTypeId
  const getTicketTypeId = (option) => {
    if (option === "Egyptian") return 1;
    if (option === "Foreigner") return 2;
    return null;
  };

  // Map selected ticket type to TicketPriceId
  const getTicketPriceId = (option) => {
    if (option === "Egyptian") return 1;
    if (option === "Foreigner") return 2;
    return null;
  };

  // Format date for visitTime (YYYY-MM-DD)
  const formatVisitTime = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Book ticket
  const bookTicket = async () => {
    setIsLoading(true);
    setApiError("");
    setBookingSuccess(false);

    const token = getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    const museumId = getMuseumId(ticket.museumName);
    const ticketTypeId = getTicketTypeId(selectedOption);
    const ticketPriceId = getTicketPriceId(selectedOption);
    const quantity = value;
    const visitTime = formatVisitTime(selectedDate);

    if (!museumId || !ticketTypeId || !ticketPriceId || !quantity || !visitTime) {
      setApiError("Invalid ticket selection, quantity, or visit date.");
      setIsLoading(false);
      return;
    }

    const payload = {
      museumId: museumId,
      ticketTypeId: ticketTypeId,
      quantity: quantity,
      ticketPriceId: ticketPriceId,
      visitTime: visitTime,
    };

    try {
      console.log("Ticket Booking Payload:", payload); // Log payload
      const response = await axios.post(
        "http://night-at-the-museum.runasp.net/api/Ticket",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Ticket Booking Response:", response.data); // Log response

      // Try multiple possible ticketId fields
      const ticketId = response.data.ticketId || response.data.id || response.data.TicketId;
      if (!ticketId) {
        throw new Error("Ticket ID not found in API response");
      }

      setBookingSuccess(true);

      // Create Payment Intent
      console.log("Creating Payment Intent for ticketId:", ticketId);
      const paymentIntentResponse = await axios.post(
        `http://night-at-the-museum.runasp.net/api/Ticket/${ticketId}/payment-intent`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment Intent Response:", paymentIntentResponse.data);

      const selectedPrice = ticket.prices.find(
        (price) => price.TypeName === selectedOption
      )?.Price || 0;

      navigate("/TicketPayment", {
        state: {
          source: "ticket",
          paymentData: {
            clientSecret: paymentIntentResponse.data.clientSecret, // Assuming clientSecret is returned
            ticketId: ticketId,
          },
          items: [
            {
              id: ticket.id,
              title: `${ticket.title} (${selectedOption})`,
              quantity: value,
              price: selectedPrice,
            },
          ],
          orderId: ticketId,
        },
      });
    } catch (error) {
      console.error("Ticket Booking Error:", error);
      setApiError(
        error.response?.data?.message ||
        error.message ||
        "Failed to book ticket or create payment intent."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle ticket count
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^-?\d*$/.test(newValue) || newValue === "") {
      setValue(newValue === "" ? "" : parseInt(newValue, 10));
    }
  };

  // Handle radio button
  const handleChangeofRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  // Check if form is complete
  const isFormComplete = selectedDate && value > 0 && selectedOption;

  // Handle Buy Now
  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!isFormComplete) {
      setErrorMessage(
        "⚠️ Please select a date, ticket type, and at least one ticket before buying."
      );
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      setErrorMessage("");
      bookTicket();
    }
  };

  // Calendar functions (unchanged)
  const formatDateForCalendar = (date) => {
    if (!date) return "";
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const handleCalendarSelect = (event) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
    const formattedDate = formatDateForCalendar(selectedDate);
    const eventTitle = encodeURIComponent(ticket.title || "Event");
    const startTime = formattedDate;
    const endTime = formattedDate;

    let url = "";
    switch (event.target.value) {
      case "google":
        url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}`;
        break;
      case "outlook":
        url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${eventTitle}&startdt=${startTime}`;
        break;
      case "office365":
        url = `https://outlook.office.com/calendar/action/compose?subject=${eventTitle}&startdt=${startTime}`;
        break;
      case "ical":
        url = `webcal://yourserver.com/event.ics?start=${startTime}&summary=${eventTitle}`;
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="ticket-detail">
      {ticket ? (
        <>
          <div className="general-heading">
            <p>Look at the details...</p>
            <h1>{ticket.title}</h1>
          </div>
          <div className="divContainer">
            <div className="ticket-details-content">
              <div className="calendar-stuff">
                <div className="calendar">
                  <h3>Pick a date:</h3>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    className="p-2 border rounded-md text-lg"
                  />
                </div>
                <i className="fa-solid fa-angles-right"></i>
                <div className="add_to_calendar">
                  <h3>Add to Calendar:</h3>
                  <div className="calender_box">
                    <svg
                      className="calendar-icon"
                      viewBox="0 0 23 17"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.128.896V16.13c0 .211.145.383.323.383h15.354c.179 0 .323-.172.323-.383V.896c0-.212-.144-.383-.323-.383H.451C.273.513.128.684.128.896Zm16 6.742h-.901V4.679H1.009v10.729h14.218v-3.336h.901V7.638ZM1.01 1.614h14.218v2.058H1.009V1.614Z"
                      ></path>
                      <path
                        d="M20.5 9.846H8.312M18.524 6.953l2.89 2.909-2.855 2.855"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <select onChange={handleCalendarSelect} defaultValue="">
                      <option value="" disabled>
                        Select a Calendar
                      </option>
                      <option value="google">Google Calendar</option>
                      <option value="ical">iCalendar</option>
                      <option value="outlook">Outlook Live</option>
                      <option value="office365">Outlook 365</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="ticket-image-container">
                <img
                  src={ticket.banner}
                  alt={ticket.title}
                  className="ticket-image"
                />
                <div className="imgbtncontainer">
                  <div className="radiobtncontainer">
                    {ticket.prices.map((price) => (
                      <React.Fragment key={price.TicketTypeId}>
                        <input
                          type="radio"
                          id={price.TypeName}
                          name="ticketType"
                          value={price.TypeName}
                          checked={selectedOption === price.TypeName}
                          onChange={handleChangeofRadio}
                        />
                        <label htmlFor={price.TypeName}>{price.TypeName}</label>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="btncontainer">
                    <div className="mt-4">
                      <a
                        onClick={() => setValue((prev) => (prev ? prev - 1 : 0))}
                        className="counter"
                      >
                        –
                      </a>
                      <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        className="ticket-input"
                      />
                      <a
                        onClick={() => setValue((prev) => (prev ? prev + 1 : 1))}
                        className="counter"
                      >
                        +
                      </a>
                    </div>
                    <button
                      className="ticket-button"
                      onClick={handleBuyNow}
                      disabled={isLoading}
                    >
                      {isLoading ? "Booking..." : "Buy Now"}
                    </button>
                    {bookingSuccess && (
                      <p className="success-message">✅ Ticket booked successfully!</p>
                    )}
                    {apiError && <p className="error-message">⚠️ {apiError}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="details-sections">
              <div className="ticket-section">
                <div className="bg-wood">
                  <i className="fa-solid fa-info"></i>
                </div>
                <h3>Information</h3>
                <ul>
                  {ticket.info.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ticket-section">
                <div className="bg-wood">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <h3>Description</h3>
                <ul>
                  {ticket.desc.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ticket-section">
                <div className="bg-wood">
                  <i className="fa-solid fa-money-check-dollar"></i>
                </div>
                <h3>Prices</h3>
                <ul>
                  {ticket.prices.map((price) => (
                    <li key={price.TicketTypeId}>
                      <strong>{price.TypeName}:</strong> EGP {price.Price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>The ticket does not exist</p>
      )}
    </div>
  );
};

export default TicketDetails;