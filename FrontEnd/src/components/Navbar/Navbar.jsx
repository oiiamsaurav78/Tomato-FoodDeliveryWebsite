import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Contexts/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getCartTotal,token,setToken } = useContext(StoreContext);
  
  const navigate=useNavigate(); //after logout go to home page
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

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
        {
          !token? <button onClick={() => setShowLogin(true)}>Sign in</button>:<div className='navbar-profile'>
            <img src={assets.profile_icon} alt=''></img>
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon}>
                </img><p>Orders</p>
              </li>
              <hr/>
              <li onClick={logout}>
                <img src={assets.logout_icon}></img>
                <p>Logout</p>

              </li>
            </ul>

          </div>
        }

       
      </div>
    </div>
  );
};

export default Navbar;
