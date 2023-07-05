import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        const data = response.data;
        setUser(data);
        setIsButtonDisabled(localStorage.getItem(id) === 'true');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleWashCar = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${id}/wash`);
      const data = response.data;
      setUser(data);
      console.log('Wash history updated');
      setIsButtonDisabled(true);
      localStorage.setItem(id, 'true');
      setTimeout(() => {
        setIsButtonDisabled(false);
        localStorage.removeItem(id);
      }, 24 * 60 * 60 * 1000);
    } catch (error) {
      console.error('Error washing car:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: '#FDEBD0', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '20px' }}>User Details</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <p style={{ marginBottom: '10px' }}>Name: {user.name}</p>
        <p style={{ marginBottom: '10px' }}>Phone: {user.phone}</p>
        <p style={{ marginBottom: '10px' }}>Number Plate: {user.number_plate}</p>
        <p style={{ marginBottom: '10px' }}>Car: {user.car}</p>
        <button
          style={{
            background: '#F9AE40',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            opacity: isButtonDisabled ? 0.5 : 1,
          }}
          onClick={handleWashCar}
          disabled={isButtonDisabled}
        >
          Wash Car
        </button>
        {isButtonDisabled && (
          <div
            style={{
              background: 'green',
              color: 'white',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px',
            }}
          >
            Car wash notification sent!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const UserDetails = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${id}`);
//         const data = await response.json();
//         setUser(data);
//         setIsButtonDisabled(localStorage.getItem(id) === 'true');
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleWashCar = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/users/${id}/wash`, {
//         method: 'POST',
//       });
//       const data = await response.json();
//       setUser(data);
//       console.log('Wash history updated');
//       setIsButtonDisabled(true);
//       localStorage.setItem(id, 'true');
//       setTimeout(() => {
//         setIsButtonDisabled(false);
//         localStorage.removeItem(id);
//       }, 24 * 60 * 60 * 1000);
//     } catch (error) {
//       console.error('Error washing car:', error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ background: '#FDEBD0', padding: '20px', borderRadius: '8px' }}>
//       <h2 style={{ marginBottom: '20px' }}>User Details</h2>
//       <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
//         <p style={{ marginBottom: '10px' }}>Name: {user.name}</p>
//         <p style={{ marginBottom: '10px' }}>Phone: {user.phone}</p>
//         <p style={{ marginBottom: '10px' }}>Number Plate: {user.number_plate}</p>
//         <p style={{ marginBottom: '10px' }}>Car: {user.car}</p>
//         <button
//           style={{
//             background: '#F9AE40',
//             color: 'white',
//             padding: '10px 20px',
//             borderRadius: '4px',
//             cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
//             opacity: isButtonDisabled ? 0.5 : 1,
//           }}
//           onClick={handleWashCar}
//           disabled={isButtonDisabled}
//         >
//           Wash Car
//         </button>
//         {isButtonDisabled && (
//           <div
//             style={{
//               background: 'green',
//               color: 'white',
//               padding: '10px',
//               borderRadius: '4px',
//               marginTop: '10px',
//             }}
//           >
//             Car wash notification sent!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;
