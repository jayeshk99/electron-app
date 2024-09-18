// # src/app.tsx

import '../index.css'; // import css

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout';
import Home from './pages/Home';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <h1 className="font-bold text-2xl underline text-red-500">Hello react</h1> */}
    <BrowserRouter>
      <MainLayout>
        <Home />
        <Routes>
          <Route path="" index={true} element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>
);
