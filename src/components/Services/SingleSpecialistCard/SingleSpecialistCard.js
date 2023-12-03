import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SingleSpecialistCard = ({ specialist }) => {
    const [showDoctorDetails, setShowDoctorDetails] = useState(false);

    // Function to show the dr. details modal
    const handleShowDoctorDetails = () => {
        setShowDoctorDetails(true);
    };

    // Function to hide the dr. details modal
    const handleCloseDoctorDetails = () => {
        setShowDoctorDetails(false);
    };
    console.log(specialist)

    return (
        <Card style={{ width: '300px', height: '400px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Card.Img
                variant="top"
                src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg2OC1zYXNpLTA2LmpwZw.jpg"
                style={{ borderRadius: '15px 15px 0 0', height: '50%', objectFit: 'cover' }}
            />
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Dr. {specialist?.firstname + " " + specialist.lastname}</Card.Title>
                    <Card.Text style={{ textAlign: 'justify', color: '#555' }}>Degrees: {specialist?.company?.bs}</Card.Text>
                </div>
                <Button onClick={handleShowDoctorDetails} variant="outline-primary" style={{ alignSelf: 'flex-end' }}>Details</Button>
                <Modal show={showDoctorDetails} onHide={handleCloseDoctorDetails}>
                    <Modal.Header closeLabel='cancel'>
                        <Modal.Title>Dr. {specialist?.firstname + " " + specialist.lastname}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Degrees: {specialist?.company?.bs}</p>
                            <p>Address: {specialist?.address.street}, {specialist?.address.city}</p>
                            <p>Email: {specialist.email}</p>
                            <p>Phone: {specialist.phone}</p>
                            <p>Website: {specialist.website}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDoctorDetails}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="outline-secondary" style={{ alignSelf: 'flex-end' }}>Take Appointment</Button>
            </Card.Body>
        </Card>
    );
}

export default SingleSpecialistCard;
