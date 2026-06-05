import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { getStats, getFeaturedCampaigns, getFeaturedStories } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [stats, setStats] = useState([
        { number: "250+", label: "Schools Supported" },
        { number: "15,000+", label: "Students Impacted" },
        { number: "₹2.5Cr+", label: "Funds Raised" },
        { number: "98%", label: "Donor Satisfaction" }
    ]);
    const [campaigns, setCampaigns] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsData, campaignsData, storiesData] = await Promise.all([
                getStats(),
                getFeaturedCampaigns(),
                getFeaturedStories()
            ]);
            
            if (statsData.success) {
                const newStats = [
                    { number: statsData.stats.schoolsSupported, label: "Schools Supported" },
                    { number: statsData.stats.studentsImpacted, label: "Students Impacted" },
                    { number: statsData.stats.fundsRaised, label: "Funds Raised" },
                    { number: statsData.stats.donorSatisfaction, label: "Donor Satisfaction" }
                ];
                setStats(newStats);
            }
            
            if (campaignsData.success) {
                setCampaigns(campaignsData.campaigns);
            }
            
            if (storiesData.success) {
                setStories(storiesData.stories);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const featuresData = [
        { icon: "🔍", title: "100% Transparent", description: "Every rupee is tracked with photo/video proof.", color: "#3b82f6" },
        { icon: "🔒", title: "Secure Payments", description: "Payments fully encrypted and safe.", color: "#10b981" },
        { icon: "✅", title: "Verified Schools", description: "Every school is physically verified.", color: "#f59e0b" },
        { icon: "🧾", title: "Tax Benefits", description: "Instant 80G tax exemption receipt.", color: "#ef4444" },
        { icon: "📊", title: "Real-Time Dashboard", description: "Track your donations easily.", color: "#8b5cf6" },
        { icon: "🔄", title: "Recurring Donations", description: "Support monthly with as little as ₹200.", color: "#ec4899" }
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`✅ Thank you for subscribing! We'll send updates to ${email}`);
        setEmail('');
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section with Background Image - Attractive */}
            <section style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                minHeight: '85vh',
                width: '100%',
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Dark Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    zIndex: 1
                }}></div>
                
                <div style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    maxWidth: '900px', 
                    margin: '0 auto', 
                    padding: '2rem',
                    paddingTop: '4rem',
                    textAlign: 'center'
                }}>
                    <span style={{
                        display: 'inline-block',
                        background: '#f97316',
                        color: 'white',
                        padding: '0.6rem 1.8rem',
                        borderRadius: '40px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem'
                    }}>
                        ✨ Make a Difference Today
                    </span>
                    <h1 style={{ 
                        fontSize: '3.5rem', 
                        marginBottom: '1rem', 
                        lineHeight: '1.2',
                        fontWeight: 'bold'
                    }}>
                        Every Child <span style={{ color: '#f97316' }}>Deserves</span> Quality Education
                    </h1>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        marginBottom: '2rem', 
                        lineHeight: '1.6', 
                        opacity: 0.95,
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Your small donation can buy books, build classrooms, and brighten futures for thousands of underprivileged students across India.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/schools" style={{ 
                            background: '#f97316', 
                            color: 'white', 
                            padding: '0.8rem 2rem', 
                            borderRadius: '40px', 
                            textDecoration: 'none', 
                            fontWeight: 'bold',
                            transition: 'transform 0.3s, background 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.background = '#ea580c';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.background = '#f97316';
                        }}>
                            Start Donating →
                        </Link>
                        <Link to="/about" style={{ 
                            background: 'transparent', 
                            color: 'white', 
                            padding: '0.8rem 2rem', 
                            borderRadius: '40px', 
                            textDecoration: 'none', 
                            fontWeight: 'bold', 
                            border: '1px solid white',
                            transition: 'transform 0.3s, background 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.background = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.background = 'transparent';
                        }}>
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section with Animation */}
            <section style={{ padding: '3rem 5%', background: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            transition: 'transform 0.3s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h3 style={{ fontSize: '2rem', color: '#f97316', marginBottom: '0.5rem' }}>{stat.number}</h3>
                            <p style={{ color: '#64748b' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Attractive Features Section */}
            <section style={{
                padding: '6rem 5%',
                // background: 'linear-gradient(135deg,  #f0fdf4 0%, #dcfce7 100%)',
                // background: 'white',
                // boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
               background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
               color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Shapes */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    animation: 'float 20s infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    animation: 'float 15s infinite reverse'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            marginBottom: '1rem'
                        }}>
                            ✨ WHY CHOOSE US ✨
                        </span>
                        <h2 style={{
                            fontSize: '2.8rem',
                            color: 'white',
                            marginBottom: '1rem',
                            fontWeight: 'bold'
                        }}>
                            We Make Donation{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #fed7aa, #ffedd5)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Simple & Transparent
                            </span>
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.9)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Join thousands of donors who trust us for their contributions
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {featuresData.map((feature, index) => (
                            <div key={index} style={{
                                background: 'rgba(255,255,255,0.95)',
                                borderRadius: '24px',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                            }}>
                                {/* Shine Effect */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    transition: 'left 0.5s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.left = '200%'}
                                onMouseLeave={(e) => e.currentTarget.style.left = '-100%'}>
                                </div>

                                {/* Icon Circle */}
                                <div style={{
                                    width: '90px',
                                    height: '90px',
                                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem auto',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                    <span style={{ fontSize: '3rem' }}>{feature.icon}</span>
                                </div>

                                <h3 style={{
                                    fontSize: '1.5rem',
                                    color: '#1e293b',
                                    marginBottom: '1rem',
                                    fontWeight: '600'
                                }}>
                                    {feature.title}
                                </h3>

                                <p style={{
                                    color: '#64748b',
                                    lineHeight: '1.6',
                                    marginBottom: '1rem'
                                }}>
                                    {feature.description}
                                </p>

                                
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Campaigns - Attractive Design */}
            {campaigns.length > 0 && (
                <section style={{ padding: '5rem 5%', background: 'white' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span style={{
                                background: '#fed7aa',
                                color: '#ea580c',
                                padding: '0.3rem 1.5rem',
                                borderRadius: '40px',
                                fontSize: '0.8rem',
                                display: 'inline-block',
                                marginBottom: '1rem'
                            }}>
                                OUR CAMPAIGNS
                            </span>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                Featured <span style={{ color: '#f97316' }}>Campaigns</span>
                            </h2>
                            <p style={{ color: '#64748b' }}>Support these ongoing campaigns and make a difference</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                            {campaigns.slice(0, 3).map((campaign, idx) => (
                                <div key={campaign._id} style={{ 
                                    background: 'white', 
                                    borderRadius: '20px', 
                                    overflow: 'hidden', 
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 35px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                                }}>
                                    
                                    {/* URGENT BADGE */}
                                    {campaign.urgent && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: '#ef4444',
                                            color: 'white',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            zIndex: 10,
                                            animation: 'blink 1s infinite'
                                        }}>
                                            🔥 URGENT
                                        </div>
                                    )}
                                    
                                    {/* FEATURED BADGE */}
                                    {campaign.featured && !campaign.urgent && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: '#f97316',
                                            color: 'white',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            zIndex: 10
                                        }}>
                                            ⭐ FEATURED
                                        </div>
                                    )}
                                    
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <div style={{ fontSize: '2rem' }}>{campaign.icon}</div>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: 0, color: '#1e293b' }}>
                                                {campaign.title}
                                            </h3>
                                        </div>
                                        
                                        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                                            {campaign.description}
                                        </p>
                                        
                                        {/* Progress Section */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.3rem' }}>
                                                <span>Progress</span>
                                                <span style={{ color: campaign.urgent ? '#ef4444' : '#f97316', fontWeight: 'bold' }}>
                                                    {Math.round((campaign.raised / campaign.target) * 100)}%
                                                </span>
                                            </div>
                                            <div style={{ background: '#e2e8f0', borderRadius: '20px', height: '8px', overflow: 'hidden' }}>
                                                <div style={{ 
                                                    width: `${(campaign.raised / campaign.target) * 100}%`, 
                                                    background: campaign.urgent ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #f97316, #fed7aa)',
                                                    height: '8px',
                                                    borderRadius: '20px',
                                                    transition: 'width 0.5s'
                                                }}></div>
                                            </div>
                                        </div>
                                        
                                        {/* Stats with Icons */}
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            marginBottom: '1rem', 
                                            padding: '0.5rem',
                                            background: '#f8fafc',
                                            borderRadius: '12px'
                                        }}>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>❤️ Donors</div>
                                                <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{campaign.donors}</div>
                                            </div>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>⏰ Days Left</div>
                                                <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{campaign.daysLeft}</div>
                                            </div>
                                            <div style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>🎯 Target</div>
                                                <div style={{ fontWeight: 'bold', color: '#1e293b' }}>₹{campaign.target.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        
                                        {/* Raised Amount Highlight */}
                                        <div style={{
                                            textAlign: 'center',
                                            marginBottom: '1rem',
                                            padding: '0.5rem',
                                            background: campaign.urgent ? '#fef2f2' : '#fff7ed',
                                            borderRadius: '12px'
                                        }}>
                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Raised So Far</span>
                                            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: campaign.urgent ? '#ef4444' : '#f97316' }}>
                                                ₹{campaign.raised.toLocaleString()}
                                            </div>
                                        </div>
                                        
                                        {/* Donate Button */}
                                        <Link to="/campaigns" style={{
                                            display: 'block',
                                            textAlign: 'center',
                                            background: campaign.urgent ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #f97316, #ea580c)',
                                            color: 'white',
                                            padding: '0.8rem',
                                            borderRadius: '40px',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'scale(1.02)';
                                            e.target.style.boxShadow = campaign.urgent ? '0 5px 15px rgba(239,68,68,0.3)' : '0 5px 15px rgba(249,115,22,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.boxShadow = 'none';
                                        }}>
                                            {campaign.urgent ? '⚠️ Donate Urgently →' : '💝 Donate Now →'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter Section */}
            <section className="newsletter">
                <div className="newsletter-content">
                    <h2>📧 Stay Updated with Impact Stories</h2>
                    <p>Subscribe to our newsletter and get monthly updates on how your donations are changing lives.</p>
                    <form onSubmit={handleSubscribe} className="newsletter-form">
                        <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button type="submit">Subscribe →</button>
                    </form>
                </div>
            </section>

            {/* Add these animations to your App.css */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(30px, 30px) rotate(10deg); }
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }
            `}</style>
        </>
    );
};

export default Home;