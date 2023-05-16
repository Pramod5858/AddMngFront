import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const auth1 = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login")
  }

  return (
    <div className="navbar bg-primary navbar-expand-lg " data-bs-theme="dark" >
      <div className="container-fluid">
        <div className="collapse navbar-collapse row">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item col-sm-3" >
              <img className='nav-item logo col-sm-2' src='/images/Logo1/jpg' alt='logo1' /></li>
          </ul>
          {
            auth1 ?

              <ul className="navbar-nav me-auto mb-2 mb-lg-0 position-absolute row" >
                <li className="nav-item col-sm-3">
                  <Link className="nav-link active col-sm-4" aria-current="page" to="/">DetailsList</Link> </li>

                <li className="nav-item col-sm-3">
                  <Link className="nav-link active " aria-current="page" to="/add">Add Products</Link> </li>

                <li className="nav-item col-sm-3"  >
                  <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link> </li>

                <li className="nav-item col-sm-3">
                  <Link className="nav-link active" aria-current="page" onClick={logout} to="/login">Logout ({JSON.parse(auth1).name})</Link></li>

              </ul>
              :
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className='col-sm-4'>
                  <Link className="nav-link active" aria-current="page" to="/signup">Sign up</ Link></li>

                <li className='col-sm-4'> 
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link> </li>
              </ul>
          }
        </div>
      </div>
    </div>

  )
}
export default Header