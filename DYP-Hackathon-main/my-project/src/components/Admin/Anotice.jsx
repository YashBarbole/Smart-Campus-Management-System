import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Addnotice = () => {
  const [formData, setFormData] = useState({
    subject: '',
    noticeDescription: '',  // Changed to match the textarea input
    noticeDate: '',         // Make sure the state key matches the input name
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
      await axios.post('http://localhost:3000/notice', formData);
      navigate('/adashboard');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting event');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add Notice
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Notice Subject */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Notice Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter Notice Subject"
            />
          </div>

          {/* Notice Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Notice Description</label>
            <textarea
              name="noticeDescription"  // Correct the name attribute
              value={formData.noticeDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              rows="4"
              placeholder="Describe the notice"
            ></textarea>
          </div>

          {/* Notice Date */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Notice Date</label>
            <input
              type="date"
              name="noticeDate"  // Correct the name attribute
              value={formData.noticeDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Submit Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnotice;
