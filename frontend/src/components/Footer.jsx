import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '3rem 5% 1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
                
                {/* Logo Section */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.3rem' }}>📚 Digital Donation Hub</h3>
                    <p style={{ lineHeight: '1.6' }}>Making education accessible for every child in India.</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                        </a>
                        <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0z"/>
                            </svg>
                        </a>
                        <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
                            </svg>
                        </a>
                        <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.277.02-.554.102-.751.223-.554.73-1.127 1.581-1.127 1.115 0 1.56.85 1.56 2.095v3.802h2.401V9.234c0-2.216-1.184-3.246-2.764-3.246-1.274 0-1.845.7-2.165 1.193v.02h.016q.006-.01.016-.02V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                {/* Quick Links */}
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Links</h3>
                    <Link to="/about" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>About Us</Link>
                    <Link to="/schools" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Schools</Link>
                    <Link to="/campaigns" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Campaigns</Link>
                    <Link to="/stories" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Success Stories</Link>
                    <Link to="/contact" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Contact</Link>
                </div>
                
                {/* Support */}
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Support</h3>
                    <Link to="#" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>FAQ</Link>
                    <Link to="#" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Privacy Policy</Link>
                    <Link to="#" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Terms & Conditions</Link>
                    <Link to="#" style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>Refund Policy</Link>
                </div>
                
                {/* Contact Section with Icons */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Contact Us</h3>
                    
                    {/* Phone */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f97316" viewBox="0 0 16 16">
                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                        </svg>
                        <span>+91-9876543210</span>
                    </div>
                    
                    
                    
                    
                    {/* Support Email */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f97316" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                        </svg>
                        <a href="mailto:support@digitaldonationhub.org" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#f97316'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>support@digitaldonationhub.org</a>
                    </div>
                    
                    {/* Location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f97316" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                        <span>New Delhi, India</span>
                    </div>
                    
                    {/* Working Hours */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f97316" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>
                        <span>Mon - Fri: 10 AM - 6 PM</span>
                    </div>
                </div>
            </div>
            
            {/* Copyright */}
            <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid #334155' }}>
                <p>©️ 2026 Digital Donation Hub | Designed with ❤️ for Education</p>
            </div>
        </footer>
    );
};

export default Footer;