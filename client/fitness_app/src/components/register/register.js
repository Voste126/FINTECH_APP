import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a JSON object with the user registration data
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    // Send a POST request to your Flask backend to register the user
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or show a success message
         setFormData({ username: '', password: '' });
         alert("User registered successfully")
         setTimeout(() => {
            navigate('/login');
          }, 1000); 


        // Assuming your Flask backend returns an access token for the registered user
        const accessToken = data.access_token;

        // Save the access token to localStorage or state
        localStorage.setItem('access_token', accessToken);

        // Redirect to the home page or any other desired location
        navigate('/home');
      })
      .catch((error) => {
        // Handle registration error, e.g., show an error message
        console.error('Registration failed:', error);
      });
  };

  return (
    <div>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-input">
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="register-button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
