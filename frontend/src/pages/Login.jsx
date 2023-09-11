import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carwashId = location.pathname.split('/').pop(); // Extract the car wash ID from the URL
  const { carWashId } = useParams(); // Get the car wash ID from the URL

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const { phone, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://shufti-production.up.railway.app/api/users/${carwashId}/login`, {
        phone,
        password,
      });

      // Process the login response, e.g., store the token
      console.log('customer login successful:', response.data);

      // Redirect to the staff dashboard or any other desired page
      navigate(`/${carWashId}/user/dashboard`);
    } catch (error) {
      console.error('Error logging in as staff:', error);
      toast.error('Login failed');
    }
  };

  return (
    <>
      <section className="heading">
        <h1 style={{ fontSize: '23px', fontWeight: '600', paddingTop: '20px' }} className="login-title">
          LOG IN
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="phone"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Cell Number"
              onChange={onChange}
              autoComplete="yes"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              autoComplete="yes"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              LOG IN
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;


// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { login, reset } from '../features/auth/authSlice';
// import Spinner from '../components/Spinner';

// function Login() {
//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//   });

//   const { phone, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { carWashId } = useParams(); // Get the car wash ID from the URL

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess || user) {
//       const userId = user?.id || ''; // Ensure user.id is defined or set it to an empty string
//       navigate(`/${carWashId}/user/dashboard/${userId}`); // Include the car wash ID in the URL
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch, carWashId]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       phone,
//       password,
//     };

//     dispatch(login(userData));
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//      <section className='heading'>
//         <h1 style={{fontSize: "23px", fontWeight: "600", paddingTop: "20px", paddingBottom: "20px"}} className='login-title'>
//         LOG IN
//         </h1>
       
//       </section>

//       <section className='form'>
//         <form onSubmit={onSubmit}>
//           <div className='form-group'>
//             <input
//               type='phone'
//               className='form-control'
//               id='phone'
//               name='phone'
//               value={phone}
//               placeholder='Cell Number' 
//               onChange={onChange}
//               autoComplete='on'
//             />
//           </div>
//           <div className='form-group'>
//             <input
//               type='password'
//               className='form-control'
//               id='password'
//               name='password'
//               value={password}
//               placeholder='Password'
//               onChange={onChange}
//               autoComplete='on'
//             />
//           </div>

//           <div className='form-group'>
//             <button type='submit' className='btn btn-block'>
//               LOG IN
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }

// export default Login;
