import React from "react";
import { useParams } from "react-router-dom"; // لاستخراج المعرف من الرابط
import eventData from "./EventsData"; // استيراد بيانات الأحداث
import "./Eventdetails.css"; // ملف التنسيق
import eventv from "../Events/event.mp4"; // استيراد الفيديو
import Header from "../Header/Header";

const SingleEvent = () => {
  const { id } = useParams(); // استخراج ID الحدث من الرابط
  const eventItem = eventData.find((item) => item.id === parseInt(id));

  if (!eventItem) {
    return <p className="event-not-found">الحدث غير موجود.</p>;
  }

  return (
    <>
    <Header />
    <div className="single-event">
      {/* صورة الحدث مع العنوان فوقها */}
      <div className="single-event-image-container">
        <h2 className="single-event-title">{eventItem.title}</h2>
        <img src={eventItem.image} alt={eventItem.title} className="single-event-image" />
      </div>

      {/* وصف الحدث + الفيديو بجانب بعض */}
      <div className="single-event-content">
        <div className="single-event-description-container">
          <p className="single-event-description">{eventItem.desc}</p>
          <p className="single-event-description">{eventItem.sidepara}</p>
        </div>
        <div className="single-event-video-container">
          <video className="single-event-video" controls>
            <source src={eventv} type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>
      </div>
    </div>
    </>
  );
};

export default SingleEvent;
