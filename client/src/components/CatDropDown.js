import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

function CatDropdown({ setPetId }) {
  const [selectedPetId, setSelectedPetId] = useState('');
  const { data, loading, error } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pets</p>;

  const user = data?.me;

  const handleChange = (event) => {
    const newPetId = event.target.value;
    setSelectedPetId(newPetId);
    setPetId(newPetId); 
  };

  console.log(user.animal)
  return (
    <div className="tpr-select"> 
      {user && (
        <>
          <select  value={selectedPetId} onChange={handleChange}>
            <option value="">Select a pet</option>
            {user.animal
              .filter(animal => {
                console.log(animal);
                return animal.animaltype && animal.animaltype.toLowerCase() === 'cat';
              })
            .map((animal) => (
              <option key={animal._id} value={animal._id}>
                {animal.petname}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default CatDropdown;