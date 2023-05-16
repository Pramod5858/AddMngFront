import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/login")
    }

  },[])


  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch('https://addmngbackend.onrender.com/registers', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'content-Type': 'application/json'
      },
    });
    result = await result.json()
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/login");
    }
    else {
      alert("Please enter the  here auth is missing details")
    }

  }
  return (
    <div className="alert alert-primary" role="alert">
      <Form>

        <h1>Register</h1>
        <Form.Group className="mb-3" >

          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter email" value={name} onChange={(e) => setName(e.target.value)} />   {/* //Here value ={name}, so name is state over here */}
          

          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">

          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className="btn btn-success" type="button" onClick={collectData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signup;