import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [carWash, setCarWash] = useState(null);
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [staffphone, setStaffphone] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  useEffect(() => {
    // Fetch car wash data using the `id` parameter
    fetchCarWashData(id);
  }, [id]);

  const fetchCarWashData = async (carWashId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/carwashes/${carWashId}`);
      // Process the response data
      setCarWash(response.data);
    } catch (error) {
      console.error('Error fetching car wash data:', error);
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/login`, {
        phone: userPhone,
        password: userPassword,
      });
      // Process the login response, e.g., store the token
      console.log('User login successful:', response.data);
  
      const userId = response.data._id; // Retrieve the user ID from the response
      // Redirect to the user dashboard or any other desired page
      navigate(`/user/dashboard/${userId}`);
    } catch (error) {
      console.error('Error logging in as user:', error);
    }
  };
  
  const handleStaffLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/staff/${id}/login`, {
        phone: staffphone,
        password: staffPassword,
      });
      // Process the login response, e.g., store the token
      console.log('Staff login successful:', response.data);
  
      // Retrieve the car wash ID from the response or use the 'id' variable from useParams()
      const carwashId = response.data.carwashId || id;
  
      // Redirect to the staff dashboard or any other desired page
      navigate(`/staff/dashboard/${carwashId}`);
    } catch (error) {
      console.error('Error logging in as staff:', error);
    }
  };
  

  return (
    <div>
      <h1>Dashboard</h1>
      {carWash && (
        <div>
          <h2>Car Wash: {carWash.name}</h2>
          <p>Location: {carWash.location}</p>
        </div>
      )}

      <h3>User Login</h3>
      <form onSubmit={handleUserLogin}>
        <label htmlFor="userPhone">Phone:</label>
        <input
          type="text"
          id="userPhone"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
        />
        <label htmlFor="userPassword">Password:</label>
        <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button type="submit">Login as User</button>
      </form>

      <h3>Staff Login</h3>
      <form onSubmit={handleStaffLogin}>
        <label htmlFor="staffphone">Phone:</label>
        <input
          type="text"
          id="staffphone"
          value={staffphone}
          onChange={(e) => setStaffphone(e.target.value)}
        />
        <label htmlFor="staffPassword">Password:</label>
        <input
          type="password"
          id="staffPassword"
          value={staffPassword}
          onChange={(e) => setStaffPassword(e.target.value)}
        />
        <button type="submit">Login as Staff</button>
      </form>
    </div>
  );
};

export default Dashboard;
