import React, { useEffect, useState } from 'react';

const StudentAttendance = ({ teacherCode }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get user's current location
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                    },
                    (error) => {
                        setError('Unable to retrieve location.');
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };
        getLocation();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the entered code matches the teacher's code
        if (code === teacherCode) {
            if (location) {
                const attendanceData = {
                    name,
                    code,
                    time: new Date().toISOString(),
                    location,
                };

                // Call API to save attendance
                try {
                    const response = await fetch('/gattendance', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(attendanceData),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to submit attendance');
                    }

                    const data = await response.json();
                    alert('Attendance submitted successfully! ID: ' + data.attendanceId);
                    setCode('');
                    setName('');
                } catch (err) {
                    console.error(err);
                    setError('Failed to submit attendance. Please try again.');
                }
            } else {
                setError('Location not available.');
            }
        } else {
            setError('Invalid attendance code. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-300 p-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Student Attendance Page</h1>

            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg"
            >
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full p-2 mb-4 border bg-white border-gray-300 rounded"
                />
                
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter Attendance Code"
                    required
                    className="w-full p-2 mb-4 border bg-white border-gray-300 rounded"
                />
                
                {error && <div className="text-red-600 mb-4">{error}</div>}
                
                <button 
                    type="submit" 
                    className="w-full px-4 py-2 bg-[#00acd6] text-white rounded-lg shadow-md  transition"
                >
                    Submit
                </button>
            </form>

            <div className="mt-4 text-lg text-gray-600 text-center">
                Ensure you are in the correct location while submitting.
            </div>
        </div>
    );
};

export default StudentAttendance;
