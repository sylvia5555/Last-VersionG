import "./Contact.css"; // استدعاء ملف التنسيقات الخارجية
import img from "../../Assets/gallery/contact.png"
import Header from "../Header/Header";
export default function ContactUs() {
  return (
    <>
    <Header />
    <div className="contact-container">
            <div className="opening-hours">
        <h3>Opening Hours</h3>
        <p>📅 Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>📅 Saturday - Sunday: 10:00 AM - 4:00 PM</p>
      </div>
      <div className="contact-content">
        {/* 📷 الصورة */}
        <div className="image-container">
          <img
            src={img}
            alt="Museum"
            className="contact-image"
          />
        </div>

        {/* 📝 الفورم */}
        <div className="form-container">
          <h2>Contact Us</h2>
          <form>
            {/* First & Last Name */}
            <div className="name-inputs">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>

            {/* Email */}
            <input type="email" placeholder="Email Address" />

            {/* Message */}
            <textarea placeholder="Your message" rows="4"></textarea>

            {/* Send Button */}
            <button type="submit" className="cbtn">SEND MESSAGE</button>
          </form>
        </div>
      </div>

      {/* ⏰ مواعيد العمل */}

    </div>
    </>
  );
}
