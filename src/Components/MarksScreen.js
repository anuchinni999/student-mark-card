

import React, { useState, useEffect } from 'react';
import './Main.css';

const MarksScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    
    const dummyData = [
      { name: 'Anu', class: '10A', age: '20', studentId: '1', teacher: 'Mr. Smith', subject: 'Math', marks: 95 },
      { name: 'Ramya', class: '10B', age: '20', studentId: '2', teacher: 'Mrs. Johnson', subject: 'Science', marks: 89 },
      { name: 'Asha', class: '10B', age: '20', studentId: '3', teacher: 'Mrs. Surya', subject: 'Social', marks: 89 },

    ];

    setStudents(dummyData);
  }, []);

  const handleSelectStudent = (studentId) => {
    const selected = students.find((student) => student.studentId === studentId);
    setSelectedStudent(selected);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Marks Screen</h2>
        <label htmlFor="search">Search Student:</label>
        <select style={{marginLeft:"10px",height:'25px',borderRadius:"5px"}}
          id="search"
          onChange={(e) => handleSelectStudent(e.target.value)}
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.studentId} value={student.studentId}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <div className="form-container">
          <h3>Selected Student Details</h3>
          <p>Student ID: {selectedStudent.studentId}</p>
          <p>Age: {selectedStudent.age}</p>
          <p>Name: {selectedStudent.name}</p>
          <p>Class: {selectedStudent.class}</p>
          <p>Teacher: {selectedStudent.teacher}</p>
          <p>Subject: {selectedStudent.subject}</p>
          <p>Marks: {selectedStudent.marks}</p>
        </div>
      )}
    </div>
  );
};

export default MarksScreen;
