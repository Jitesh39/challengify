
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
function Header(){

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
      setDropdownOpen(prevState => !prevState);
  };

  // Function to handle logout
  const handleLogout = () => {
       // Replace with actual logout logic
      setDropdownOpen(false);
      navigate("/login");
  };

    return(
        <header>
          <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >CHALLENGIFY</Link>  </div>
        
          <div className="avatar-container" style={styles.avatarContainer} onClick={toggleDropdown}>
                <img 
                    src="/components/bg-signup.jpg'" // Sample avatar, replace with user avatar
                    alt="User Avatar" 
                    className="avatar" 
                    style={styles.avatar}
                />
                {dropdownOpen && (
                    <div className="dropdown-menu" style={styles.dropdown}>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </div>
                )}
            </div>
        
      </header>
    );
}

const styles = {
  avatarContainer: {
    position: 'relative',
    cursor: 'pointer',
    marginRight: '100px', // Adds spacing on the right
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'block' // Ensures visibility on screen
  },
  dropdown: {
    position: 'absolute',
    right: '0px',
    top: '50px',
    background: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    width: '120px',
    textAlign: 'center',
    padding: '10px'
  },
  logoutButton: {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%'
  }
};

export default Header;