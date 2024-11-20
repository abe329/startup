import React, { useState, useEffect } from 'react';
import './leaderboard.css';

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, user: 'Ralph', points: 1200 },
    { rank: 2, user: 'CamdenThurman', points: 950 },
    { rank: 3, user: 'John', points: 640 },
  ]);

  const [scoreUpdates, setScoreUpdates] = useState([
    { timestamp: '10:15 AM', username: 'Ralph', points: 80, newScore: 1200 },
    { timestamp: '10:12 AM', username: 'CamdenThurman', points: 75, newScore: 950 },
    { timestamp: '10:08 AM', username: 'John', points: 60, newScore: 640 },
    { timestamp: '10:05 AM', username: 'CamdenThurman', points: 55, newScore: 875 },
    { timestamp: '10:01 AM', username: 'Ralph', points: 70, newScore: 1120 },
  ]);

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

  useEffect(() => {
    // Simulating WebSocket connection for live updates
    const ws = {
      onmessage: (event) => {
        const newUpdate = {
          timestamp: new Date().toLocaleTimeString(),
          username: 'NewUser',
          points: Math.floor(Math.random() * 100),
          newScore: Math.floor(Math.random() * 1000)
        };
        setScoreUpdates(prevUpdates => [newUpdate, ...prevUpdates.slice(0, 4)]);
      }
    };

    // Simulate receiving updates every 5 seconds
    const interval = setInterval(() => {
      ws.onmessage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                <tr key={entry.rank}>
                  <td>{entry.rank}.</td>
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