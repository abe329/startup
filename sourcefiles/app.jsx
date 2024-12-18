// import React, { useEffect } from 'react';
import React from 'react'; // Took out useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'; // Took out useNavigate
import { Login } from './login/login';
import { Recipes } from './recipes/recipes';
import { Leaderboard } from './leaderboard/leaderboard';
import { Chat } from './chat/chat';
import { About } from './about/about';
import { AuthState } from './login/authState';
import { UserProvider, useUserContext } from './UserContext';


function Footer() {
  const { userScore } = useUserContext();

  return (
    <footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span className="text-reset">@Abe Hull</span>
        <a className="Github" href="https://github.com/abe329" style={{marginLeft: '20px'}}>GitHub</a>
      </div>
      <div className="footer-score">
        <span>Your Score: {userScore}</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);


  return (
    <UserProvider>
      <BrowserRouter>
        <div className="page-container">
          <header>
            <h1 className="title">Reduce.Reuse.RECIPE</h1>
            <menu className='navbar-nav'>
              <nav>
                <ul className="nav-menu">
                  <li>
                    <NavLink className='nav-link' to='login'>
                      Login
                    </NavLink>
                  </li>
                  {authState === AuthState.Authenticated && (
                    <li>
                      <NavLink className='nav-link' to='recipes'>
                        Recipes
                      </NavLink>
                    </li>
                  )}
                  {authState === AuthState.Authenticated && (
                    <li>
                      <NavLink className='nav-link' to='leaderboard'>
                        Leaderboard
                      </NavLink>
                    </li>
                  )}
                  {authState === AuthState.Authenticated && (
                    <li>
                      <NavLink className='nav-link' to='chat'>
                        Chat
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink className='nav-link' to='about'>
                      About
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </menu>
            {/* <hr /> */}
          </header>
    
          <Routes>
            <Route path='/' element={<Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />} />
            <Route path='/login' element={<Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />} exact />
            <Route path='/recipes' element={<Recipes userName={userName} />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/chat' element={<Chat />} />
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