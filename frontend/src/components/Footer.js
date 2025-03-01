import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <a href="/about">About Us</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms & Conditions</a>
                <a href="/faq">FAQ's</a>
                <a href="/reviews">Reviews</a>
            </div>

            <div className="contact-info">
                <p>📧 Contact Us: <a href="mailto:yumaka@gmail.com">yumaka@gmail.com</a></p>
            </div>

            <div className="delivery-areas">
                <h4>Delivery Areas:</h4>
                <p>Bangalore, Delhi, Chennai, Pune, Mysore</p>
            </div>

            <div className="disclaimer">
                <h4>Disclaimer:</h4>
                <p>
                    While we strive to provide accurate product information, all details, including pricing and availability, 
                    are subject to change without notice. We cannot guarantee the exact color representation on your screen due to display variations. 
                    Please refer to the product description for complete details and contact customer service for any questions regarding your purchase.
                </p>
            </div>
        </footer>
    );
};

export default Footer;