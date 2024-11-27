import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClubDetails = () => {
  const [formData, setFormData] = useState({
    clubID: '',
    clubName: '',
    clubDescription: '',
    foundingDate: '',
    facultyAdvisor: '',
    contactEmail: '',
    contactPhoneNo: '',
    clubMembersNo: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/clubdetails', formData); // Update endpoint as necessary
      navigate('/cdashboard'); // Redirect to /cdashboard after successful submission
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting club details');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-200 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add Club Details
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Club ID */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Club ID</label>
            <input
              type="text"
              name="clubID"
              value={formData.clubID}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Club ID"
            />
          </div>

          {/* Club Name */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Club Name</label>
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Club Name"
            />
          </div>

          {/* Club Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Club Description</label>
            <textarea
              name="clubDescription"
              value={formData.clubDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              rows="4"
              placeholder="Describe the club"
            ></textarea>
          </div>

          {/* Founding Date */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Founding Date</label>
            <input
              type="date"
              name="foundingDate"
              value={formData.foundingDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Faculty Advisor */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Faculty Advisor</label>
            <input
              type="text"
              name="facultyAdvisor"
              value={formData.facultyAdvisor}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Faculty Advisor's Name"
            />
          </div>

          {/* Contact Email */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Contact Email"
            />
          </div>

          {/* Contact Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Contact Phone Number</label>
            <input
              type="tel"
              name="contactPhoneNo"
              value={formData.contactPhoneNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Contact Phone Number"
            />
          </div>

          {/* Number of Club Members */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Number of Club Members</label>
            <input
              type="number"
              name="clubMembersNo"
              value={formData.clubMembersNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Number of Members"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Submit Club Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClubDetails;
