import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sdashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [showNotices, setShowNotices] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notice'); // Assuming you have an endpoint for notices
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    if (showEvents) {
      fetchEvents();
    }

    if (showNotices) {
      fetchNotices();
    }
  }, [showEvents, showNotices]);

  const handleEventsClick = () => {
    setShowEvents(true);
    setShowNotices(false); // Disable notices when showing events
  };

  const handleNoticesClick = () => {
    setShowNotices(true);
    setShowEvents(false); // Disable events when showing notices
  };

  return (
    <div className="flex h-screen bg-white text-zinc-600">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-80' : 'w-20'} bg-orange-300 duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-3xl">
            {isOpen ? '<<' : '>>'}
          </button>
        </div>
        <div className="flex flex-col text-xl items-start p-9 space-y-8 mt-20">
          <div onClick={handleNoticesClick} className="hover:text-gray-900 flex items-center cursor-pointer font-bold">
            <span className="text-xl mr-4">📝</span>
            {isOpen && <span>Notices</span>}
          </div>
          <Link to="/ttimetable" className="hover:text-gray-900 flex items-center font-bold">
            <span className="text-xl mr-4">🗓️</span>
            {isOpen && <span>Timetable</span>}
          </Link>
          <Link to="/sattendance" className="hover:text-gray-900 flex items-center font-bold">
            <span className="text-xl mr-4">✅</span>
            {isOpen && <span>Attendance</span>}
          </Link>
          <div onClick={handleEventsClick} className="hover:text-gray-900 flex items-center cursor-pointer font-bold">
            <span className="text-xl mr-4">🎭</span>
            {isOpen && <span>Events</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

        {/* Display Notices */}
        {showNotices && (
          <div>
            <h1 className='text-2xl font-semibold p-4'>Notices</h1>
            <div className="flex gap-4">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  className="flex flex-col items-center bg-orange-200 w-[300px] h-auto text-gray-900 p-8 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-105"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">{notice.subject}</h2>
                  <p className="text-lg text-gray-600">{notice.noticeDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Events */}
        {showEvents && (
          <div>
            <h1 className='text-2xl font-semibold p-4'>Upcoming Events</h1>
            <div className="flex gap-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col items-center bg-orange-300 w-[300px] h-auto text-gray-900 p-8 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-105"
                >
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">{event.clubName}</h2>
                  <div className="w-full h-full flex flex-col items-start gap-2 text-lg text-gray-600">
                    <p><span className="font-bold">Name: </span> {event.eventName}</p>
                    <p><span className="font-bold">Description: </span>{event.eventDescription}</p>
                    <p><span className="font-bold">Date: </span>{event.eventDate}</p>
                    <p><span className="font-bold">Time: </span>{event.eventTime}</p>
                    <p><span className="font-bold">Venue: </span>{event.eventVenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sdashboard;
