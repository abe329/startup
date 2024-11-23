import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Recipes } from './recipes/recipes';
import { Leaderboard } from './leaderboard/leaderboard';
import { About } from './about/about';
import { UserProvider, useUserContext } from './UserContext';

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/auth/logout', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        localStorage.removeItem('token');
      }
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav>
      <ul className="nav-menu">
        <li><NavLink className='nav-link' to='login'>Login</NavLink></li>
        <li><NavLink className='nav-link' to='recipes'>Recipes</NavLink></li>
        <li><NavLink className='nav-link' to='leaderboard'>Leaderboard</NavLink></li>
        <li><NavLink className='nav-link' to='about'>About</NavLink></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

function Footer() {
  const { userScore } = useUserContext();
  return (
    <footer>
      <hr />
      <span className="text-reset">@Abe Hull</span>
      <br />
      <a className="Github" href="https://github.com/abe329">GitHub</a>
      <br />
      <div className="footer-score">
        <span>Your Score: {userScore}</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="page-container">
          <header>
            <h1>Reduce.Reuse.RECIPE</h1>
            {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossOrigin="anonymous"></script> */}
            <Navigation />
            <hr />
          </header>
    
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} exact />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
    
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}