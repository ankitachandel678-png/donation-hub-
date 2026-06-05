import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-box">
                    <h1>Welcome Back 👋</h1>
                    <p className="auth-subtitle">Login to continue your donation journey</p>
                    {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.8rem', borderRadius: '12px', marginBottom: '1rem' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg> Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                        </div>
                        <div className="input-group">
                            <label><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg> Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <label><input type="checkbox" /> Remember Me</label>
                            <a href="#" style={{ color: '#f97316' }}>Forgot Password?</a>
                        </div>
                        <button type="submit" className="auth-btn">Login →</button>
                    </form>
                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
                    </div>
                </div>
            </div>
            <div className="auth-sidebar">
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '4rem' }}>"</div>
                    <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>Thanks to Digital Donation Hub, I've helped 5 schools get computers. The transparency is amazing!</p>
                    <strong>— Priya Sharma</strong><br />
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Regular Donor</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', color: '#f97316' }}>₹2.5+ Cr</h3>
                    <p>Total Donations</p>
                    <h3 style={{ fontSize: '2rem', color: '#f97316', marginTop: '1rem' }}>15,000+</h3>
                    <p>Students Helped</p>
                </div>
            </div>
        </div>
    );
};

export default Login;