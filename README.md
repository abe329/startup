### Reduce.Reuse.RECIPE
We all have leftover ingredients in our fridge that are doomed for disposal, despite our best intentions. Reduce.Reuse.RECIPE provides an environmentally friendly alternative for these odds and ends. Users input multiple leftover ingredients that they hope to utilize, and the app provides a list of potential recipes. Users gain points every time they use a recipe, and the application keeps track of the users with the most points on a scoreboard.

# Design
![application design](Startup_Design.png)

# Key Features:
- Individual login
- User input of ingredients
- Recipe generation using WolfgramAlpha API
- Users’ scores are stored
- Scores of users displayed in realtime

# Technologies
- HTML: Built using correct structure. 3 HTML pages in total: One for login, one for recipes, and one for scoreboard.
- CSS: The styling is professional and matches the aesthetic of the application with appropriate fonts, colors, and spacing.
- Javascript: Enables animation and button input.
- React: Provides login, ingredient input, scoreboard functionality
- Authentication: Each user has a separate, secure account.
- Web Service:  WolfgramAlpha API uses the inputted ingredients and generates relevant recipes. (If the WolfgramAlpha AI API isn’t a viable option for my level of experience, I’m comfortable with modifying the recipe generation function of my application.)
- Database Data: Stores users recipes and scores in a database.
- Websocket: Updates the scoreboard in realtime.


## HTML deliverable

I built out the structure of my application using HTML.

- [ ] **HTML pages** - Four HTML pages that represent the ability to login and vote.
- [ ] **Links** - The login page automatically links to the recipes page. Each page also has a link to my Github.
- [ ] **Text** - Text is displayed on each page, with a description on my About, placeholder text for each recipe, and placeholder users on my leaderboard.
- [ ] **Images** - A wonderful recipe image is displayed on my About page.
- [ ] **DB/Login** - Input box and submit button for login. The voting choices represent data pulled from the database.
- [ ] **WebSocket** - The leaderboard page has a realtime scoreboard, which will eventually update when users choose a recipe.

** All of my Github commits are really close together in time because I couldn't deploy files to my website or commit changes to Github until yesterday (9/27) 😫
