import React from 'react';

const StoryCard = ({ story, featured }) => {
    // Story images mapping - YAHAN APNE IMAGE LINKS DALO
    const storyImages = {
        "How 500 Books Changed a Village School": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
        "10 Computers Installed in Girls School": "https://blog.labcollector.com/wp-content/uploads/blog/2020/10/Presentation1.jpg",
        "RO System Installed in Rajasthan": "https://www.lanshan.com.tw/images/379529?stamp=1735540792"
        
    };

    const defaultImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600";
    const storyImage = storyImages[story.title] || defaultImage;

    if (featured) {
        return (
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                {/* Featured Story Image */}
                <div style={{ width: '350px', minHeight: '350px', overflow: 'hidden' }}>
                    <img 
                        src={storyImage}
                        alt={story.title}
                        style={{ 
                            width: '100%', 
                            height: '200%', 
                            objectFit: 'cover',
                            transition: 'transform 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                </div>
                
                <div style={{ flex: 1, padding: '2rem' }}>
                    <span style={{ background: '#fed7aa', color: '#ea580c', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem' }}>{story.category}</span>
                    <h2 style={{ margin: '0.8rem 0' }}>{story.title}</h2>
                    <p style={{ color: '#64748b', lineHeight: '1.6' }}>{story.description}</p>
                    <div style={{ display: 'flex', gap: '2rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                        <div><strong style={{ fontSize: '1.3rem', color: '#f97316' }}>₹{story.raised?.toLocaleString()}</strong><br /><span style={{ fontSize: '0.8rem', color: '#64748b' }}>Raised</span></div>
                        <div><strong style={{ fontSize: '1.3rem', color: '#f97316' }}>{story.donors}</strong><br /><span style={{ fontSize: '0.8rem', color: '#64748b' }}>Donors</span></div>
                        <div><strong style={{ fontSize: '1.3rem', color: '#f97316' }}>{story.studentsImpacted}+</strong><br /><span style={{ fontSize: '0.8rem', color: '#64748b' }}>Students Impacted</span></div>
                    </div>
                    {story.quote && (
                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '16px', fontStyle: 'italic' }}>
                            <p>"{story.quote}"</p>
                            <cite style={{ color: '#f97316' }}>- {story.quoteAuthor}</cite>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', transition: '0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            {/* Story Image */}
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                    src={storyImage}
                    alt={story.title}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>
            
            <div style={{ padding: '1.2rem' }}>
                <span style={{ background: '#fed7aa', color: '#ea580c', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem' }}>{story.category}</span>
                <h3 style={{ margin: '0.8rem 0', fontSize: '1.1rem' }}>{story.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.4' }}>{story.description}</p>
                
                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
                    <div>
                        <strong style={{ color: '#f97316' }}>₹{story.raised?.toLocaleString()}</strong>
                        <br />
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>raised</span>
                    </div>
                    <div>
                        <strong style={{ color: '#f97316' }}>{story.donors}</strong>
                        <br />
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>donors</span>
                    </div>
                    <div>
                        <strong style={{ color: '#f97316' }}>{story.studentsImpacted}+</strong>
                        <br />
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>students</span>
                    </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', fontSize: '0.7rem', color: '#64748b' }}>
                    <span>❤️ {story.donors} donors</span>
                    <span>📅 {story.date}</span>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;