import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '' 
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            console.log('Response:', data);
            
            if (data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="page-hero-light">
                <div className="page-hero-content">
                    <span className="hero-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg> Get in Touch
                    </span>
                    <h1>Contact <span className="highlight">Us</span></h1>
                    <p>We'd love to hear from you! Whether you have a question, want to partner with us, or refer a school.</p>
                </div>
            </section>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                    {/* Contact Info Cards */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            {/* Office Address */}
                            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f97316" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                                </div>
                                <h3>Our Office</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Digital Donation Hub<br />Plot 45, Sector 18<br />Noida, UP - 201301</p>
                            </div>
                            
                            {/* Phone */}
                            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f97316" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                </div>
                                <h3>Phone</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>+91-98765-43210<br />+91-87654-32109</p>
                            </div>
                            
                            {/* Email */}
                            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f97316" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                    </svg>
                                </div>
                                <h3>Email</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>support@digitaldonationhub.org<br />partnerships@ddh.org</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ flex: 1.5, background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <h2>Send us a Message</h2>
                        
                        {error && (
                            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.8rem', borderRadius: '12px', marginBottom: '1rem', textAlign: 'center' }}>
                                ❌ {error}
                            </div>
                        )}
                        
                        {submitted && (
                            <div style={{ background: '#dcfce7', color: '#166534', padding: '0.8rem', borderRadius: '12px', marginBottom: '1rem', textAlign: 'center' }}>
                                ✅ Thank you! We'll get back to you within 24 hours.
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name *</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                        style={{ width: '100%', padding: '0.8rem', border: '2px solid #e2e8f0', borderRadius: '12px' }} 
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email *</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                        style={{ width: '100%', padding: '0.8rem', border: '2px solid #e2e8f0', borderRadius: '12px' }} 
                                    />
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Phone (Optional)</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        style={{ width: '100%', padding: '0.8rem', border: '2px solid #e2e8f0', borderRadius: '12px' }} 
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Subject *</label>
                                    <select 
                                        name="subject" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        required 
                                        style={{ width: '100%', padding: '0.8rem', border: '2px solid #e2e8f0', borderRadius: '12px' }}
                                    >
                                        <option value="">Select Subject</option>
                                        <option>I want to donate</option>
                                        <option>I want to refer a school</option>
                                        <option>Partnership inquiry</option>
                                        <option>Volunteer with us</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Message *</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    rows="5" 
                                    required 
                                    style={{ width: '100%', padding: '0.8rem', border: '2px solid #e2e8f0', borderRadius: '12px' }}
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="btn-primary" 
                                style={{ width: '100%', background: '#f97316', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' }}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message →'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ Section */}
                <div style={{ marginTop: '4rem' }}>
                    <div className="section-header">
                        <h2>Frequently Asked <span className="highlight">Questions</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <h3>📌 How can I donate?</h3>
                            <p style={{ color: '#64748b' }}>Go to Schools page, choose a school, click on any wishlist item, and donate securely.</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <h3>📌 Will I get tax receipt?</h3>
                            <p style={{ color: '#64748b' }}>Yes! All donations above ₹500 receive 80G tax exemption certificate.</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <h3>📌 How to refer a school?</h3>
                            <p style={{ color: '#64748b' }}>Fill the contact form with subject "I want to refer a school".</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <h3>📌 Can companies partner?</h3>
                            <p style={{ color: '#64748b' }}>Absolutely! Email partnerships@digitaldonationhub.org for CSR collaborations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;