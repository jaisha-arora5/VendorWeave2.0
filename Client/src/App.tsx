"use client"

import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import HomePage from './Pages/Home/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Firm from './Pages/Firm/Firm';
import Vendors from './Pages/Vendors/Vendors';

export default function App() {
  return (
    <div>
      <h1>Welcome to the Client App</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/firm" element={<Firm />} />
        <Route path="/vendors" element={<Vendors />} />
      </Routes>
    </div>
  );
}