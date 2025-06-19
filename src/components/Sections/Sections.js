import React, { useState } from 'react';
import { Link } from "react-router-dom"; // ✅ ضيفي الاستيراد هنا فقط
import Dcard from './Card';
import Sdata from './sectionsData';
import { motion } from 'framer-motion'; 
import "./Sections.css";
import "../../App.css";
import Header from '../Header/Header';

export function Sections() {
    const [section, setsection] = useState(Sdata);

    return (
        <>
            <Header />
                <div className='parent'>
            <div className='gallery sec mtop'>
                <h2 style={{ marginTop: "50px", color: "white", fontFamily: "cursive", fontWeight: "bold",textAlign:"center" }} className='head'>
                    Museum Sections
                </h2>
                <div className='container grid'>
                    <div className='content'>
                        {section.map((item, index) => (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, y: 30 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.2 }}
                            >
                                <Link to={`/sections/${item.id}`} className="card-link">
                                    <Dcard item={item} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Sections;
