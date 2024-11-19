import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  return (
    <main>
      <div>
      <h1>Leaderboard</h1>
      <div className="content-wrapper"></div>
        <div className="leaderboard-section">
          <table id="leaderboardTable">
            <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Ralph</td>
                  <td>1200</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>CamdenThurman</td>
                  <td>950</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>John</td>
                  <td>640</td>
                </tr>
              </tbody>
          </table>
        </div>
        
        <div class="websocket-section">
          <div id="websocket-updates">
            <h2>Live Score Updates</h2>
            <ul id="score-feed">
              <li className="score-update">
                <span className="timestamp">10:15 AM</span>
                <span className="username">Ralph</span> used a recipe and gained 80 points. New score: <span class="score">1200</span>
              </li>
              <li className="score-update">
                <span className="timestamp">10:12 AM</span>
                <span className="username">CamdenThurman</span> used a recipe and gained 75 points. New score: <span class="score">950</span>
              </li>
              <li className="score-update">
                <span className="timestamp">10:08 AM</span>
                <span className="username">John</span> used a recipe and gained 60 points. New score: <span class="score">640</span>
              </li>
              <li className="score-update">
                <span className="timestamp">10:05 AM</span>
                <span className="username">CamdenThurman</span> used a recipe and gained 55 points. New score: <span class="score">875</span>
              </li>
              <li className="score-update">
                <span className="timestamp">10:01 AM</span>
                <span className="username">Ralph</span> used a recipe and gained 70 points. New score: <span class="score">1120</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}