import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Contexts/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getCartTotal } = useContext(StoreContext);

  // ✅ scroll to Menu
  const handleScrollToMenu = () => {
    setMenu("menu");
    const section = document.getElementById("menu");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ scroll to AppDownload
  const handleScrollToAppDownload = () => {
    setMenu("mobile-app");
    const section = document.getElementById("app-download");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className='logo' /></Link>

      <ul className='navbar-menu'>
        <Link to='/'><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li></Link>

        {/* Scroll to Menu */}
        <li 
          onClick={handleScrollToMenu} 
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>

        {/* Scroll to Mobile App */}
        <li 
          onClick={handleScrollToAppDownload} 
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </li>

        <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt='search' />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt='basket' /></Link>
          {getCartTotal() > 0 && <div className="dot"></div>}
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
