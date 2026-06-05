import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="feature-card-light">
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default FeatureCard;