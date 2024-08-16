import React, { useEffect, useState } from 'react';

function DisplayTPR({ petID }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(petID, 'petID');
    useEffect(() => {
        const fetchHealthChecks = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/get-tpr/${petID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setHistory(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (petID) {
            fetchHealthChecks();
        }
    }, [petID]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Health Check History</h3>
            {history.length === 0 ? (
                <p>No health check history found.</p>
            ) : (
                <ul>
                    {history.map((check) => (
                        <li key={check._id}>
                            <p>Date: {new Date(check.date).toLocaleString()}</p>
                            <p>Temperature: {check.temperature}</p>
                            <p>Pulse: {check.pulse}</p>
                            <p>Respiration: {check.respiration}</p>
                            <p>Size: {check.size}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DisplayTPR;