import React from 'react';
import StoryCard from '../components/StoryCard';
import { storiesData } from '../data';

const SuccessStories = () => {
    const featuredStory = storiesData.find(s => s.featured);
    const otherStories = storiesData.filter(s => !s.featured);

    return (
        <>
            <section className="page-hero-light">
                <div className="page-hero-content">
                    <span className="hero-badge">🌟 Real Impact</span>
                    <h1>Success <span className="highlight">Stories</span></h1>
                    <p>See how your donations are changing lives across India</p>
                </div>
            </section>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                {featuredStory && <StoryCard story={featuredStory} featured={true} />}
                
                <div className="section-header">
                    <h2>More <span className="highlight">Impact Stories</span></h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {otherStories.map(story => (
                        <StoryCard key={story.id} story={story} featured={false} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SuccessStories;