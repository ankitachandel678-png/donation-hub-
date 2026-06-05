import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SchoolCard = ({ school }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // YAHAN APNE IMAGE LINKS DALO
    const schoolImages = {
        "Government Primary School, Sarai Village": "https://static.wixstatic.com/media/11062b_6864d981fa86430f84b3926857b21d8c~mv2.jpg/v1/fill/w_640,h_1226,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_6864d981fa86430f84b3926857b21d8c~mv2.jpg",
        "Kasturba Gandhi Balika Vidyalaya": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500",
        "Middle School, Madhepura": "https://img.magnific.com/free-photo/red-buildings-households_1127-2024.jpg?semt=ais_hybrid&w=740&q=80"
    };

    const defaultImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500";
    const schoolImage = schoolImages[school.name] || defaultImage;

    const handleDonate = (item, price) => {
        if (!user) {
            alert('Please login first to donate!');
            navigate('/login');
            return;
        }
        alert(`Thank you for your donation of ₹${price} for ${item}!`);
    };

    return (
        <div style={{ background: 'white', borderRadius: '24px', marginBottom: '2rem', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '320px', minHeight: '320px' }}>
                <img 
                    src={schoolImage}
                    alt={school.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            
            <div style={{ flex: 1, padding: '1.8rem' }}>
                <h2>{school.name}</h2>
                <div style={{ color: '#f97316', marginBottom: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> {school.location} | 🧑‍🎓 {school.students} Students | 🏛️ Grades {school.grades}</div>
                <p style={{ color: '#64748b', marginBottom: '1rem', lineHeight: '1.6' }}>{school.description}</p>
                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>📋 Current Needs</h3>
                    {school.needs.map((need, idx) => (
                        <div key={idx} style={{ background: 'white', borderRadius: '12px', padding: '1rem', marginBottom: '0.8rem', borderLeft: `4px solid ${need.urgent ? '#ef4444' : '#f97316'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                <strong>{need.item}</strong>
                                <span style={{ color: '#f97316', fontWeight: 'bold' }}>₹{need.price.toLocaleString()}</span>
                            </div>
                            <div className="progress-bar"><div style={{ width: `${(need.raised / need.price) * 100}%` }}></div></div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                                ₹{need.raised.toLocaleString()} raised of ₹{need.price.toLocaleString()} | {need.donors} donors
                                {need.urgent && <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>⚡ Urgent</span>}
                            </div>
                            <button onClick={() => handleDonate(`${need.item} - ${school.name}`, need.price)} style={{ marginTop: '0.8rem', background: '#f97316', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '40px', cursor: 'pointer' }}>
                                Donate ₹{need.price}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchoolCard;