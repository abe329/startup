import React, { useState } from 'react';

export function Login() {
  return (
    <main class="text-center">
          <h1 style="padding-bottom:20px">Welcome to the greatest decision of your life!</h1>
          <form method="get" action="recipes.html">
            <div>
              <span>@</span>
              <input type="text" placeholder="your@email.com" />
            </div>
            <div>
              <span>🔒</span>
              <input type="password" placeholder="password" />
            </div>
            <button type="submit">Login</button>
            <button type="submit">Create</button>
          </form>
    </main>
  );
}