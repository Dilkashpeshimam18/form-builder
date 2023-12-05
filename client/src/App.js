import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './components/Auth/Login/Login';
import SignUp from './components/Auth/Signup/Signup';
import Home from './components/Home/Home';
import CreateForm from './components/Form/CreateForm/CreateForm';

function App() {
  return (
    <div className="app">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-form" element={<CreateForm />} />


        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />

      </Routes>
    </div>
  );
}

export default App;
