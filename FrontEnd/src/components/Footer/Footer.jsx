import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
          <p>
            Delicious food delivered to your doorstep. Fresh ingredients,
            quick service, and a taste you’ll never forget.
          </p>
          <div className="footer-social-icons">
            <a href="#"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="#"><img src={assets.twitter_icon} alt="Twitter" /></a>
            <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li><a href="tel:+911234567890">+91 12345 67890</a></li>
            <li><a href="mailto:contact@tomato.com">contact@tomato.com</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <hr />
        <p>© 2024 Tomato.com — All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
