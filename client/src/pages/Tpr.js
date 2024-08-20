import DogTPRForm from "../components/DogTPRForm";
import CatTPRForm from "../components/CatTPRForm";

const Tpr = () => {
    return (
        <>
            <h1 className="health-check--title">Pet Healch Check Service</h1>
            <p className="health-check--p">Keeping track of a pet's temperature, pulse, and respiration (TPR) is crucial for assessing their overall health. TPR monitoring helps detect early signs of illness or distress, ensuring prompt intervention and care. Currently, we offer health checks for dogs and cats, with data provided by the ASPCA to ensure accurate and reliable assessments. Regular TPR checks are an essential part of maintaining your pet's well-being and catching potential health issues before they become serious.
                Enter your dog or cats stats below and recieve a message regarding their health.
            </p>

            <h2 className="health-check--label">For Dogs:</h2>
            <DogTPRForm />

            <h2 className="health-check--label">For Cats:</h2>
            <CatTPRForm />

        </>
    )
}

export default Tpr;