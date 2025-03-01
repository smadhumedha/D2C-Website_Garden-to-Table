import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ cartCount })=> {
  const location = useLocation();

  // Check if we are on the Cart or Checkout pages
  const isCartOrCheckoutPage = location.pathname === "/cart" || location.pathname === "/checkout";


  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Doodle.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="title">GARDEN TO TABLE</h1>

      <div className="auth-container">
        {!isCartOrCheckoutPage && (
          <>
            {location.pathname === "/signup" ? (
              <>
                <Link to="/">
                  <button className="home-button">Home</button>
                </Link>
                <Link to="/login">
                  <button className="login-button">Login</button>
                </Link>
              </>
            ) : location.pathname === "/login" ? (
              <>
                <Link to="/">
                  <button className="home-button">Home</button>
                </Link>
                <Link to="/signup">
                  <button className="signup-button">Sign Up</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="signup-button">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button className="login-button">Login</button>
                </Link>
              </>
            )}
          </>
        )}

        {/* Cart Button - Only show on non-Cart/Checkout pages */}
        {!isCartOrCheckoutPage && (
          <Link to="/cart">
            <button className="cart-button">
              🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
