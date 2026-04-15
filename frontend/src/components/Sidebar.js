import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h2>
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => navigate('/timesheet')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl text-slate-700 hover:bg-slate-100 hover:shadow-md transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-2zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-2zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-2z" clipRule="evenodd" />
            </svg>
            <span>Timesheet</span>
          </button>
          <button 
            onClick={() => navigate('/leave')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl text-slate-700 hover:bg-slate-100 hover:shadow-md transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7H5V5z" clipRule="evenodd" />
            </svg>
            <span>Leave</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
