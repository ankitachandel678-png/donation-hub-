import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>📚 Digital Donation Hub</h1>
                    <p className="tagline">Empowering Education Through Generosity</p>
                </Link>
            </div>
            <div className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
            <nav className={menuOpen ? 'show' : ''}>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                <NavLink to="/schools" onClick={() => setMenuOpen(false)}>Schools</NavLink>
                <NavLink to="/campaigns" onClick={() => setMenuOpen(false)}>Campaigns</NavLink>
                <NavLink to="/stories" onClick={() => setMenuOpen(false)}>Success Stories</NavLink>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                {user ? (
                    <>
                        <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                        <button onClick={handleLogout} className="login-btn" style={{ background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</NavLink>
                        <NavLink to="/signup" className="signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;