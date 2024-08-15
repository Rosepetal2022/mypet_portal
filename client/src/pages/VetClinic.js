import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VetClinic = () => {
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { placeId } = useParams(); 

    useEffect(() => {
        const fetchClinic = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/clinic?place_id=${encodeURIComponent(placeId)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch clinic details');
                }
                const data = await response.json();
                console.log(data);
                setClinic(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (placeId) {
            fetchClinic();
        } else {
            setError('No place_id provided in URL');
            setLoading(false);
        }
    }, [placeId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!clinic) return <p>No clinic details available.</p>;

    return (
        <div>
            <h1>{clinic.result.name}</h1>
            <p>{clinic.result.formatted_address}</p>
            <p>{clinic.result.formatted_phone_number}</p>
            <p>{clinic.result.website}</p>

            
        </div>
    );
};

export default VetClinic;