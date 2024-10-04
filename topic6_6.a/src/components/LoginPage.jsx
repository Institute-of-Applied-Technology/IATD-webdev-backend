import './css/LoginPage.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function LoginPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const handleButtonClick = (identifier) => {
    navigate(`/main?button=${identifier}`);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        console.log(response);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);
  return (
    <div>
      <div className='app-header'> IATD Student Expense Tracker</div>
      <fieldset className="login-fieldset">
        <legend className="login-title">Login</legend>
        <div className='login-header'>Click on the User Name button to login as that user</div>
        <div className="login-container">
          {students.map((student, index) => (
            <div className="app-buttons text-center" key={student._id}>
              <button className="btn btn-primary app-button-hover-effect" onClick={() => handleButtonClick(student._id)}>
                <span className="visually-hidden">{student.name}</span>
              </button>
            </div>
          ))}
        </div>

      </fieldset>
    </div>
  );
}

export default LoginPage;