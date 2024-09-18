// src/layouts/MainLayout.tsx
import React from 'react';
import Sidebar from './components/sidebar';

type LayoutProps = {
  children: React.ReactNode;
};
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="w-3/4 bg-gray-200 p-4">
        <div className="page-content h-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
