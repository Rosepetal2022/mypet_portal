import { useState, useEffect } from 'react';

function DonutGraph() {
    const [pixState, setPix] = useState(undefined);
  
    useEffect(() => {
      loadPix();
    }, []);
  
    const loadPix = async () => {
      const petData = {
        title: "",
        categ: [
          { name: "Labrador Retriever", value: 150 },
          { name: "French Bull Dog", value: 100 },
          { name: "German Shepherd", value: 90 },
          { name: "Golden Retriever", value: 80 },
        ]
      };
  
      const response = await fetch('http://localhost:3333/doughnut', {
        method: 'POST',
        body: JSON.stringify(petData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
  
      setPix(imageObjectURL);
    };
  
    return (
        <>
        <h1>The 4 Most Popular Dog Breeds in the US</h1>
      <div className="donut-div">
        {pixState ? (
          <>
            <img  className="donut-img" src={pixState} alt="graph" />
          </>
        ) : (
          <p>Loading graph...</p>
        )}
      </div>
      </>
    );
  }
  
  export default DonutGraph;