import React, { useEffect, useState } from 'react';

// Function to generate a random alphanumeric code
const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const TeacherAttendance = () => {
    const [code, setCode] = useState(generateRandomCode());
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimeOver, setIsTimeOver] = useState(false);

    // Timer effect
    useEffect(() => {
        if (timeLeft === 0) {
            setIsTimeOver(true);
            setCode(''); // Hide the code
        } else {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    // Reset function to be called when necessary
    const resetAttendance = () => {
        setCode(generateRandomCode());
        setTimeLeft(30);
        setIsTimeOver(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300 p-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Teacher Attendance Page</h1>
            
            <div className="flex flex-col items-center mb-6 bg-white p-8 rounded-lg shadow-lg">
                {!isTimeOver && (
                    <>
                        <div className="text-8xl font-extrabold text-blue-600 mb-4">
                            {code}
                        </div>
                        <div className="flex items-center justify-center bg-red-500 rounded-full w-20 h-20 shadow-md animate-pulse">
                            <div className="text-4xl font-semibold text-white">
                                {timeLeft}
                            </div>
                        </div>
                    </>
                )}
                {isTimeOver && (
                    <div className="text-xl font-semibold text-red-600 mt-4">
                        Time Over!
                    </div>
                )}
            </div>

            <p className="mt-4 text-lg text-gray-600 text-center">
                Ask students to enter the displayed code in their phones to mark their attendance.
            </p>

            {isTimeOver && (
                <button 
                    onClick={resetAttendance} 
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                >
                    Reset Attendance
                </button>
            )}
        </div>
    );
};

export default TeacherAttendance;

