import React, { useState, useEffect } from 'react';
import './leaderboard.css';

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, user: 'Ralph', points: 1200 },
    { rank: 2, user: 'CamdenThurman', points: 950 },
    { rank: 3, user: 'John', points: 640 },
  ]);

  const [scoreUpdates, setScoreUpdates] = useState([]);

  useEffect(() => {
    // Simulating fetching leaderboard data from an API
    const fetchLeaderboardData = async () => {
      // Replace this with actual API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve(leaderboardData), 1000)
      );
      setLeaderboardData(response);
    };

    fetchLeaderboardData();

  }, []);

  const addUserToLeaderboard = (username, points) => {
    setLeaderboardData(prevData => {
      const existingUserIndex = prevData.findIndex(user => user.user === username);
      
      if (existingUserIndex > -1) {
        // Update existing user's points
        const updatedUser = {
          ...prevData[existingUserIndex],
          points: prevData[existingUserIndex].points + points,
        };
        
        return prevData.map((user, index) => index === existingUserIndex ? updatedUser : user)
                       .sort((a, b) => b.points - a.points); // Sort by points descending
      } else {
        // Add new user
        const newUser = { rank: prevData.length + 1, user: username, points };
        return [...prevData, newUser].sort((a, b) => b.points - a.points); // Sort by points descending
      }
    });
  };

  return (
    <main className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="content-wrapper">
        <div className="leaderboard-section">
          <table className="leaderboardTable">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={entry.user}>
                  <td>{index + 1}.</td>
                  <td>{entry.user}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="websocket-section">
          <div className="websocket-updates">
            <h2>Live Score Updates</h2>
            <ul className="score-feed">
              {scoreUpdates.map((update, index) => (
                <li key={index} className="score-update">
                  <span className="timestamp">{update.timestamp}</span>
                  <span className="username">{update.username}</span> used a recipe and gained {update.points} points. 
                  New score: <span className="score">{update.newScore}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}