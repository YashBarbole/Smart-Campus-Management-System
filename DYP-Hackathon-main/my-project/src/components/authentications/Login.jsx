import React from "react";
import logo from "../../Assets/logo.png";
import image from '../../Assets/institute-of-engineering-and-technology.jpg';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate('/alogin');
  }

  const handleTeacher = () => {
    navigate('/tlogin');
  }

  const handleStudent = () => {
    navigate('/slogin');
  }

  const handleClub = () => {
    navigate('/clogin');
  }

  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }} // Background image
      />

      {/* Overlay with less opacity */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Centered Content Div */}
      <div className="relative z-10 flex items-center justify-center h-full w-[90%] md:w-[80%] lg:w-[60%]">
        <div className="bg-white p-8 rounded-3xl text-center flex items-center shadow-2xl transition-transform transform hover:scale-105 duration-300">
          {/* Left Section with Logo */}
          <div className="flex flex-col items-center w-1/2 h-full pr-6">
            <img src={logo} alt="Logo" className="w-36 mb-4 transition-transform duration-300 hover:scale-110" />
            <h1 className="text-red-700 text-lg font-bold">
              Dr. D. Y. Patil Unitech Society's
              <br />
              Dr. D. Y. Patil Institute of Technology
            </h1>
            <h2 className="text-[#00ACD6] text-sm p-4 pt-6">
              Accredited by NAAC with a CGPA of 3.74 on a four-point scale at 'A++' Grade
            </h2>
          </div>

          {/* Button Group */}
          <div className="flex flex-col items-center space-y-6 border-l-4 border-gray-300 pl-10 justify-center w-1/2 h-full">
            <h1 className="font-bold text-3xl text-zinc-500">Sign In</h1>
            <button
              onClick={handleAdmin}
              className="w-full bg-[#00ACD6] text-white p-3 rounded-lg shadow-md hover:bg-[#008CBB] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Admin
            </button>
            <button
              onClick={handleTeacher}
              className="w-full bg-[#00ACD6] text-white p-3 rounded-lg shadow-md hover:bg-[#008CBB] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Teacher
            </button>
            <button
              onClick={handleStudent}
              className="w-full bg-[#00ACD6] text-white p-3 rounded-lg shadow-md hover:bg-[#008CBB] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Student
            </button>
            <button
              onClick={handleClub}
              className="w-full bg-[#00ACD6] text-white p-3 rounded-lg shadow-md hover:bg-[#008CBB] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Club
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;