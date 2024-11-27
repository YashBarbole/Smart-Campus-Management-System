import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    clubID: '',
    clubName: '',
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventTime: '',
    eventVenue: '',
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
      await axios.post('http://localhost:3000/events', formData);
      navigate('/cdashboard'); // Redirect to /cdashboard after successful submission
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting event');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-yellow-200" >
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add New Event
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
            <label className="block bg-white text-gray-700 font-semibold mb-2">Club Name</label>
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Club Name"
            />
          </div>

          {/* Event Name */}
          <div className="mb-6">
            <label className="block bg-white text-gray-700 font-semibold mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Event Name"
            />
          </div>

          {/* Event Description */}
          <div className="mb-6">
            <label className="block text-gray-700  bg-white font-semibold mb-2">Event Description</label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border  bg-white  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              rows="4"
              placeholder="Describe the event"
            ></textarea>
          </div>

          {/* Event Date */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 bg-white">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Event Time */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 bg-white ">Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Event Venue */}
          <div className="mb-6 ">
            <label className="block text-gray-700 font-semibold mb-2 bg-white ">Event Venue</label>
            <input
              type="text"
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Venue"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;