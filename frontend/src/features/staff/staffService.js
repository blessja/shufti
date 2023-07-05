import axios from 'axios'

const API_URL = '/api/staff/'

// Register staff
const register = async (staffData) => {
  const response = await axios.post(API_URL, staffData);

  if (response.data) {
    localStorage.setItem('staff', JSON.stringify(response.data))
  }

  return response.data
}

// Login staff
const login = async (staffData) => {
  const response = await axios.post(API_URL + 'login', staffData)

  if (response.data) {
    localStorage.setItem('staff', JSON.stringify(response.data))
  }

  return response.data
}

// Logout staff
const logoutStaff = () => {
  localStorage.removeItem('staff')
}

const staffService = {
  register,
  logoutStaff,
  login,
}

export default staffService
