import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createDonation, getMyDonations } from '../services/api';

const Dashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [totalDonated, setTotalDonated] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');
    const [donationItem, setDonationItem] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const checkAuth = () => {
            const localToken = localStorage.getItem('token');
            const localUser = localStorage.getItem('user');
            
            if (!localToken && !token) {
                navigate('/login');
                return false;
            }
            return true;
        };

        if (!checkAuth()) return;
        
        // Load donations
        const loadData = async () => {
            try {
                setLoading(true);
                const currentToken = token || localStorage.getItem('token');
                const response = await getMyDonations(currentToken);
                
                if (response && response.success) {
                    setDonations(response.donations || []);
                    const total = response.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
                    setTotalDonated(total);
                } else {
                    // Fallback to localStorage
                    const localUser = localStorage.getItem('user');
                    if (localUser) {
                        const parsedUser = JSON.parse(localUser);
                        setDonations(parsedUser.donations || []);
                        setTotalDonated(parsedUser.totalDonated || 0);
                    }
                }
            } catch (error) {
                console.error('Error loading donations:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadData();
    }, [token, navigate]);

    const handleDonate = async () => {
        if (!donationAmount || !donationItem) {
            alert('Please select item and enter amount');
            return;
        }

        try {
            const currentToken = token || localStorage.getItem('token');
            const donationData = {
                amount: parseInt(donationAmount),
                item: donationItem,
                isAnonymous: false,
                message: `Donation for ${donationItem}`
            };

            const response = await createDonation(donationData, currentToken);
            
            if (response.success) {
                alert(`✅ Donation Successful!\nAmount: ₹${donationAmount}\nItem: ${donationItem}\nReceipt ID: ${response.receiptId}`);
                
                // Update local state
                const newDonation = {
                    amount: parseInt(donationAmount),
                    item: donationItem,
                    receiptId: response.receiptId,
                    date: new Date().toISOString()
                };
                
                const updatedDonations = [...donations, newDonation];
                setDonations(updatedDonations);
                setTotalDonated(totalDonated + parseInt(donationAmount));
                
                // Update localStorage
                const localUser = localStorage.getItem('user');
                if (localUser) {
                    const parsedUser = JSON.parse(localUser);
                    parsedUser.donations = updatedDonations;
                    parsedUser.totalDonated = totalDonated + parseInt(donationAmount);
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                }
                
                setShowDonationModal(false);
                setDonationAmount('');
                setDonationItem('');
            } else {
                alert(`❌ Donation failed: ${response.message}`);
            }
        } catch (error) {
            console.error('Donation error:', error);
            alert('❌ Donation failed. Please try again.');
        }
    };

    const downloadReceipt = (donation) => {
        const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Donation Receipt</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; background: #f8fafc; }
        .receipt { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; }
        .title { background: #f97316; color: white; padding: 10px; text-align: center; font-weight: bold; }
        .content { padding: 30px; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
        .amount { font-size: 24px; font-weight: bold; color: #f97316; text-align: center; margin: 20px 0; }
        .thankyou { text-align: center; padding: 20px; background: #fef3e8; border-radius: 12px; }
        .footer { text-align: center; padding: 20px; font-size: 10px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header"><div class="logo">📚 Digital Donation Hub</div><div>Empowering Education Through Generosity</div></div>
        <div class="title">DONATION RECEIPT</div>
        <div class="content">
            <div class="row"><strong>Receipt No:</strong> <span>${donation.receiptId}</span></div>
            <div class="row"><strong>Date:</strong> <span>${new Date(donation.date).toLocaleDateString()}</span></div>
            <div class="row"><strong>Donor Name:</strong> <span>${user?.name || 'Anonymous'}</span></div>
            <div class="row"><strong>Item:</strong> <span>${donation.item}</span></div>
            <div class="amount">₹${donation.amount.toLocaleString()}</div>
            <div class="thankyou">🙏 Thank you for your generosity! 🙏</div>
        </div>
        <div class="footer"><p>Digital Donation Hub | Valid for 80G tax exemption</p></div>
    </div>
</body>
</html>
        `;
        
        const blob = new Blob([receiptHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${donation.receiptId}.html`;
        a.click();
        URL.revokeObjectURL(url);
        alert('✅ Receipt downloaded!');
    };

    const downloadAllReceipts = () => {
        if (donations.length === 0) {
            alert('No donations found!');
            return;
        }
        
        let allHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>All Receipts</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; background: #f8fafc; }
        .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #f97316, #ea580c); color: white; border-radius: 16px; margin-bottom: 30px; }
        .receipt { background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
        .receipt-title { background: #f97316; color: white; padding: 10px; margin: -20px -20px 20px -20px; border-radius: 12px 12px 0 0; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .total { margin-top: 20px; padding: 15px; background: #fef3e8; border-radius: 12px; text-align: center; font-size: 18px; font-weight: bold; color: #f97316; }
    </style>
</head>
<body>
    <div class="header"><h2>📚 Digital Donation Hub</h2><p>All Donation Receipts</p></div>`;
        
        donations.forEach((d, i) => {
            allHTML += `
            <div class="receipt">
                <div class="receipt-title">Receipt #${i + 1}</div>
                <div class="row"><strong>Receipt No:</strong> <span>${d.receiptId}</span></div>
                <div class="row"><strong>Date:</strong> <span>${new Date(d.date).toLocaleDateString()}</span></div>
                <div class="row"><strong>Item:</strong> <span>${d.item}</span></div>
                <div class="row"><strong>Amount:</strong> <span style="color:#f97316;font-weight:bold;">₹${d.amount.toLocaleString()}</span></div>
            </div>`;
        });
        
        allHTML += `<div class="total">Total Donated: ₹${totalDonated.toLocaleString()}</div></body></html>`;
        
        const blob = new Blob([allHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `all_receipts_${new Date().toISOString().slice(0, 10)}.html`;
        a.click();
        URL.revokeObjectURL(url);
        alert('✅ All receipts downloaded!');
    };

    const downloadCertificate = () => {
        const students = Math.floor(totalDonated / 500);
        const certHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Impact Certificate</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #f0f0f0; }
        .certificate { max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 40px; text-align: center; }
        .title { font-size: 48px; font-weight: bold; text-align: center; margin: 40px 0 20px; color: #f97316; }
        .content { padding: 40px; text-align: center; }
        .recipient { font-size: 36px; font-weight: bold; color: #1e293b; margin: 20px 0; border-bottom: 2px solid #f97316; display: inline-block; }
        .stats { display: flex; justify-content: center; gap: 40px; margin: 40px 0; flex-wrap: wrap; }
        .stat { text-align: center; padding: 20px; background: #fef3e8; border-radius: 16px; min-width: 150px; }
        .stat-num { font-size: 32px; font-weight: bold; color: #f97316; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 10px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header"><div class="logo" style="font-size:32px;font-weight:bold;">📚 Digital Donation Hub</div></div>
        <div class="title">IMPACT CERTIFICATE</div>
        <div class="content">
            <div>This certificate is presented to</div>
            <div class="recipient">${user?.name || 'Our Valued Donor'}</div>
            <div class="stats">
                <div class="stat"><div class="stat-num">₹${totalDonated.toLocaleString()}</div><div>Total Donated</div></div>
                <div class="stat"><div class="stat-num">${donations.length}</div><div>Donations Made</div></div>
                <div class="stat"><div class="stat-num">${students}</div><div>Students Impacted</div></div>
            </div>
            <div style="background:#fef3e8;padding:20px;border-radius:16px;margin-top:20px;">
                <div style="font-size:18px;color:#f97316;font-weight:bold;">🌟 Thank You for Making a Difference! 🌟</div>
            </div>
        </div>
        <div class="footer"><p>Digital Donation Hub | Certificate ID: DDH/${Date.now()}</p></div>
    </div>
</body>
</html>
        `;
        
        const blob = new Blob([certHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `impact_certificate_${new Date().toISOString().slice(0, 10)}.html`;
        a.click();
        URL.revokeObjectURL(url);
        alert('✅ Certificate downloaded!');
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}><h2>Loading Dashboard...</h2></div>;
    }

    const displayUser = user || JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-wrapper" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Welcome Card */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', color: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                    <h1>👋 Welcome back, <span style={{ color: '#f97316' }}>{displayUser.name}</span>!</h1>
                    <p>Here's what's happening with your donations today.</p>
                </div>
                <div><span>{new Date().toLocaleDateString()}</span></div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '2rem' }}>💰</div>
                    <div><h3 style={{ margin: 0 }}>Total Donated</h3><p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#f97316' }}>₹{totalDonated.toLocaleString()}</p></div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '2rem' }}>🏫</div>
                    <div><h3 style={{ margin: 0 }}>Donations Made</h3><p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#f97316' }}>{donations.length}</p></div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '2rem' }}>🌟</div>
                    <div><h3 style={{ margin: 0 }}>Impact Score</h3><p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#f97316' }}>{Math.min(100, Math.floor(totalDonated / 100))}</p></div>
                </div>
            </div>

            {/* Quick Donate Button */}
            <div style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', padding: '1.5rem', borderRadius: '24px', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>🤝 Make a Difference Today</h2>
                <p>Your donation can change a child's life</p>
                <button onClick={() => setShowDonationModal(true)} style={{ background: 'white', color: '#f97316', border: 'none', padding: '0.8rem 2rem', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>+ Quick Donate</button>
            </div>

            {/* Donation History */}
            <div style={{ background: 'white', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0 }}>📜 Donation History</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={downloadAllReceipts} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '40px', cursor: 'pointer' }}>📥 Download All</button>
                        <button onClick={() => setShowDonationModal(true)} style={{ background: '#f97316', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '40px', cursor: 'pointer' }}>+ Donate Again</button>
                    </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                    {donations.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                            <div style={{ fontSize: '3rem' }}>📭</div>
                            <p>No donations yet. Click "Donate Again" to make your first donation!</p>
                        </div>
                    ) : (
                        donations.slice().reverse().map((donation, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                                <div>
                                    <h4 style={{ margin: 0 }}>{donation.item}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0' }}>Receipt: {donation.receiptId}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f97316' }}>₹{donation.amount.toLocaleString()}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{new Date(donation.date).toLocaleDateString()}</div>
                                    <button onClick={() => downloadReceipt(donation)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.7rem', cursor: 'pointer', marginTop: '0.2rem' }}>📥 Receipt</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Profile & Certificate */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: 1, background: 'white', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem', color: 'white' }}>👤</div>
                    <h3>{displayUser.name}</h3>
                    <p style={{ color: '#64748b' }}>{displayUser.email}</p>
                    <span style={{ background: '#fef3e8', color: '#f97316', padding: '0.2rem 1rem', borderRadius: '40px', fontSize: '0.8rem' }}>{displayUser.role || 'Donor'}</span>
                </div>
                <div style={{ flex: 1, background: 'white', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <h2>🧾 Tax Benefits</h2>
                    <p>💰 Eligible for 80G Tax Exemption</p>
                    <div style={{ background: '#e2e8f0', borderRadius: '20px', height: '8px', margin: '1rem 0' }}><div style={{ width: `${Math.min(100, (totalDonated / 500) * 100)}%`, background: '#f97316', height: '8px', borderRadius: '20px' }}></div></div>
                    <button onClick={downloadAllReceipts} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.7rem 1rem', borderRadius: '40px', width: '100%', cursor: 'pointer' }}>📥 Download All Receipts</button>
                </div>
                <div style={{ flex: 1, background: 'linear-gradient(135deg, #fef3e8, #ffe4d6)', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <h2>🏅 Your Impact Certificate</h2>
                    <p>Download your personalized impact certificate</p>
                    <button onClick={downloadCertificate} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '40px', cursor: 'pointer' }}>📜 Download Certificate</button>
                </div>
            </div>

            {/* Donation Modal */}
            {showDonationModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '400px', width: '90%' }}>
                        <h2 style={{ marginBottom: '1rem', color: '#f97316' }}>💝 Make a Donation</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Select Item:</label>
                            <select value={donationItem} onChange={(e) => setDonationItem(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <option value="">Select an item</option>
                                <option value="Story Books">📚 Story Books</option>
                                <option value="Notebooks">📓 Notebooks</option>
                                <option value="Pens & Stationery">✏️ Pens & Stationery</option>
                                <option value="School Bags">🎒 School Bags</option>
                                <option value="Computer">💻 Computer</option>
                                <option value="Water Purifier">💧 Water Purifier</option>
                                <option value="General Donation">❤️ General Donation</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Amount (₹):</label>
                            <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} placeholder="Enter amount" style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button onClick={handleDonate} style={{ flex: 1, background: '#f97316', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' }}>💝 Donate Now</button>
                            <button onClick={() => setShowDonationModal(false)} style={{ flex: 1, background: '#e2e8f0', color: '#64748b', border: 'none', padding: '0.8rem', borderRadius: '40px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;