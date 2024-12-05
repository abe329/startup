import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userScore, setUserScore] = useState(0);

  // useEffect(() => {
  //   // Fetch the user's score when the component mounts
  //   fetchUserScore();
  // }, []);

  const fetchUserScore = async () => {
    try {
      const response = await fetch('/api/userScore', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUserScore(data.score);
      }
    } catch (error) {
      console.error('Error fetching user score:', error);
    }
  };

  const updateUserScore = async (points) => {
    const newScore = userScore + points;
    setUserScore(newScore);
    
    try {  //Simplified a lot
      await fetch('/api/updateScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: newScore }),
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const clearLocalScore = () => { // New Attempt
    setUserScore(0);
  };

  return (
    <UserContext.Provider value={{ userScore, updateUserScore, clearLocalScore, fetchUserScore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);