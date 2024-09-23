// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar space-y-4">
      <div className="text-3xl font-bold text-white text-center p-4 ">TRMS</div>
      <ul className="space-y-4">
        <li>
          <div className="w-11/12 bg-gray-950 rounded-md align-middle text-center p-2 m-auto">
            <Link to="/">Home</Link>
          </div>
        </li>
        <li>
          <div className="w-11/12 bg-gray-950 rounded-md align-middle text-center p-2 m-auto">
            <Link to="/about">About</Link>
          </div>
        </li>
        <li>
          <div className="w-11/12 bg-gray-950 rounded-md align-middle text-center p-2 m-auto">
            <Link to="/settings">Settings</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
