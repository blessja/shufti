import React, { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CircularProgress } from '@material-ui/core';
import { logout, reset } from '../features/auth/authSlice';
import axios from 'axios';



function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [washHistory, setWashHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the drawer
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId  } = useParams();

    useEffect(() => {
    // Fetch user data using the `id` parameter
    fetchUserData(userId);
  }, [userId]);


  // useEffect(() => {
  //   if (!user) {
  //     // If the user is not logged in, redirect them to the login page
  //     navigate.push('/login');
  //   } else {
  //     // Fetch user information and wash history from the server
  //     fetchUserData(user._id); // Assuming the user object has an _id property
  //   }
  // }, [user, navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const data = response.data;
  
      if (response.status === 200) {
        setUserInfo(data);
        setWashHistory(data.washHistory.length > 0 ? data.washHistory : []);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching user data.');
      console.log('Error:', error.message);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getNextWashNumber = () => {
    const lastWashNumber = washHistory.length;
    return lastWashNumber + 1;
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/dashboard');

  };


  return (
    <Container maxWidth="sm">
      {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', color: '#4682B4' }}>
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" style={{ marginLeft: '8px' }}>
          Profile Info
        </Typography>
      </div> */}
      {/* Drawer component */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {/* Drawer content */}
        <div style={{ width: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to={`/profile/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>

      {userInfo ? (
        <div>

          <Typography variant="h5" gutterBottom style={{ color: '#4682B4', marginTop: '30px', marginBottom: '60px' }}>
            UPCOMING DISCOUNTS
          </Typography>


          {washHistory.length > 0 ? (
            <List>
              {washHistory.map((wash, index) => (
                <ListItem key={wash._id} style={{ color: '#12F329' }} >
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={6}>
                      <ListItemText primary={formatDate(wash.date)} />
                    </Grid>
                    <Grid item xs={2}>
                      <div style={{ position: 'relative', display: 'inline-block', backgroundColor: '#12F329', borderRadius: '50%', width: '40px', height: '40px', }}>
                        {/* <CircularProgress
                             variant="determinate"
                             value={100}
                             size={30}
                             thickness={5}
                             color='#12F329'
                             backgroundColor='#12F329'
                           /> */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', backgroundColor: '#12F329', transform: 'translate(-50%, -50%)' }}>
                          <span style={{ fontWeight: 'bold', backgroundColor: '#12F329', color: 'white' }}>{index + 1}</span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary="WASHED" align="right" />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No wash history available.</Typography>
          )}
          {/* <Link to="/update-profile">Update Profile</Link> */}
        </div>
      ) : (
        <Typography variant="body1">{error ? error : 'Loading user information...'}</Typography>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <button className='btn' onClick={onLogout}>
          EXIT
        </button>
      </div>

    </Container>
  );
}

export default UserDashboard;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const UserDashboard = () => {
//   const { id } = useParams();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Fetch user data using the `id` parameter
//     fetchUserData(id);
//   }, [id]);

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
//       // Process the response data
//       setUserData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       {userData && (
//         <div>
//           <h2>User: {userData.name}</h2>
//           <p>Email: {userData.email}</p>
//           {/* Display other user-related information */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;

