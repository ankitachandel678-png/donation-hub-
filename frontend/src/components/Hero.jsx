import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ stats }) => {
    return (
        <section className="hero-light">
            <div className="hero-content">
                <span className="hero-badge">✨ Make a Difference Today</span>
                <h1>Every Child <span className="highlight">Deserves</span> Quality Education</h1>
                <p>Your small donation can buy books, build classrooms, and brighten futures for thousands of underprivileged students across India.</p>
                <div className="hero-buttons">
                    <Link to="/schools" className="btn-primary">Start Donating →</Link>
                    <Link to="/about" className="btn-secondary">Learn More</Link>
                </div>
            </div>
            <div className="hero-stats">
                {stats.map((stat, index) => (
                    <div className="hero-stat" key={index}>
                        <h3>{stat.number}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;