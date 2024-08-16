import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import PetDropdown from '../components/PetDropDown';
import MessageModal from '../components/Modal/MessageModal';
import SuccessModal from "../components/Modal/SuccessModal";


function DogTPRForm() {
  const [temperature, setTemperature] = useState('');
  const [pulse, setPulse] = useState('');
  const [respiration, setRespiration] = useState('');
  const [size, setSize] = useState('');
  const [petId, setPetId] = useState('');
  const [message, setMessage] = useState('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { data, loading, error } = useQuery(QUERY_ME);
  const user = data?.me;

  const handleFetch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/dog?temperature=${temperature}&pulse=${pulse}&respiration=${respiration}&size=${size}&petId=${petId}`, {
        method: 'GET',
      });
      const result = await response.json();
      console.log(result);
      setMessage(result)
      setIsMessageModalOpen(true); 
    } catch (error) {
      console.error('Error fetching dog data:', error);
    }
  };

  const handleSave = async (event) => {
    if (!petId) {
        alert('Please select a pet.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:3005/api/save-tpr`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petId,
            temperature,
            pulse,
            respiration,
            size
          }),
        });
        const result = await response.json();
        console.log(result);
        setMessage("Health Check Data saved succesfully to your pet's profile!");
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error('Error saving dog data:', error);
      }
  };

  const toggleMessageModal = () => setIsMessageModalOpen(!isMessageModalOpen);
  const toggleSuccessModal = () => setIsSuccessModalOpen(!isSuccessModalOpen);

return (
    <div className="tpr-form">
        {user && (
    <form className="form-group--holder-tpr" >
      <PetDropdown setPetId={setPetId} />
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        placeholder="Temperature"
        required
        className="form-group--entry-tpr"
      />
      <input
        type="number"
        value={pulse}
        onChange={(e) => setPulse(e.target.value)}
        placeholder="Pulse"
        required
        className="form-group--entry-tpr"
      />
      <input
        type="number"
        value={respiration}
        onChange={(e) => setRespiration(e.target.value)}
        placeholder="Respiration"
        required
        className="form-group--entry-tpr"
      />
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="Size (pounds)"
        required
        className="form-group--entry-tpr"
      />
      <button className="add-pet" type="button" onClick={handleFetch}>Execute Health Check</button>
      <button className="add-pet" type="button" onClick={handleSave}>Save Data</button>
    </form>
    )}
    <MessageModal isOpen={isMessageModalOpen} toggle={toggleMessageModal} message={message} />
    <SuccessModal isOpen={isSuccessModalOpen} toggle={toggleSuccessModal} message={message} />
    </div>
  );
}

export default DogTPRForm;