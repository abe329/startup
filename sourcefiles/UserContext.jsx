import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userScore, setUserScore] = useState(() => {
    const savedScore = localStorage.getItem('userScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  const updateUserScore = (points) => {
    setUserScore(prevScore => {
      const newScore = prevScore + points;
      localStorage.setItem('userScore', newScore.toString());
      return newScore;
    });
  };

  useEffect(() => {
    localStorage.setItem('userScore', userScore.toString());
  }, [userScore]);

  return (
    <UserContext.Provider value={{ userScore, updateUserScore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);