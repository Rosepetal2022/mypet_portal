import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VetSearch = () => {
    const [clinics, setClinics] = useState([]); // Updated state to reflect veterinary clinics
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    // Function to fetch data from the microservice
    const fetchVets = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setClinics(data); 
            console.log(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (query) { 
            fetchVets(query);
        }
    }, [query]); 

   
    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search for veterinary clinics"
            />
            <button onClick={() => fetchVets(query)}>Search</button>
            {error && <p>Error: {error}</p>}
            <ul>
                {clinics.map((clinic, index) => (
                     <li key={index}>
                        <Link to={`/clinic/${clinic.place_id}`}>
                            <h3>{clinic.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VetSearch;