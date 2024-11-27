import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  
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

    fetchEvents();
  }, []);

  return (
    <div className="flex h-[200vh] bg-white text-zinc-600">
      {/* Sidebar */}
      <div className={`relative min-h-full ${isOpen ? 'w-80' : 'w-20'} bg-yellow-200 transition-width duration-300`}>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleSidebar} className="text-3xl">
            {isOpen ? '<<' : '>>'}
          </button>
        </div>
        <div className="flex flex-col text-xl items-start p-9 space-y-8 mt-20">
          <Link to="/add-event" className="hover:text-gray-900 flex items-center">
            <span className="text-xl mr-4">🎭</span>
            {isOpen && <span>Add Event</span>}
          </Link>
          <Link to="/add-club-details" className="hover:text-gray-900 flex items-center">
            <span className="text-lg mr-4">📝</span>
            {isOpen && <span>Add Club Details</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Club Dashboard</h1>
        
        {/* Display Upcoming Events */}
        <h2 className='text-2xl font-semibold p-4'>Upcoming Events</h2>
        <div className="flex gap-4 flex-wrap"> {/* Use flex-wrap to display cards continuously */}
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col items-center bg-yellow-200 w-[300px] h-auto text-gray-900 p-8 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{event.clubName}</h2>
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
    </div>
  );
};

export default CDashboard;
