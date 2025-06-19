import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TicketsData from "./Ticketsdata";
import "./Ticketdetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ticket = TicketsData.find((ticket) => ticket.id === parseInt(id));

  /// API stuff ///
  // Map ticket title to MuseumId
  const getMuseumId = (title) => {
    if (title === "Gem Children's Museum") return 1;
    if (title === "Gem Main Galliries") return 2;
    return null; // Fallback, though ticket should always be found
  };

  // Map selected ticket type to TicketTypeId
  const getTicketTypeId = (option) => {
    if (option === "Egyptians") return 1;
    if (option === "foreign") return 2;
    return null; // Fallback for invalid selection
  };

  // booking ticket 
  const bookTicket = async () => {
    setIsLoading(true);
    setApiError("");
    setBookingSuccess(false);

    const museumId = getMuseumId(ticket.title);
    const ticketTypeId = getTicketTypeId(selectedOption);
    const quantity = value;

    // Validate mapped values
    if (!museumId || !ticketTypeId || !quantity) {
      setApiError("Invalid ticket selection or quantity.");
      setIsLoading(false);
      return;
    }

    const payload = {
      MuseumId: museumId,
      TicketTypeId: ticketTypeId,
      Quantity: quantity,
    };

    try {
      const response = await axios.post(
        "http://nightatthemuseum.runasp.net/api/ticket/book",
        payload
      );
      setBookingSuccess(true);
      // Optionally, navigate to a confirmation page with response data
      navigate("/TicketPayment", {
        state: {
          source: "ticket",
          item: {
            title: selectedOption,
            quantity: value,
            price: parseInt(
              ticket.prices[selectedOption]?.replace(/[^\d.]/g, "") || "0"
            ),
            bookingData: response.data, // Pass API response if needed
          },
        },
      });
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to book ticket. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //////// API end ///////

  // ticket count
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Ensure only numbers are entered
    if (/^-?\d*$/.test(newValue) || newValue === "") {
      setValue(newValue === "" ? "" : parseInt(newValue, 10));
    }
  };

  // Date picker state
  const [selectedDate, setSelectedDate] = useState(null);

  // add_to_calendar // Function to format date as `YYYYMMDDTHHmmSSZ`
  const formatDateForCalendar = (date) => {
    if (!date) return "";
    return date.toISOString().replace(/-|:|\.\d+/g, ""); // Format as YYYYMMDDTHHmmSSZ
  };

  // Function to open calendar with the selected date
  const handleCalendarSelect = (event) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    const formattedDate = formatDateForCalendar(selectedDate);
    const eventTitle = encodeURIComponent(ticket.title || "Event");
    const startTime = formattedDate;
    const endTime = formattedDate; // Modify this if you need a duration

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

  // radio btn
  const [selectedOption, setSelectedOption] = useState("");

  const handleChangeofRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  // Check if the ticket details are complete
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // API error handling 
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  // Function to check if all fields are filled
  const isFormComplete = selectedDate && value > 0 && selectedOption;

  // Handle Buy Now click
  const handleBuyNow = (e) => {
    e.preventDefault(); // Prevent default navigation until API call succeeds
    if (!isFormComplete) {
      setErrorMessage(
        "⚠️ Please select a date, ticket type, and at least one ticket before buying."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      setErrorMessage(""); // Clear error when valid
      bookTicket(); // Call API instead of navigating directly
    }
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

                  {/* Date Picker */}
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    className="p-2 border rounded-md text-lg"
                  />
                </div>

                <i class="fa-solid fa-angles-right"></i>

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
                    {/* <h3>Select Your Ticket Type:</h3> */}
                    {Object.keys(ticket.prices).map((key) => (
                      <>
                        <input
                          type="radio"
                          id={key}
                          name="ticketType"
                          value={key}
                          checked={selectedOption === key}
                          onChange={handleChangeofRadio}
                        />
                        <label htmlFor={key}>{key}</label>
                      </>
                    ))}

                    {/* <p>Selected: {selectedOption || "None"}</p> */}
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
                    {/* Success or error feedback */}
                    {bookingSuccess && (
                      <p className="success-message">✅ Ticket booked successfully!</p>
                    )}
                    {apiError && <p className="error-message">⚠️ {apiError}</p>}
                    {/* Existing form error message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="details-sections">
              <div className="ticket-section">
                <div className="bg-wood">
                  <i class="fa-solid fa-info"></i>
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
                  <i class="fa-solid fa-magnifying-glass"></i>
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
                  <i class="fa-solid fa-money-check-dollar"></i>
                </div>
                <h3>Prices</h3>
                {Object.keys(ticket.prices).map((key) => (
                  <li key={key}>
                    <strong>{key}:</strong> {ticket.prices[key]}
                  </li>
                ))}
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </>
      ) : (
        <p>The ticket does not exist</p>
      )}
    </div>
  );
};

export default TicketDetails;