import React, { useEffect } from 'react';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCircleInfo, faStar, faBars, faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/critter-corner-high-resolution-logo-black-transparent.png'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../Context';

const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isBrandVisible, setIsBrandVisible] = useState(false);
    const [isPteVisible, setIsPetVisible] = useState(false);
    const [isBrandClosing, setIsBrandClosing] = useState(false);
    const [isPetClosing, setIsPetClosing] = useState(false);
    const [email, setEmail] = useState();

    const {user} = useAuth();

    useEffect(() => {
        const sessionEmail = localStorage.getItem('email');
        if (sessionEmail) {
            setEmail(sessionEmail);
        }
    }, [])

    const handleClick = () => {
        if (isVisible) {
            setIsClosing(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false);
            }, 490);
        }
        else {
            setIsVisible(true);
        }
    }

    const handleClickBrand = () => {
        if (isBrandVisible) {
            setIsBrandClosing(true);
            setTimeout(() => {
                setIsBrandVisible(false);
                setIsBrandClosing(false);
            }, 490);
        }
        else {
            setIsBrandVisible(true);
        }
    }

    const handleClickPet = () => {
        if (isPteVisible) {
            setIsPetClosing(true);
            setTimeout(() => {
                setIsPetVisible(false);
                setIsPetClosing(false);
            }, 490);
        }
        else {
            setIsPetVisible(true);
        }
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="nav">
            {windowWidth < 1300 ?
                <div className="responsive-nav">
                    <div className="nav-responsive-container">
                        <div className="nav-responsive-contents">
                            <div className="nav-logo">
                                <a href="/">
                                    <img src={logo} alt="logo image" className='logo-image' />
                                </a>
                            </div>
                            <div className="nav-mobile-buttons">
                                <div className="nav-sidebar">
                                    <div className="nav-side-btn">
                                        <a href="javascript:void(0)" className="sidebar-btn" onClick={handleClick}> <FontAwesomeIcon icon={faBars} /></a>
                                    </div>
                                </div>
                                <div className="shopping-cart-responsive">
                                    <a href="#" className="shopping-cart-btn">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isVisible && (
                        <div className="menu-area">
                            <div className="menu">
                                <div className={`menu-container ${isClosing ? 'closing' : ''}`}>
                                    <div className="menu-buttons">
                                        <div className="about-btn">
                                            <a href="#" className="nav-button">
                                                About us
                                                <FontAwesomeIcon icon={faCircleInfo} className='btn-drop-icon' />
                                            </a>
                                        </div>
                                        <div className="menu-brand-dropdown">
                                            <a href="javascript:void(0)" className="nav-button" onClick={handleClickBrand}>
                                                Shop by brand
                                                <FontAwesomeIcon icon={faCaretDown} className='btn-drop-icon' />
                                            </a>
                                        </div>
                                        {isBrandVisible && (
                                            <div className="brand-menu-container">
                                                <div className={`brand-menu ${isBrandClosing ? 'closing' : ''}`}>
                                                    <p>Top brands</p>
                                                    <a href="#" className="drop-link">Brand 1</a>
                                                    <a href="#" className="drop-link">Brand 2</a>
                                                    <a href="#" className="drop-link">Brand 3</a>
                                                    <a href="#" className="drop-link">Brand 4</a>
                                                    <a href="#" className="drop-link">Brand 5</a>
                                                    <a href="#" className="drop-link">Brand 6</a>
                                                    <a href="#" className="drop-link">Brand 7</a>
                                                    <div className="b-menu">
                                                        <a href="#" className="nav-browse">Browse all brands</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="menu-pet-dropdown">
                                            <a href="javascript:void(0)" className="nav-button" onClick={handleClickPet}>
                                                Shop by pet
                                                <FontAwesomeIcon icon={faCaretDown} className='btn-drop-icon' />
                                            </a>
                                        </div>
                                        {isPteVisible && (
                                            <div className={`pet-menu ${isPetClosing ? 'closing' : ''}`}>
                                                <a href="#" className="drop-link">Dogs</a>
                                                <a href="#" className="drop-link">Cats</a>
                                                <a href="#" className="drop-link">Fish</a>
                                                <a href="#" className="drop-link">Small pets</a>
                                                <a href="#" className="drop-link">Birds</a>
                                                <a href="#" className="drop-link">Reptiles</a>
                                                <a href="#" className="drop-link">Farm animals</a>
                                            </div>
                                        )}
                                        <div className="featured-btn">
                                            <a href="#" className="nav-button">
                                                Featured
                                                <FontAwesomeIcon icon={faStar} className='btn-drop-icon' />
                                            </a>
                                        </div>
                                        <div className="search-area search-responsive">
                                            <input type="text" className="search-bar" placeholder='Search products' />
                                            <div className="search-button">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </div>
                                        </div>
                                        <div className="nav-account nav-account-responsive">
                                            {user ?
                                                <div className="user-area">
                                                    <a href="/account" className="nav-button">Account <FontAwesomeIcon icon={faUser} /></a>
                                                </div>
                                                :
                                                <div className="login-register-area">
                                                    <a href="/auth" className="nav-button">Log in</a>
                                                    <a href="#" className="nav-register-button">Get started</a>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                : <div className="nav-container">
                    <div className="nav-contents">
                        <div className="nav-logo">
                            <a href="/">
                                <img src={logo} alt="logo image" className='logo-image' />
                            </a>
                        </div>
                        <div className="nav-items">
                            <div className="about-btn">
                                <a href="#" className="nav-button">
                                    About us
                                    <FontAwesomeIcon icon={faCircleInfo} className='btn-drop-icon' />
                                </a>
                            </div>
                            <div className="brand-dropdown">
                                <a href="javascript:void(0)" className="nav-button">
                                    Shop by brand
                                    <FontAwesomeIcon icon={faCaretDown} className='btn-drop-icon' />
                                </a>
                                <div className="brand-drop-items">
                                    <div className="brand">
                                        <img src="https://seeklogo.com/images/W/Whiskas-logo-1465077BB3-seeklogo.com.png" alt="" className="brand-image" />
                                    </div>
                                    <div className="brand">
                                        <img src="https://seeklogo.com/images/W/Whiskas-logo-1465077BB3-seeklogo.com.png" alt="" className="brand-image" />
                                    </div>
                                    <div className="brand">
                                        <img src="https://seeklogo.com/images/W/Whiskas-logo-1465077BB3-seeklogo.com.png" alt="" className="brand-image" />
                                    </div>
                                    <div className="brand">
                                        <img src="https://seeklogo.com/images/W/Whiskas-logo-1465077BB3-seeklogo.com.png" alt="" className="brand-image" />
                                    </div>
                                    <div className="brand">
                                        <img src="https://seeklogo.com/images/W/Whiskas-logo-1465077BB3-seeklogo.com.png" alt="" className="brand-image" />
                                    </div>
                                    <div className="brand">
                                        <img src="https://seeklogo.com/images/W/Whiskas-logo-1465077BB3-seeklogo.com.png" alt="" className="brand-image" />
                                    </div>
                                </div>
                            </div>
                            <div className="pet-dropdown">
                                <a href="javascript:void(0)" className="nav-button">
                                    Shop by pet
                                    <FontAwesomeIcon icon={faCaretDown} className='btn-drop-icon' />
                                </a>
                                <div className="pet-drop-items">
                                    <a href="#" className="drop-link">Dogs</a>
                                    <a href="#" className="drop-link">Cats</a>
                                    <a href="#" className="drop-link">Fish</a>
                                    <a href="#" className="drop-link">Small pets</a>
                                    <a href="#" className="drop-link">Birds</a>
                                    <a href="#" className="drop-link">Reptiles</a>
                                    <a href="#" className="drop-link">Farm animals</a>
                                </div>
                            </div>
                            <div className="featured-btn">
                                <a href="#" className="nav-button">
                                    Featured
                                    <FontAwesomeIcon icon={faStar} className='btn-drop-icon' />
                                </a>
                            </div>
                        </div>
                        <div className="search-area">
                            <input type="text" className="search-bar" placeholder='Search products' />
                            <div className="search-button">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                        {user ?
                            <div className="nav-account">
                                <a href="/account" className="nav-register-button">Account <FontAwesomeIcon icon={faUser} /></a>
                            </div>
                            :
                            <div className="nav-account">
                                <a href="/auth" className="nav-button">Log in</a>
                                <a href="/register" className="nav-register-button">Get started</a>
                            </div>}
                        <div className="shopping-cart">
                            <a href="#" className="shopping-cart-btn">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </a>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Navbar