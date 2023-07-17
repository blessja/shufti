import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { logout, reset } from '../features/auth/authSlice';



function UserDashboard() {
  const {carWashId} = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [washHistory, setWashHistory] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!user) {
      // If the user is not logged in, redirect them to the login page
      navigate(`/${carWashId}/dashboard`);
    } else {
      // Fetch user information and wash history from the server
      fetchUserData(user._id); // Assuming the user object has an _id property
    }
  }, [user, navigate]);
  
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      const data = await response.json();

      // console.log('Response:', data);

      if (response.ok) {
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
    navigate(`/${carWashId}/dashboard`);

  };


  return (
    <Container maxWidth="sm">


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
        
        </div>
      ) : (
        <Typography variant="body1">{error ? error : 'Loading user information...'}</Typography>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginLeft: "40px" }}>
        <button className='btn' onClick={onLogout}>
          EXIT
        </button>
      </div>

    </Container>
  );
}

export default UserDashboard;








// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Grid from '@material-ui/core/Grid';
// import { logout, reset } from '../features/auth/authSlice';



// function UserDashboard() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [washHistory, setWashHistory] = useState([]);
//   const [error, setError] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the drawer
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   useEffect(() => {
//     if (!user) {
//       // If the user is not logged in, redirect them to the login page
//       navigate.push('/login');
//     } else {
//       // Fetch user information and wash history from the server
//       fetchUserData(user._id); // Assuming the user object has an _id property
//     }
//   }, [user, navigate]);

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await fetch(`https://vast-spire-19892-363405976c22.herokuapp.com/api/users/${userId}`);
//       const data = await response.json();

//       // console.log('Response:', data);

//       if (response.ok) {
//         setUserInfo(data);
//         setWashHistory(data.washHistory.length > 0 ? data.washHistory : []);
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('Error fetching user data.');
//       console.log('Error:', error.message);
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getNextWashNumber = () => {
//     const lastWashNumber = washHistory.length;
//     return lastWashNumber + 1;
//   };

//   const onLogout = () => {
//     dispatch(logout());
//     dispatch(reset());
//     navigate('/dashboard');

//   };


//   return (
//     <Container maxWidth="sm">
//       {userInfo ? (
//         <div>

//           <Typography variant="h5" gutterBottom style={{ color: '#4682B4', marginTop: '30px', marginBottom: '60px' }}>
//             UPCOMING DISCOUNTS
//           </Typography>

//           {washHistory.length > 0 ? (
//   <List>

    
//     {washHistory.map((wash, index) => (
//       <React.Fragment key={wash._id}>
//         <ListItem style={{ color: '#12F329' }}>
//           <Grid container alignItems="center" spacing={0}>
//             <Grid item xs={6}>
//               <ListItemText primary={formatDate(wash.date)} />
//             </Grid>
//             <Grid item xs={2}>
//               <div style={{ position: 'relative', display: 'inline-block', backgroundColor: '#12F329', borderRadius: '50%', width: '40px', height: '40px' }}>
//                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                   <span style={{ fontWeight: 'bold', backgroundColor: '#12F329', color: 'white' }}>{index + 1}</span>
//                 </div>
//               </div>
//             </Grid>
//             <Grid item xs={4}>
//               <ListItemText primary="WASHED" align="right" />
//             </Grid>
//           </Grid>
//         </ListItem>
//        
//             <ListItem style={{ color: '#4682B4' }}>
//               <Grid container alignItems="center" spacing={0}>
//                 <Grid item xs={6}>
//                   <ListItemText style={{color: "gray"}} primary="FREE WASH" />
//                 </Grid>
//                 <Grid item xs={2}>
//                 <div style={{ position: 'relative', display: 'inline-block', backgroundColor: 'gray', borderRadius: '50%', width: '40px', height: '40px' }}>
//                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                   <span style={{ fontWeight: 'bold', backgroundColor: 'gray', color: 'white' }}>{5}</span>
//                 </div>
//               </div>
//                   {/* <ListItemText primary={5} /> */}
//                 </Grid>
//                 <Grid item xs={4}>
//                   <ListItemText style={{color: "gray"}} primary="100%" align="right" />
//                 </Grid>
//               </Grid>
//             </ListItem>
//           </React.Fragment>
//         )}
//       </React.Fragment>
//     ))}
//   </List>
// ) : (
//   <Typography variant="body1">No wash history available.</Typography>
// )}

//         </div>
//       ) : (
//         <Typography variant="body1">{error ? error : 'Loading user information...'}</Typography>
//       )}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginLeft: "40px" }}>
//         <button className='btn' onClick={onLogout}>
//           EXIT
//         </button>
//       </div>

//     </Container>
//   );
// }

// export default UserDashboard;