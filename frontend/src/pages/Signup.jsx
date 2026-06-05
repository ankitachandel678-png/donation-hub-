import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Donor');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register } = useAuth();  // ← Use 'register' not 'signup'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters!');
            return;
        }
        
        const result = await register({ name, email, password, role });
        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-box">
                    <h1>Create Account ✨</h1>
                    <p className="auth-subtitle">Join thousands of donors changing lives</p>
                    {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.8rem', borderRadius: '12px', marginBottom: '1rem' }}>{error}</div>}
                    {success && <div style={{ background: '#dcfce7', color: '#166534', padding: '0.8rem', borderRadius: '12px', marginBottom: '1rem' }}>{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
</svg> Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />
                        </div>
                        <div className="input-group">
                            <label><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg> Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                        </div>
                        <div className="input-group">
                            <label><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg> Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" required />
                        </div>
                        <div className="input-group">
                            <label><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg> Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
                        </div>
                        <div className="input-group">
                            <label>👔 I am a</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="Donor">💝 Donor - I want to donate</option>
                                <option value="School Admin">🏫 School Admin - My school needs support</option>
                                <option value="Volunteer">🤝 Volunteer - I want to help</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label><input type="checkbox" required /> I agree to the <a href="#">Terms & Conditions</a></label>
                        </div>
                        <button type="submit" className="auth-btn">Create Account →</button>
                    </form>
                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
            <div className="auth-sidebar">
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Why join us? 🎯</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ padding: '0.5rem 0' }}>✅ 100% Transparent Donations</li>
                        <li style={{ padding: '0.5rem 0' }}>🧾 Instant 80G Tax Receipts</li>
                        <li style={{ padding: '0.5rem 0' }}>📸 Photo/Video Proof of Impact</li>
                        <li style={{ padding: '0.5rem 0' }}>🔄 Recurring Donation Options</li>
                        <li style={{ padding: '0.5rem 0' }}>📊 Real-time Donation Tracking</li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(249,115,22,0.2)', padding: '1rem', borderRadius: '16px' }}>
                    <p style={{ fontStyle: 'italic' }}>"The most trusted donation platform I've ever used."</p>
                    <strong>- Verified Donor</strong>
                </div>
            </div>
        </div>
    );
};

export default Signup;