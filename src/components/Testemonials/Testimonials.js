import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

const reviews = [
  {
    id: 1,
    name: "Emily Stone",
    comment:
      "A breathtaking journey through history! The audio guide made everything come alive.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Mohamed Salah",
    comment:
      "The museum is so well-organized. Loved the interactive tech—made learning really fun!",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: 3,
    name: "Julia Roberts",
    comment:
      "This was my first visit to Egypt and the museum set the tone—absolutely magical.",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 4,
    name: "Ahmed Zaki",
    comment:
      "Very informative and well-maintained. The QR codes worked perfectly on every artifact.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 5,
    name: "Sophia Kim",
    comment:
      "As a history lover, I was amazed by the depth of information provided. Beautiful experience!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];


const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false,
  };

  return (
    <div className="testimonials">
      <h2 style={{fontWeight:"bold",textAlign:"center"}}>What Visitors Say !</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={review.image} alt={review.name} />
            <h4 className="head" style={{position:"relative",top:"-67px"}}>{review.name}</h4>
            <p className="comment">"{review.comment}"</p>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
