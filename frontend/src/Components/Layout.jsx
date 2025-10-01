// src/Components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className=""> {/* adjust padding as needed */}
        <Outlet />
      </main>
    </>
  );
}
