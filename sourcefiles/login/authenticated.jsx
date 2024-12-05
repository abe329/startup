import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useUserContext } from '../UserContext'; // NEW

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();
  const { fetchUserScore, clearLocalScore } = useUserContext();  // Add clearLocalScore function

  useEffect(() => {
    // Fetch the user's score when the user is authenticated
    fetchUserScore();
  }, [fetchUserScore]);

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        clearLocalScore(); // clear score
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button variant='primary' onClick={() => navigate('/recipes')}>
        Get Started
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
