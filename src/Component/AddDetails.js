import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddDetails = () => {
    const [name, setName] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [pin, setPin] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();


    const addDetails = async () => {
        console.log(name, address, city, state, pin);


        if (!name || !address || !city || !state || !pin) {

            setError(true)
            return false
        }


        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn("Hi This is " + userId);
        let result = await fetch('https://addmngbackend.onrender.com/details', {
            method: 'post',
            body: JSON.stringify({ name, address, city, state, pin, userId }),
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result)
        if (result.name) {
            alert("You have successfully added new Details");
            navigate("/")                           //Need to divert it to Product page
        }

        else {
            alert("Sorry not able to add new details");
        }
    }
    return (
        <div className="alert alert-primary navbar-expand-lg" role="alert">
            <Form>
                <h1>Add Details for Address Management Project</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    {error && !name && <span className="invalid-input" >Enter valid Name</span>}

                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Address" value={address} onChange={(e) => { setaddress(e.target.value) }} />
                    {error && !address && <span className="invalid-input" >Enter valid Address</span>}
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter the city" value={city} onChange={(e) => { setCity(e.target.value) }} />
                    {error && !city && <span className="invalid-input" >Enter valid City</span>}
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="Enter the State" value={state} onChange={(e) => { setState(e.target.value) }} />
                    {error && !state && <span className="invalid-input" >Enter valid State</span>}
                    <Form.Label>Pin</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Pin" value={pin} onChange={(e) => { setPin(e.target.value) }} />
                    {error && !pin && <span className="invalid-input" >Enter valid Pin</span>}
                </Form.Group>

                <Button className="btn btn-success" variant="primary" type="submit" onClick={addDetails}>
                    Add Address Details
                </Button>
            </Form>
        </div>
    );
}

export default AddDetails;