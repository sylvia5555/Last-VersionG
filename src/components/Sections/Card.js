import React from 'react';
import { Link } from 'react-router-dom';
import "./Sections.css";

export default function Card({ item: { id, image, title } }) {
  return (
    <div className='items'>
      <div className='img'>
        <img src={image} alt={title} />
        <Link to={`/sections/${id}`} className='blog-item-link'> {/* 🔹 تصحيح الرابط */}
          <i className="fas fa-external-link-alt"></i> {/* 🔹 استبدال class بـ className */}
        </Link>
      </div>
      <div className='title'>
        <h3>{title}</h3>
      </div>
    </div>
  );
}
