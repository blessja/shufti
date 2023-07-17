// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Grid from '@material-ui/core/Grid';
// import LoginModal from '../components/LoginModal';
// import { useSelector } from 'react-redux';

// const Dashboard = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); 
//   const [carWash, setCarWash] = useState(null);
//   const [userPhone, setUserPhone] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [staffphone, setStaffphone] = useState('');
//   const [staffPassword, setStaffPassword] = useState('');
//   const [isShowLogin, setIsShowLogin] = useState(true);
//   const { user } = useSelector((state) => state.auth);
//   const { staff } = useSelector((state) => state.staff);


//   useEffect(() => {
//     // Fetch car wash data using the `id` parameter
//     fetchCarWashData(id);
//   }, [id]);
//   useEffect(() => {
//     if (!user || !staff) {
//       navigate(`/:carwash_id/dashboard`);
//     }
//   }, [user, staff, navigate]);


//   const handleClick = () => {
//     handleLoginClick();
//   };

//   const handleLoginClick = () => {
//     setIsShowLogin((isShowLogin) => !isShowLogin);
//   };

//   const fetchCarWashData = async (carWashId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/carwashes/${carWashId}`);
//       // Process the response data
//       setCarWash(response.data);
//     } catch (error) {
//       console.error('Error fetching car wash data:', error);
//     }
//   };

//   const handleUserLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:5000/api/users/login`, {
//         phone: userPhone,
//         password: userPassword,
//       });
//       // Process the login response, e.g., store the token
//       console.log('User login successful:', response.data);
  
//       const userId = response.data._id; // Retrieve the user ID from the response
//       // Redirect to the user dashboard or any other desired page
//       navigate(`/user/dashboard/${userId}`);
//     } catch (error) {
//       console.error('Error logging in as user:', error);
//     }
//   };
  
//   const handleStaffLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:5000/api/staff/${id}/login`, {
//         phone: staffphone,
//         password: staffPassword,
//       });
//       // Process the login response, e.g., store the token
//       console.log('Staff login successful:', response.data);
  
//       // Retrieve the car wash ID from the response or use the 'id' variable from useParams()
//       const carwashId = response.data.carwashId || id;
  
//       // Redirect to the staff dashboard or any other desired page
//       navigate(`/staff/dashboard/${carwashId}`);
//     } catch (error) {
//       console.error('Error logging in as staff:', error);
//     }
//   };
  

//   return (
//     <>
//       <section className='heading'>
//         <h2 className='dis-h2' style={{ color: '#4682B4',  }}>DISCOUNTS AWAIT</h2>
//         <p className='cta-p'>Wash 5 times and get 1 wash FREE!</p>
//         <button
//           style={{
//             display: 'inline-block',
//             padding: '10px 20px',
//             background: '#4682B4',
//             color: 'white',
//             fontWeight: 'bold',
//             borderRadius: '15px',
//             textDecoration: 'none',
//             marginTop: '20px',
//             marginBottom: '20px',
//             border: 'none',
//             cursor: 'pointer',
//             opacity: '1',
//           }}
//           onClick={handleClick}
//         >
//           GET STARTED
//         </button>
       
        
//       </section>
//       < LoginModal isShowLogin={isShowLogin}/>
//       <section>
//         <div className="price-list">
//           <h5 className='price-list-heading'>PRICE LIST</h5>
//           <div className="type-1">
//             <p style={{ color: '#4682B4', fontWeight: 'bold' }}>Car/Bakkie</p>&emsp;&emsp;
//             <p style={{ wordWrap: 'break-word', color: '#4682B4', fontWeight: 'bold' }}>Minibus/4x4/ <br /> Double Cab</p>
//           </div>

//           <ListItem className='list-items'>
//             <Grid container alignItems="center" spacing={1}>
//               <Grid item xs={4}>
//                 <ListItemText primary="Wash & Go" />
//               </Grid>
//               <Grid item xs={3}>
//                 <ListItemText primary="R 45" />
//               </Grid>
//               <Grid item xs={4}>
//                 <ListItemText primary="R 50" align="right" />
//               </Grid>


//               <Grid item xs={4}>
//                 <ListItemText primary="Wash & Dry" />
//               </Grid>
//               <Grid item xs={3}>
//                 <ListItemText primary="R 70" />
//               </Grid>
//               <Grid item xs={4}>
//                 <ListItemText primary="R 90" align="right" />
//               </Grid>
//             </Grid>
//           </ListItem>
//         </div>
//       </section>
//     </>
//   );
// }
// export default Dashboard;







import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import LoginModal from '../components/LoginModal';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [carWash, setCarWash] = useState(null);

  const handleClick = () => {
    handleLoginClick();
  };

  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };
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



  return (
    <>
      <section className='heading'>
        <h2 className='dis-h2' style={{ color: '#4682B4',  }}>DISCOUNTS AWAIT</h2>
        <p className='cta-p'>Wash 5 times and get 1 wash FREE!</p>
        <button
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#4682B4',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '15px',
            textDecoration: 'none',
            marginTop: '20px',
            marginBottom: '20px',
            border: 'none',
            cursor: 'pointer',
            opacity: '1',
          }}
          onClick={handleClick}
        >
          GET STARTED
        </button>
       
        
      </section>
      <LoginModal isShowLogin={isShowLogin} carwashId={id} />

      <section>
        <div className="price-list">
          <h5 className='price-list-heading'>PRICE LIST</h5>
          <div className="type-1">
            <p style={{ color: '#4682B4', fontWeight: 'bold' }}>Car/Bakkie</p>&emsp;&emsp;
            <p style={{ wordWrap: 'break-word', color: '#4682B4', fontWeight: 'bold' }}>Minibus/4x4/ <br /> Double Cab</p>
          </div>

          <ListItem className='list-items'>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4}>
                <ListItemText primary="Wash & Go" />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary="R 45" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="R 50" align="right" />
              </Grid>


              <Grid item xs={4}>
                <ListItemText primary="Wash & Dry" />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary="R 70" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="R 90" align="right" />
              </Grid>
            </Grid>
          </ListItem>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
