import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import heroImage from '../images/puppies_in_a_truck.jpg'

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
            <div className="hero-container">
                <img src={heroImage} alt="Hero" className="hero-image" />
                <div className="hero-text">
                    <h1 className="hero--title">Dog Breed Encyclopedia</h1>
                    <h2>Click on the dog breed to learn more!</h2>
                </div>
            </div>

            <ul id="dog-breed--ul">
                {breeds.map((breed) => (
                    <li key={breed.id}>
                        <Link id="dog-breed--link" to={`/breed/${breed.id}`}>{breed.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DogBreeds;