import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateDetails = () => {
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [pin, setPin] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDetailDetails();

    },[]);

    const getDetailDetails = async () => {
        console.log(params);
        let result = await fetch(`https://addmngbackend.onrender.com/details/${params.id}`, {
            headers: {
                autherization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        setName(result.name);
        setAddress(result.address);
        setCity(result.city)
        setState(result.state)
        setPin(result.pin)
    }

     const updateDetails = async () => {
        console.log(name, address, city, state, pin);
        let result = await fetch(`https://addmngbackend.onrender.com/details/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, address, city, state, pin }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        console.log(result)
        navigate('/')
    }

    return (
        <div className="alert alert-primary navbar-expand-lg" role="alert">
            <Form>
                <h1>Update Details for Address Management Project</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter the city" value={city} onChange={(e) => { setCity(e.target.value) }} />
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="Enter the State" value={state} onChange={(e) => { setState(e.target.value) }} />
                    <Form.Label>Pin</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Pin" value={pin} onChange={(e) => { setPin(e.target.value) }} />

                </Form.Group>

                <Button variant="success" type="submit" onClick={updateDetails}>
                    Update Address Details
                </Button>
            </Form>
        </div>
    );
}

export default UpdateDetails;