import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Adashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-white text-zinc-600">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-80' : 'w-20'} bg-blue-300 duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-3xl">
            {isOpen ? '<<' : '>>'} {/* Simple text for toggle */}
          </button>
        </div>
        <div className="flex flex-col text-xl items-start p-9 space-y-8 mt-20">
          <Link to="/sregister" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4 ">👤</span>
            {isOpen && <span>Register Student</span>}
          </Link>
          <Link to="/tregister" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">👨‍🏫</span>
            {isOpen && <span>Register Teacher</span>}
          </Link>
          <Link to="/cregister" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">🏢</span>
            {isOpen && <span>Register Club</span>}
          </Link>
          <Link to="/anotice" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">📜</span>
            {isOpen && <span>Display Notice</span>}
          </Link>
          <Link to="/timetable" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">📅</span>
            {isOpen && <span>Timetable</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Adashboard;
