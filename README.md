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

- [x] **HTML pages** - Four HTML pages that represent the ability to login and vote.
- [x] **Links** - The login page automatically links to the recipes page. Each page also has a link to my Github.
- [x] **Text** - Text is displayed on each page, with a description on my About, placeholder text for each recipe, and placeholder users on my leaderboard.
- [x] **Images** - A wonderful recipe image is displayed on my About page.
- [x] **DB/Login** - Input box and submit button for login. The voting choices represent data pulled from the database.
- [x] **WebSocket** - The leaderboard page has a realtime scoreboard, which will eventually update when users choose a recipe.


## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- [x] **Header, footer, and main content body**
- [x] **Navigation elements** - I used display flex and put the nav in a row in the center.
- [x] **Responsive to window resizing** - My app looks PHENOMENAL on devices of all sizes.
- [x] **Application elements** - Used really good contrast and whitespace (except for it's blue, not white).
- [x] **Application text content** - Consistent fonts
- [x] **Application images** - I changed the sizing of my image and centered it.


## React deliverable

For this deliverable I used JavaScript and React so that the application completely works for a single user. I also added placeholders for future technology (Websockets, API, etc.).

- [x] **Bundled and transpiled** - done!
- [x] **Components** - Login, voting list, vote are all components with mocks for login, WebSocket.
- [x] **login** - When you press the login button it takes you to the recipe page.
- [x] **database** - Displayed the leaderboard data.
- [x] **application logic** - The ingredients and recipes used numbers change in the console log based up the user's selections.
- [x] **Router** - Routing between login and recipe components.
- [x] **Hooks** - Uses 'UseState' and 'UseNavigation' frequently for page functionality.

## Service deliverable

For this deliverable I added third-party, backend, and frontend service endpoints that generate recipes based on the user's search.

- [x] **Node.js/Express HTTP service** - done!🤩
- [x] **Static middleware for frontend** - done!🤩
- [ ] **Calls to third party endpoints** - Retrieves recipe data from NinjaAPI's recipe API.
- [x] **Backend service endpoints** - My backend endpoint (/api/recipes) retrieves and formats recipes responses.
- [x] **Frontend calls service endpoints** - My React app component pulls the recipes from my backend using the fetch function. 

