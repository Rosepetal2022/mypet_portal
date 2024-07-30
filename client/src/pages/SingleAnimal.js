import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ANIMAL } from '../utils/queries';
import { UPDATE_ANIMAL } from '../utils/mutations';
import "bootstrap/dist/css/bootstrap.min.css";

const SingleAnimal = () => {
    const { id: animalId } = useParams();
    const { loading, data } = useQuery(QUERY_ANIMAL, { variables: { id: animalId } });
    const [updateAnimal] = useMutation(UPDATE_ANIMAL);

    const [formValues, setFormValues] = useState({
        petname: '',
        age: '',
        breed: '',
        animaltype: '',
        weight: ''
    });

    const [showForm, setShowForm] = useState(false); // State for controlling form visibility

    const animal = data?.animal || {};

    useEffect(() => {
        if (data && data.animal) {
            setFormValues({
                petname: data.animal.petname || '',
                age: data.animal.age || '',
                breed: data.animal.breed || '',
                animaltype: data.animal.animaltype || '',
                weight: data.animal.weight || ''
            });
        }
    }, [data]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateAnimal({
                variables: {
                    id: animalId,
                    input: {
                        petname: formValues.petname,
                        age: parseInt(formValues.age),
                        breed: formValues.breed,
                        animaltype: formValues.animaltype,
                        weight: parseFloat(formValues.weight)
                    }
                }
            });
            alert('Animal updated successfully!');
            setShowForm(false); // Hide the form after submission
        } catch (err) {
            console.error(err);
            alert('Error updating animal');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="petname">
                <h1 className="petname__heading">{animal.petname}</h1>
                <span className="petname__span">{animal.animaltype}</span>
                <span className="petname__span">{animal.breed}</span>
                <span className="petname__span">{animal.weight}</span>
            </div>

            <div className="update-animal">
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Update Animal'}
                </button>

                {showForm && (
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="petname">Pet Name:</label>
                            <input
                                type="text"
                                id="petname"
                                name="petname"
                                value={formValues.petname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formValues.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Breed:</label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                value={formValues.breed}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="animaltype">Animal Type:</label>
                            <input
                                type="text"
                                id="animaltype"
                                name="animaltype"
                                value={formValues.animaltype}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight:</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formValues.weight}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Update Animal</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default SingleAnimal;