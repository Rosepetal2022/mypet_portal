import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import { PiPawPrintFill } from "react-icons/pi";
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

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
        <>
       
        <div className="dog-breed-container">
            <div className="icons-container">
                <PiPawPrintFill className="icon-left" size={100} />
                <div className="card-container">
                <Card>
                    {breed.reference_image_id && (
                        <CardImg top width="100%" src={imageUrl} alt={breed.name} />
                    )}
                    <CardBody className="dog-breed--text">
                        <CardTitle tag="h2">{breed.name}</CardTitle>
                        <CardText><strong>Bred for:</strong> {breed.bred_for}</CardText>
                        <CardText><strong>Breed group:</strong> {breed.breed_group}</CardText>
                        <CardText><strong>Life span:</strong> {breed.life_span}</CardText>
                        <CardText><strong>Temperament:</strong> {breed.temperament}</CardText>
                        <CardText><strong>Height:</strong> {breed.height.imperial} inches</CardText>
                    </CardBody>
                </Card>
                </div>



                <PiPawPrintFill className="icon-right" size={100} />
            </div>
        </div>
        </>
    );
};

export default BreedDetails;
