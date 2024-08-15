import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

const DogBreeds = () => {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the microservice
        const fetchBreeds = async () => {
            try {
                const response = await fetch('http://localhost:4000/dog-breeds');
                if (!response.ok) {
                    throw new Error('Failed to fetch dog breeds');
                }
                const data = await response.json();
                setBreeds(data);
                console.log(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBreeds();
      
    }, []);

    if (loading) return <FadeLoader color={"#36D7B7"} size={150} />;;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Dog Breeds</h1>
            <ul>
                {breeds.map((breed) => (
                    <li key={breed.id}>
                    <Link to={`/breed/${breed.id}`}>{breed.name}</Link>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default DogBreeds;