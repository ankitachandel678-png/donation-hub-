import React from 'react';
import CampaignCard from '../components/CampaignCard';
import { campaignsData } from '../data';

const Campaigns = () => {
    const featuredCampaign = campaignsData.find(c => c.featured);
    const otherCampaigns = campaignsData.filter(c => !c.featured);

    return (
        <>
            <section className="page-hero-light">
                <div className="page-hero-content">
                    <span className="hero-badge">🔥 Active Campaigns</span>
                    <h1>Fundraising <span className="highlight">Campaigns</span></h1>
                    <p>Join these urgent campaigns and help us reach the goal</p>
                </div>
            </section>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                {featuredCampaign && (
                    <div style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', borderRadius: '24px', padding: '2rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div>
                                <span style={{ background: '#f97316', color: 'white', padding: '0.2rem 1rem', borderRadius: '40px', fontSize: '0.8rem' }}>⭐ Featured</span>
                                <h2 style={{ margin: '0.8rem 0' }}>{featuredCampaign.title}</h2>
                                <p style={{ color: '#64748b' }}>{featuredCampaign.description}</p>
                                <div style={{ marginTop: '1rem' }}>
                                    <a href="/schools" className="btn-primary">Donate Now →</a>
                                </div>
                            </div>
                            <div style={{ fontSize: '4rem' }}> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5B3KWWK1sv_pqGWhaw71zZRlSS58PGo3kEw&s" alt="" height={"350px"} width={"400px "}/></div>
                        </div>
                    </div>
                )}

                <div className="section-header">
                    <h2>All <span className="highlight">Campaigns</span></h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {otherCampaigns.map(campaign => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Campaigns;