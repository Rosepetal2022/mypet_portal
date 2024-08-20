import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

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
            {history.length === 0 ? (
                <p>No health check history found.</p>
            ) : (
                <div className="tpr-history">
                    {history.map((check) => (
                        <Card key={check._id} className="tpr-card">
                            <CardBody>
                                <CardTitle tag="h3">
                                    Date: {new Date(check.date).toLocaleString()}
                                </CardTitle>
                                <CardText>Temperature: {check.temperature}</CardText>
                                <CardText>Pulse: {check.pulse}</CardText>
                                <CardText>Respiration: {check.respiration}</CardText>
                            </CardBody>
                        </Card>
                    ))}
                </div>

            )}
        </div>
    );
};

export default DisplayTPR;