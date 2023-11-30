import React, { useState } from 'react';
import './Main.css';

const initialValidationState = {
  teacherName: { isValid: true, errorMessage: '' },
  teacherSubject: { isValid: true, errorMessage: '' },
};

const TeacherScreen = () => {
  const [teachers, setTeachers] = useState([
    { teacherName: 'Mr. Smith', teacherSubject: 'Math' },
    { teacherName: 'Mrs. Johnson', teacherSubject: 'Science' },
    { teacherName: 'Mrs. Surya', teacherSubject: 'Social'}


  ]);

  const [newTeacher, setNewTeacher] = useState({ teacherName: '', teacherSubject: '' });
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [validation, setValidation] = useState(initialValidationState);

  const handleAddTeacher = () => {
    if (handleValidation()) {
      setTeachers([...teachers, { ...newTeacher }]);
      setNewTeacher({ teacherName: '', teacherSubject: '' });
       console.log("Teachers Data After Adding:", teachers);
    }
  };

  const handleEditTeacher = (index) => {
    setSelectedTeacher(index);
    setNewTeacher({ ...teachers[index] });
  };

  const handleUpdateTeacher = () => {
    if (handleValidation()) {
      setTeachers([...teachers.slice(0, selectedTeacher), { ...newTeacher }, ...teachers.slice(selectedTeacher + 1)]);
      setSelectedTeacher(null);
      setNewTeacher({ teacherName: '', teacherSubject: '' });
    }
  };

  const handleDeleteTeacher = (index) => {
    setTeachers([...teachers.slice(0, index), ...teachers.slice(index + 1)]);
  };

  const handleValidation = () => {
    let isValid = true;
    const newValidation = { ...initialValidationState };

    if (!/^[a-zA-Z.\s]+$/.test(newTeacher.teacherName.trim())) {
      newValidation.teacherName = {
        isValid: false,
        errorMessage: 'Teacher name should contain only letters, dots, and spaces',
      };
      isValid = false;
    }

    // Validate teacherSubject
    if (!/^[a-zA-Z\s]+$/.test(newTeacher.teacherSubject.trim())) {
      newValidation.teacherSubject = { isValid: false, errorMessage: 'Teacher subject should contain only letters' };
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  return (
    <div className="container">
      <div className="form-container">
        <h3>Add Teacher</h3>
        <div className='div2'>
          <label>Teacher Name: </label><br />
          <input style={{marginLeft:"10px",height:'20px',borderRadius:"5px"}}
            type="text"
            value={newTeacher.teacherName}
            onChange={(e) => {
              setValidation({ ...validation, teacherName: { isValid: true, errorMessage: '' } });
              setNewTeacher({ ...newTeacher, teacherName: e.target.value });
            }}
          />
          {!validation.teacherName.isValid && <span className="error">{validation.teacherName.errorMessage}</span>}
        </div><br />

        <div className='div2'>
          <label>Teacher Subject: </label><br />
          <input style={{marginLeft:"10px",height:'20px',borderRadius:"5px"}}
            type="text"
            value={newTeacher.teacherSubject}
            onChange={(e) => {
              setValidation({ ...validation, teacherSubject: { isValid: true, errorMessage: '' } });
              setNewTeacher({ ...newTeacher, teacherSubject: e.target.value })
            }}
          />
          {!validation.teacherSubject.isValid && <span className="error">{validation.teacherSubject.errorMessage}</span>}
        </div><br />

        <button onClick={selectedTeacher !== null ? handleUpdateTeacher : handleAddTeacher}>
          {selectedTeacher !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="table-container">
        <h3>List of Teachers</h3>
        <table>
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Teacher Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.teacherName}</td>
                <td>{teacher.teacherSubject}</td>
                <td>
                  <button onClick={() => handleEditTeacher(index)}>Edit</button>
                  <button onClick={() => handleDeleteTeacher(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherScreen;
