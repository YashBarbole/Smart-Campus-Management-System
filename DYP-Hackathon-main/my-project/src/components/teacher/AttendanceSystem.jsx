import React, { useState } from 'react';
import TeacherAttendance from './Tattendance';
import StudentAttendance from '../student/SAttendance';

const AttendanceSystem = () => {
    const [teacherCode, setTeacherCode] = useState('');

    const handleCodeGenerated = (code) => {
        setTeacherCode(code);
    };

    return (
        <div>
            <TeacherAttendance onCodeGenerated={handleCodeGenerated} />
            <StudentAttendance teacherCode={teacherCode} />
        </div>
    );
};

export default AttendanceSystem;
