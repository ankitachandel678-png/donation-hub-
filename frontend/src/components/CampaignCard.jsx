import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://donation-hub-1ry9.onrender.com/api';

const CampaignCard = ({ campaign }) => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const percentage = (campaign.raised / campaign.target) * 100;

    const campaignImages = {
        "Library for 500 Children": "",
        "Clean Drinking Water": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOUjTFL_FYJWZcrdkrOKuRj6t_hvcUQEQ_g&s",
        "Computer Lab Project": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
        "Smart Class Initiative": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400"
    };

    const defaultImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400";
    const campaignImage = campaignImages[campaign.title] || defaultImage;

    const handleDonate = async () => {
        if (!user) {
            alert('Please login first to donate!');
            navigate('/login');
            return;
        }
        
        const amount = prompt('Enter donation amount (₹):', '500');
        if (!amount) return;
        
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/donations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    campaignId: campaign.id,
                    campaignTitle: campaign.title,
                    amount: parseInt(amount),
                    email: user.email,
                    name: user.name
                })
            });
            
            const data = await response.json();
            console.log('Donation response:', data);
            
            if (data.success) {
                alert(`✅ Thank you for your donation of ₹${amount} to "${campaign.title}"!\n\nReceipt ID: ${data.receiptId || 'N/A'}\n\nYou will receive a confirmation email shortly.`);
                // Optionally refresh page or update UI
                window.location.reload();
            } else {
                alert(`❌ Donation failed: ${data.message || 'Please try again'}`);
            }
        } catch (error) {
            console.error('Donation error:', error);
            alert('❌ Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer',
            position: 'relative'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }}>
            {campaign.featured && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#f97316',
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    zIndex: 1
                }}>
                    Featured
                </div>
            )}

            <div style={{ height: '180px', overflow: 'hidden' }}>
                <img 
                    src={campaignImage}
                    alt={campaign.title}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                    }}
                />
            </div>
            
            <div style={{ padding: '1.2rem' }}>
                <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
                    {campaign.title}
                </h3>
                <p style={{ color: '#64748b', margin: '0 0 0.8rem 0', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    {campaign.description}
                </p>
                
                <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ 
                            width: `${percentage}%`, 
                            background: '#f97316', 
                            height: '100%', 
                            borderRadius: '10px'
                        }}></div>
                    </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        ₹{campaign.raised.toLocaleString()} raised
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        ❤️ {campaign.donors} donors
                    </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        Target: ₹{campaign.target.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        ⏰ {campaign.daysLeft} days left
                    </span>
                </div>
                
                <button 
                    onClick={handleDonate} 
                    disabled={loading}
                    style={{ 
                        width: '100%',
                        background: loading ? '#fbd38d' : '#f97316', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.6rem', 
                        borderRadius: '40px', 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: '500',
                        fontSize: '0.85rem',
                        transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) e.target.style.background = '#ea580c';
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) e.target.style.background = '#f97316';
                    }}
                >
                    {loading ? 'Processing...' : 'Donate Now →'}
                </button>
            </div>
        </div>
    );
};

export default CampaignCard;    