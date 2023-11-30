import React, { useState } from 'react';
import './Main.css';

const initialValidationState = {
  name: { isValid: true, errorMessage: '' },
  age: { isValid: true, errorMessage: '' },
  marks: { isValid: true, errorMessage: '' },
  class: { isValid: true, errorMessage: '' },
  studentId: { isValid: true, errorMessage: '' }
};

const StudentScreen = () => {
  const [students, setStudents] = useState([
    { name: 'Anu', class: '10A', age: '20', studentId: '1', teacher: 'Mr. Smith', subject: 'Math', marks: 95 },
    { name: 'Ramya', class: '10B', age: '20', studentId: '2', teacher: 'Mrs. Johnson', subject: 'Science', marks: 89 },
    { name: 'Asha', class: '10B', age: '20', studentId: '3', teacher: 'Mrs. Surya', subject: 'Social', marks: 89 },
  ]);

  const [newStudent, setNewStudent] = useState({ name: '', age: '', marks: '', class: '', studentId: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [validation, setValidation] = useState(initialValidationState);

  const handleAddStudent = () => {
    if (handleValidation()) {
      setStudents([...students, { ...newStudent }]);
      setNewStudent({ name: '', age: '', marks: '', class: '', studentId: '' });
    }
    console.log("Students Data After Adding:", students);
  };

  const handleEditStudent = (index) => {
    setSelectedStudent(index);
    setNewStudent({ ...students[index] });
  };

  const handleUpdateStudent = () => {
    if (handleValidation()) {
      setStudents([...students.slice(0, selectedStudent), { ...newStudent }, ...students.slice(selectedStudent + 1)]);
      setSelectedStudent(null);
      setNewStudent({ name: '', age: '', marks: '', class: '', studentId: '' });
      console.log("Students Data After Updating:", students);
    }
  };

  const handleDeleteStudent = (index) => {
    setStudents([...students.slice(0, index), ...students.slice(index + 1)]);
    console.log("Students Data After Deleting:", students);
  };

  const handleValidation = () => {
    let isValid = true;
    const newValidation = { ...initialValidationState };

    // Validate Name
    if (!/^[a-zA-Z]+$/.test(newStudent.name.trim())) {
      newValidation.name = { isValid: false, errorMessage: 'Name should contain only letters' };
      isValid = false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(newStudent.class.trim())) {
      newValidation.class = { isValid: false, errorMessage: 'Class should contain only letters and numbers' };
      isValid = false;
    }

    // Validate Age
    const ageValue = parseInt(newStudent.age, 10);
    if (isNaN(ageValue) || ageValue <= 0) {
      newValidation.age = { isValid: false, errorMessage: 'Age must be a positive number' };
      isValid = false;
    }

    // Validate studentId
    const studentIdValue = newStudent.studentId.trim();
    if (!studentIdValue) {
      newValidation.studentId = { isValid: false, errorMessage: 'Student ID cannot be empty' };
      isValid = false;
    }

    // Validate marks
    const marksValue = parseInt(newStudent.marks, 10);
    if (isNaN(marksValue) || marksValue < 0 || marksValue > 100) {
      newValidation.marks = { isValid: false, errorMessage: 'Marks must be between 0 and 100' };
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  return (
    <div className="container">
      <div className="form-container">
        <h3>Add Student</h3>
        <div className='div2'>
          <label>Name: </label><br />
          <input style={{ marginLeft: "10px", height: '20px', borderRadius: "5px" }}
            type="text"
            value={newStudent.name}
            onChange={(e) => {
              setValidation({ ...validation, name: { isValid: true, errorMessage: '' } });
              setNewStudent({ ...newStudent, name: e.target.value });
            }}
          />
          {!validation.name.isValid && <span className="error">{validation.name.errorMessage}</span>}
        </div><br />

        <div className='div2'>
          <label>Class: </label><br />
          <input style={{ marginLeft: "10px", height: '20px', borderRadius: "5px" }}
            type="text"
            value={newStudent.class}
            onChange={(e) => {
              setValidation({ ...validation, class: { isValid: true, errorMessage: '' } });
              setNewStudent({ ...newStudent, class: e.target.value });
            }}
          />
          {!validation.class.isValid && <span className="error">{validation.class.errorMessage}</span>}
        </div><br />

        <div className='div2'>
          <label>Age:</label><br />
          <input style={{ marginLeft: "10px", height: '20px', borderRadius: "5px" }}
            type="text"
            value={newStudent.age}
            onChange={(e) =>
            {
              setValidation({ ...validation, age: { isValid: true, errorMessage: '' } });
              setNewStudent({ ...newStudent, age: e.target.value })
            }
            }
          />
          {!validation.age.isValid && <span className="error">{validation.age.errorMessage}</span>}
        </div><br />


        <div className='div2'>
          <label>Student Id:</label><br />
          <input style={{ marginLeft: "10px", height: '20px', borderRadius: "5px" }}
            type="text"
            value={newStudent.studentId}
            onChange={(e) =>
            {
              setValidation({ ...validation, studentId: { isValid: true, errorMessage: '' } });
              setNewStudent({ ...newStudent, studentId: e.target.value })
            }
            }
          />
          {!validation.studentId.isValid && <span className="error">{validation.studentId.errorMessage}</span>}
        </div><br />

        <div className='div2'>
          <label>Marks: </label><br />
          <input style={{ marginLeft: "10px", height: '20px', borderRadius: "5px" }}
            type="text"
            value={newStudent.marks}
            onChange={(e) => {
              setValidation({ ...validation, marks: { isValid: true, errorMessage: '' } });
              setNewStudent({ ...newStudent, marks: e.target.value });
            }
            }
          />
          {!validation.marks.isValid && <span className="error">{validation.marks.errorMessage}</span>}
        </div><br />

        <button onClick={selectedStudent !== null ? handleUpdateStudent : handleAddStudent}>
          {selectedStudent !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="table-container">
        <h3>List of Students</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Age</th>
              <th>Student Id</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.age}</td>
                <td>{student.studentId}</td>
                <td>{student.marks}</td>

                <td>
                  <button onClick={() => handleEditStudent(index)}>Edit</button>
                  <button onClick={() => handleDeleteStudent(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br />


    </div>
  );
};

export default StudentScreen;
