import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/")
    }

  })

  const handleLogin = async () => {
    console.log("email, password", email, password)
    let result = await fetch('https://addmngbackend.onrender.com/logins', {
      method: 'post', body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result)
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/")
    } else {
      alert("Please enter the  here auth is missing details")
    }
  }
  return (
    <div className="alert alert-primary" role="alert">

      <Form>
        <Form.Group className="mb-3" >

          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label >Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className="btn btn-success" variant="primary" type="button" onClick={handleLogin}>
          Submit
        </Button>

      </Form>


    </div>
  );
}

export default Login;