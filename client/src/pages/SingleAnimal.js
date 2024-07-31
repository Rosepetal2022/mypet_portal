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
        weight: '',
        food: '',
        medication: '',
        notes: '',
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
                weight: data.animal.weight || '',
                food: data.animal.food || '',
                medication: data.animal.medication || '',
                notes: data.animal.notes || '',
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
                        weight: parseFloat(formValues.weight),
                        food: formValues.food,
                        medication: formValues.medication,
                        notes: formValues.notes,
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
                <span className="petname__span">{animal.age} years old</span>
                <span className="petname__span">{animal.breed}</span>
                <span className="petname__span">{animal.weight} pounds</span>
            </div>
            <div className="d-flex justify-content-between animal-content--container">
            <div className="animal-content">
                <h2 className="animal-content--title">Food</h2>
                <p className="animal-content--content">{animal.food}</p>
            </div>
            <div className="animal-content">
                <h2 className="animal-content--title">Medications</h2>
                <p className="animal-content--content">{animal.medication}</p>
            </div>
            <div className="animal-content">
                <h2 className="animal-content--title">Additional Notes</h2>
                <p className="animal-content--content">{animal.notes}</p>
            </div>
            </div>
            <div className="update-animal">
                <button className="add-pet" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Update Animal'}
                </button>

                {showForm && (
                    <form className="form-group--holder" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="petname">Pet Name:</label>
                            <input
                                className="form-group--entry"
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
                                className="form-group--entry"
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
                                className="form-group--entry"
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
                                className="form-group--entry"
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
                                className="form-group--entry"
                                type="number"
                                id="weight"
                                name="weight"
                                value={formValues.weight}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="food">Food:</label>
                            <input
                                className="form-group--entry"
                                type="text"
                                id="food"
                                name="food"
                                value={formValues.food}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="medication">Medications:</label>
                            <input
                                className="form-group--entry"
                                type="text"
                                id="medication"
                                name="medication"
                                value={formValues.medication}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="food">Additional Notes:</label>
                            <input
                                className="form-group--entry"
                                type="text"
                                id="notes"
                                name="notes"
                                value={formValues.notes}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="add-pet" type="submit">Update Animal</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default SingleAnimal;