import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import UserCard from './UserCard';
import axios from 'axios';


const StaffDashboard = () => {
  const [users, setUsers] = useState([]);
  const { carwash_id } = useParams(); // Get the carwashId from the URL params


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/carwashes/${carwash_id}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <div className="hd">
        <h2 className='stdb' style={{color: '#4682B4', paddingBottom: '20px'}}>DASHBOARD</h2>
      </div>
      <div className="reg-btn">
        <button
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#4682B4',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '25px',
            textDecoration: 'none',
            marginBottom: '20px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Link to='/register-customer' style={{ color: 'white', textDecoration: 'none' }}>
            Register New Customer
          </Link>
        </button>
      </div>
      <div style={{ padding: '20px', background: '#DBE2ED', opacity: '1', }}>

        <h4 style={{ marginBottom: '20px', color: '#4682B4' }}>REGISTERED CUSTOMERS</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginRight: 'auto', marginLeft: 'auto', opacity: '0.7' }}>
          {users.map((user) => (
            <div className="user-card"
              key={user._id}
              style={{ width: '300px', background: '#4682B4', padding: '20px', borderRadius: '8px', }}
            >
              <Link to={`/users/${user._id}`}>
                <UserCard user={user} />
              </Link>
              
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default StaffDashboard;
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import UserCard from './UserCard';
// import axios from 'axios';

// const StaffDashboard = () => {
//   const { carwash_id } = useParams(); // Get the carwashId from the URL params
//   const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/carwashes/${carwash_id}/users`);
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

//     fetchUsers();
//   }, [carwash_id]);

//   return (
//     <div style={{ padding: '20px', background: '#FDEDD0' }}>
//       <button
//         style={{
//           display: 'inline-block',
//           padding: '10px 20px',
//           background: 'orange',
//           color: 'white',
//           fontWeight: 'bold',
//           borderRadius: '4px',
//           textDecoration: 'none',
//           marginBottom: '20px',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         <Link to='/register-customer' style={{ color: 'white', textDecoration: 'none' }}>
//           Register Customer
//         </Link>
//       </button>
//       <h2 style={{ marginBottom: '20px' }}>Staff Dashboard</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//         {users.map((user) => (
//           <div
//             key={user._id}
//             style={{ width: '300px', background: 'white', padding: '20px', borderRadius: '8px' }}
//           >
//             <Link to={`/users/${user._id}`}>
//               <UserCard user={user} />
//             </Link>
//             {/* <p>Email: {user.email}</p> */}
//             <p>Phone: {user.phone}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;

