import React, { useState, useEffect } from 'react';
import SchoolCard from '../components/SchoolCard';
import { getSchools } from '../services/api';

const Schools = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            const response = await getSchools();
            if (response.success) {
                setSchools(response.schools);
            }
        } catch (error) {
            console.error('Error fetching schools:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Loading schools...</h2>
            </div>
        );
    }

    return (
        <>
            <section className="page-hero-light">
                <div className="page-hero-content">
                    <span className="hero-badge">🏫 Help Them Grow</span>
                    <h1>Schools <span className="highlight">Needing Your Help</span></h1>
                    <p>Browse through verified schools and choose where you want to make an impact</p>
                </div>
            </section>

            <div className="container" style={{ padding: '2rem' }}>
                <input
                    type="text"
                    placeholder="🔍 Search schools by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        marginBottom: '2rem',
                        borderRadius: '40px',
                        border: '2px solid #e2e8f0',
                        fontSize: '1rem'
                    }}
                />
                
                {filteredSchools.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <h3>No schools found</h3>
                    </div>
                ) : (
                    filteredSchools.map(school => (
                        <SchoolCard key={school._id} school={school} />
                    ))
                )}
            </div>
        </>
    );
};

export default Schools;