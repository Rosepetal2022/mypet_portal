import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

const BreedDetails = () => {
    const { id } = useParams();
    const [breed, setBreed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBreedDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/dog-breeds`);
                if (!response.ok) {
                    throw new Error('Failed to fetch breed details');
                }
                const data = await response.json();
                const selectedBreed = data.find((b) => b.id === parseInt(id));
                setBreed(selectedBreed);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBreedDetails();
    }, [id]);

    if (loading) return <FadeLoader color={"#36D7B7"} size={150} />;
    if (error) return <p>Error: {error}</p>;
    if (!breed) return <p>Breed not found.</p>;

    const imageUrl = `http://localhost:4000/dog-image/${breed.reference_image_id}`;

    return (
        <div>
            {breed.reference_image_id && <img src={imageUrl} alt={breed.name} width="200" />}
            <h2>{breed.name}</h2>
            <p><strong>Bred for:</strong> {breed.bred_for}</p>
            <p><strong>Breed group:</strong> {breed.breed_group}</p>
            <p><strong>Life span:</strong> {breed.life_span}</p>
            <p><strong>Temperament:</strong> {breed.temperament}</p>
            <p><strong>Height:</strong> {breed.height.imperial} inches</p>
        </div>
    );
};

export default BreedDetails;
