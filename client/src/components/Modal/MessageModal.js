import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const MessageModal = ({ isOpen, toggle, message }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Health Check Details</ModalHeader>
        <ModalBody className="modal-body--tpr">
          <p>Temperature: {message.temperature}</p>
          <p>Pulse: {message.pulse}</p>
          <p>Respiration: {message.respiration}</p>
          <p>To save the data to your pet's profile, close this message and click the save data button!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  };
  
  export default MessageModal;