import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_ANIMAL } from '../../utils/mutations';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup,
} from 'reactstrap';


function AddAnimalModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        petname: '',
        age: '',
        breed: '',
        animaltype: '',
        weight: '',
        food: '',
        medication: '',
        notes: '',
    });

    const [addAnimal, { error }] = useMutation(ADD_ANIMAL);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
       // console.log(name, value);

    };

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            await addAnimal({
                variables: { ...formState },
            });

            // Clear the form state
            setFormState({
                petname: '',
                age: '',
                breed: '',
                animaltype: '',
                weight: '',
                food: '',
                medication: '',
                notes: ''
            });

            // Redirect to a different page after successful submission
            navigate('/Animal'); 

        } catch (error) {
            console.log(error);
        }

        toggle(); // Close the modal
    };

    return (
        <div>
            <Button className="add-pet" id="add-animal-modal" onClick={toggle}>
                Add Pet
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggle}

            >
                <ModalHeader toggle={toggle}>Add Pet</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <Label className="font" id="add-animal-modal" for="petname">
                                Pet Name
                            </Label>
                            <Input
                                id="petname"
                                className="font"
                                name="petname"
                                placeholder="Add Your Pet's Name Here"
                                type="text"
                                value={formState.petname}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="age">
                                Pet's Age
                            </Label>
                            <Input
                                id="age"
                                className="font"
                                name="age"
                                placeholder="Add Your Pet's Age Here"
                                type="text"
                                value={formState.age}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="breed">
                                Pet's Breed
                            </Label>
                            <Input
                                id="breed"
                                className="font"
                                name="breed"
                                placeholder="Add Your Pet's Breed Here"
                                type="text"
                                value={formState.breed}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="animaltype">
                                Pet's Type
                            </Label>
                            <Input
                                id="animaltype"
                                className="font"
                                name="animaltype"
                                placeholder="Add Your Pet's Type Here"
                                type="text"
                                value={formState.animaltype}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="weight">
                                Pet's Weight
                            </Label>
                            <Input
                                id="weight"
                                className="font"
                                name="weight"
                                placeholder="Add Your Pet's Weight Here"
                                type="text"
                                value={formState.weight}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="food">
                                Pet's Food
                            </Label>
                            <Input
                                id="food"
                                className="font"
                                name="food"
                                placeholder="Add Your Pet's Food Here"
                                type="text"
                                value={formState.food}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="medication">
                                Pet's Medications
                            </Label>
                            <Input
                                id="medication"
                                className="font"
                                name="medication"
                                placeholder="Add Your Pet's Medications Here"
                                type="text"
                                value={formState.medication}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="font" for="notes">
                                Additional Notes
                            </Label>
                            <Input
                                id="notes"
                                className="font"
                                name="notes"
                                placeholder="Add Additional Notes Here"
                                type="text"
                                value={formState.notes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={toggle} className="submit-button" type="submit" value="submit">
                        Add Pet
                    </Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


export default AddAnimalModal;