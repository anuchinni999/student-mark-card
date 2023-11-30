import React from 'react';
import StudentScreen from './Components/StudentScreen';
import TeacherScreen from './Components/TeacherScreen';
import MarksScreen from './Components/MarksScreen';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
import './App.css';


const App = () => {
  return (
    <Router>

      <div className="div1">

      <nav className="navbar">
        <div className="navbar-container container">
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
            <ul className="menu-items">
            <li>
              <Link to="/">Students</Link>
            </li>
            <li>
              <Link to="/teachers">Teachers</Link>
            </li>
            <li>
              <Link to="/marks">Marks</Link>
            </li>
            </ul>
            <h1 className="logo">Student Marks card</h1>
        </div>
    </nav>

        <Routes>
          <Route path="" element={<StudentScreen />} />
          <Route path="/teachers" element={<TeacherScreen />} />
          <Route path="/marks" element={<MarksScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
