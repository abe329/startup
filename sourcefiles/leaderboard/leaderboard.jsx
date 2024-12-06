import React, { useState, useEffect } from 'react';
import './leaderboard.css';

export function Leaderboard() {
  // const [leaderboardData, setLeaderboardData] = useState([
  //   { rank: 1, user: 'Ralph', points: 1200 },
  //   { rank: 2, user: 'CamdenThurman', points: 950 },
  //   { rank: 3, user: 'John', points: 640 },
  // ]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [scoreUpdates, setScoreUpdates] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('/api/highScores');
      if (response.ok) {
        const data = await response.json();
        setLeaderboardData(data.map((entry, index) => ({
          rank: index + 1,
          user: entry.email, // Assuming the user's email is used as the username
          points: entry.score
        })));
      } else {
        console.error('Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

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
              {leaderboardData.map((entry) => (
                <tr key={entry.user}>
                  <td>{entry.rank}.</td>
                  <td>{entry.user}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}