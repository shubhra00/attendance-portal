import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [toast, setToast] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const addToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onLogout={handleLogout} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Layout;
