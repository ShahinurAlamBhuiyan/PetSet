import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const MemoriesForm = () => {
    const [newMemory, setNewMemory] = useState({
        title: '',
        body: '',
        imageUrl: '' 
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMemory((prevMemory) => ({
            ...prevMemory,
            [name]: value
        }));
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        console.log('New Memory:', newMemory);
    };
    return (
        <div className='form_container'>
            <Form onSubmit={handleFormSubmit} style={{ width: "80%" }} className="mb-4">
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={newMemory.title}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBody">
                    <Form.Label>Memory</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your memory"
                        name="body"
                        value={newMemory.body}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        name="imageUrl"
                        value={newMemory.imageUrl}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Memory
                </Button>
            </Form>
        </div>
    )
}

export default MemoriesForm