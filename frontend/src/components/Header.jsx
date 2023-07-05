import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { logoutStaff, resetStaff } from '../features/staff/staffSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { staff } = useSelector((state) => state.staff);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(logoutStaff());
    dispatch(reset());
    dispatch(resetStaff());
    navigate('/');
  };

  const handleLogin = () => {
    if (user) {
      // If the user is logged in, redirect them to their car wash
      navigate('/user-dashboard');
    } else if (staff) {
      // If the staff member is logged in, redirect them to their car wash
      navigate('/staff-dashboard');
    } else {
      // If neither user nor staff is logged in, redirect them to the login page
      navigate('/login');
    }
  };

  return (
    <header
      style={{ background: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      className='header'
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className='logo'>
        <img style={{ width: '100px', height: '100px' }} src={require('../images/WhatsApp Image 2023-05-17 at 12.22.35.jpg')} alt='' />
        <Link className='logo-text' to='/' style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>
          Orange Car Wash
        </Link>
      </div>

      {/* Hamburger menu */}
      <div className='mobile-menu'>
        <FaBars onClick={toggleMobileMenu} />
        {isMobileMenuOpen && (
          <ul className='mobile-menu-items'>
            {user !== staff ? (
              <li onClick={closeMobileMenu}>
                <button className='btn' onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            ) : (
              <>
                <li onClick={closeMobileMenu}>
                  <button className='btn' onClick={handleLogin}>
                    <FaSignInAlt /> {user ? 'User Dashboard' : 'Staff Login'}
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
