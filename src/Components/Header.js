import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from './Cart';
import { BsCartDash } from 'react-icons/bs';
import { Badge } from 'react-bootstrap';
import { useCart } from './Reducer';
import '../App.css';

export default function Header() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/Login');
  };

  let data = useCart();

  const handleCartIconClick = () => {
    setCartView(true);
  };

  const handleCloseCartView = () => {
    setCartView(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
         Go-FOOD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMenuClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-white fs-5"
                aria-current="page"
                to="/"
                onClick={handleMenuClick}
              >
                Home
              </Link>
            </li>
            {localStorage.getItem('authToken') && (
              <li className="nav-item">
                <Link
                  className="nav-link text-white fs-5"
                  to="/MyOrders"
                  onClick={handleMenuClick}
                >
                  My orders
                </Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('authToken') ? (
            <div className="d-flex flex-column flex-lg-row align-items-lg-center">
              <Link
                className="btn bg-white text-success mx-1 mb-2 mb-lg-0"
                to="/Login"
              >
                Login
              </Link>
              <Link
                className="btn bg-white text-danger mx-1"
                to="/Signup"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <div
                className="cart-icon d-flex align-items-center"
                onClick={handleCartIconClick}
              >
                <BsCartDash className="cart-icon" />
                <Badge pill className="cart-badge">
                  {data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={handleCloseCartView}>
                  <Cart />
                </Modal>
              ) : null}
              <div
                className="btn bg-white text-danger mx-1"
                onClick={handleLogout}
                style={{ marginLeft: '20px' }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
