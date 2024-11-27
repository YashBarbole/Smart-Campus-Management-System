import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import club from "../../Assets/club2.jpg"

const Cregistration = () => {
  const [clubName, setName] = useState("");
  const [clubID, setClubID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/clubregisterdb", { clubName, clubID, password })
      .then((result) => {
        console.log(result);
        navigate("/adashboard");
      })
      .catch((err) => {
        console.log(err);
        setError("Registration failed. Please try again.");
      });
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 absolute inset-0 bg-cover bg-center"  style={{ backgroundImage: `url(${club})` }}>
       <div className="absolute z-40 inset-0 bg-black opacity-50" />
      <div className="bg-white z-50 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-3xl font-semibold mb-4 text-center text-zinc-600">Register Club</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name of Club"
              className="w-full  bg-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="clubID"
              placeholder="Create ID"
              className="w-full p-2 border bg-white  border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setClubID(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Set Password"
              className="w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#00ACD6] text-white rounded-md hover:bg-[#329db7] transition duration-200"
          >
            Add Club
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Cregistration;
