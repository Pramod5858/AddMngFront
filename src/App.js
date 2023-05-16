import React from 'react';
import PrivateComponent from './Component/PrivateComponent';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import AddDetails from './Component/AddDetails';
import Signup from './Component/Signup';
import UpdateDetails from './Component/UpdateDetails';
import DetailsList from './Component/DetailsList';
import Header from './Component/Header';
import Profile from './Component/Profile';

const App = () => {
    return (
        <div className="container-fluid" >

            <BrowserRouter>

                <Header />
                
                <Routes>
                    <Route element={<PrivateComponent />}>

                        <Route path="/" element={<DetailsList />} />
                        <Route path="/add" element={<AddDetails />} />

                        <Route path="/update/:id" element={<UpdateDetails />} />
                        <Route path="/logout" element={<Login />} />
                        <Route path="/profile" element={<Profile/>} />

                    </Route>
                    
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}
export default App