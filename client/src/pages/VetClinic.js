import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';

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
        <div className="clinic--container">
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs="12" sm="8" md="6" lg="4">
                    <Card className="p-3 mb-4 shadow-sm rounded">
                        <CardBody>
                            <CardTitle tag="h1" className="mb-2">{clinic.result.name}</CardTitle>
                            <CardText className="mb-1 clinic--text"><strong>Address:</strong> {clinic.result.formatted_address}</CardText>
                            <CardText className="mb-1 clinic--text"><strong>Phone:</strong> {clinic.result.formatted_phone_number}</CardText>
                            <CardText className="mb-1 clinic--text"><strong>Website:</strong> <a href={clinic.result.website} target="_blank" rel="noopener noreferrer">{clinic.result.website}</a></CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default VetClinic;