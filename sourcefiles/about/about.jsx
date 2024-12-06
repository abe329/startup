import React from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');

  React.useEffect(() => {
    setImageUrl(`recipez.jpeg`);
  }, []);

  return (
    <main>
      <div className="picture">
        <div className="picture-box">
          <img src={imageUrl} alt="recipe" />
        </div>
      </div>

      <h1>About Reduce.Reuse.RECIPE</h1>
      <p>We all have leftover ingredients in our fridge that are doomed for disposal, despite our best intentions.
        <b> Reduce.Reuse.RECIPE</b> provides an environmentally friendly alternative for these odds and ends! Enter
        a single leftover ingredient that you hope to utilize on the Recipes page, and this app will provide a list
        of potential recipes. You gain points every time you use a recipe, and the application keeps track of
        the users with the most points on a scoreboard. Create an account and let's get cooking!</p>
    </main>
  );
}