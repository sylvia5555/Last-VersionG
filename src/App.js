import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // ✅ استيراد useLocation بشكل صحيح


import './App.css';
import audioFile from "./Assets/MUsic.mp3";
import bgImage from "./Assets/gallery/BG.png";
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Events from './components/Events/Events';
import EventDetail from './components/Events/EventDetail';
import About from './components/About/About';
import Login from './components/Register/Login';
import Sections from "./components/Sections/Sections";
import SectionDetails from "./components/Sections/SectionDetails";
import Contact from "./components/contacts/Contact"
import Profile from "./components/profile/Profile"

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Register from './components/Register/register';
import ForgetPassword from './components/Forget Password/ForgetPassword';
import ResetPassword from './components/Forget Password/ResetPassword';

///////
import Ticket from "./components/Ticket/Ticket"
import TicketDetails from "./components/Ticket/Ticketdetails";
import Shop from "./components/Shop/Shop";
import CategoriesPage from "./components/Shop/CategoriesPage";
import FilteredItemsPage from "./components/Shop/FilteredItemsPage";
import PaymentDetails from "./components/Payment/PaymentDetails";
import Payment from "./components/Payment/Payment";
import Header from './components/Header/Header';
import ItemDetailsPage from './components/Sections/ItemDetailsPage';
import ShopDetails from "./components/Shop/ShopDetails"; 
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';

function App() {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audio = new Audio(audioFile);

  // const playSound = () => {
  //   audio.play().catch((error) => {
  //     console.error("خطأ في تشغيل الصوت:", error);
  //   });
  //   setIsPlaying(true);
  // };

  // useEffect(() => {
  //   // إضافة مستمع لحدث النقر (click) في الصفحة
  //   const handleClick = () => {
  //     if (!isPlaying) {
  //       playSound();  // تشغيل الصوت بعد النقر
  //     }
  //   };

  //   // إضافة مستمع لحدث النقر في الجسم
  //   document.body.addEventListener('click', handleClick);

  //   // تنظيف الحدث عند مغادرة المكون
  //   return () => {
  //     document.body.removeEventListener('click', handleClick);
  //   };
  // }, [isPlaying]);

  const location = useLocation();

useEffect(() => {
  if (location.pathname === "/login") {
    document.body.style.backgroundImage = `url(${bgImage})`;
  } else if (location.pathname === "/register") {
    document.body.style.backgroundImage = `url(${bgImage})`;
  } else {
    document.body.style.backgroundImage = "none"; // باقي الصفحات بدون صورة
  }
}, [location.pathname]);

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/sections/:id" element={<SectionDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/Shop" element={<Shop />} />
        <Route path="/item/:id" element={<ShopDetails />} />
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:categoryName" element={<FilteredItemsPage />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/TicketPayment"
          element={
            <PaymentDetails hiddenFields={["city", "delivery", "street"]} />
          }
        />
        <Route
          path="/CartPayment"
          element={<PaymentDetails hiddenFields={["nationality"]} />}
        />
       <Route path="/Ticket" element={<Ticket />} />
       <Route path="/Ticket/:id" element={<TicketDetails />} />
      <Route path="/element/:id" element={<ItemDetailsPage />} />
      <Route path='/cart' element={<Cart />}></Route>
      </Routes>
       <Footer/>
          </>
  );
}

export default App;
