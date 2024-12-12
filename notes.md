## Getting Started
Push and Pull are essential github functions. Forks are effective for working in large organizations.


## Midterm Review
The link element typically links to external resources like CSS stylesheets.

A div tag creates a division or section in an HTML document.

#title selects an element with id="title", while .grid selects elements with class="grid".

Padding is space inside an element's border, margin is space outside the border.

Images would be displayed flexibly in a row or column depending on the flex properties.

Padding CSS adds space inside an element's border.

Arrow syntax defines a function more concisely in JavaScript.

map applies a function to each array element, creating a new array with the results.

It selects an element by ID and adds a function to run when an event occurs on that element.

It selects an element with the specified id using JavaScript.

The DOM represents the document as a tree structure of objects.

The default display value for span is inline.

Use: div { background-color: red; }

Use:

Content, padding, border, margin (inside to outside).

Use: span { color: green; }

It would output numbers in a sequence based on the loop conditions.

Use: document.getElementById("byu").style.color = "green";

if () {}, else {}, for (), while (), switch ()

const obj = { key: value };

Yes, you can add new properties to JavaScript objects.

Use the <script> tag.

document.querySelector('span').textContent = 'crow';

JSON is a lightweight data interchange format.

These are various Linux/Unix commands for file and system management.

ssh creates a remote shell session.

-la shows all files (including hidden) in a detailed list format.

.click is the top-level domain, banana is a subdomain, fruit.bozo.click is the root domain.

Yes, a web certificate is necessary for HTTPS.

A DNS A record points to an IP address, not another A record.
443 for HTTPS, 80 for HTTP, 22 for SSH.
It would output based on the Promise resolution order and any chaining.


## Final Review
1. The default ports for common protocols are:
   - HTTP: 80
   - HTTPS: 443
   - SSH: 22

2. HTTP status codes indicate:
   - 300 range: Redirection
   - 400 range: Client errors
   - 500 range: Server errors

3. The HTTP Content-Type header allows you to specify the media type of the resource being sent in the HTTP message body. It tells the recipient what kind of data is being sent and how to interpret it.

4. Different types of cookies provide the following security features:
   - Secure cookie: Only sent over HTTPS connections
   - HttpOnly cookie: Cannot be accessed by JavaScript
   - SameSite cookie: Controls when cookies are sent with cross-site requests

5. For an Express middleware logging HTTP GET requests to /api/document, the console output would likely be:
   ```
   GET /api/document
   ```
   

6. A front-end JavaScript fetch to an Express service might look like:
   ```javascript
   fetch('/api/endpoint')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));
   ```
   This would return a Promise that resolves with the response data.
   ```javascript
   secureApiRouter.get('/userName', async (req, res) => {
      const authToken = req.cookies[authCookieName];
      const user = await DB.getUserByToken(authToken);
      if (user) {
         res.status(200).send({ name: user.email });
      } else {
         res.status(401).send({ msg: 'Unauthorized' });
      }
   })
   ```

8. For a MongoDB query {name: "Mark"}, the matching documents would look like:
   ```json
   {
     "_id": ObjectId("..."),
     "name": "Mark",
     ...
   }
   ```
   

9. User passwords should be stored using strong, slow hashing algorithms like bcrypt, Argon2, or PBKDF2, with unique salts for each password. They should never be stored in plain text.

10. Example of Node.js WebSocket code:
   Backend:
   ```javascript
   const WebSocket = require('ws');
   const wss = new WebSocket.Server({ port: 8080 });
   
   wss.on('connection', function connection(ws) {
     ws.on('message', function incoming(message) {
       console.log('received: %s', message);
     });
     ws.send('Connected to WebSocket server');
   });
   ```
   
   Frontend:
   ```javascript
   const socket = new WebSocket('ws://localhost:8080');
   
   socket.onopen = function(event) {
     console.log('Connected to WebSocket');
   };
   
   socket.onmessage = function(event) {
     console.log('Message from server:', event.data);
   };
   ```
   
   The front end will log:
   ```
   Connected to WebSocket
   Message from server: Connected to WebSocket server
   ```

   Also...

   ```javascript
   wss.on('connection', (ws) => {
    const connection = { id: ++id, alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
```

11. The WebSocket protocol is intended to provide full-duplex, bidirectional communication between a client and server over a single TCP connection, enabling real-time data exchange with low latency.

12. Acronym meanings:
    - JSX: JavaScript XML
    - JS: JavaScript
    - AWS: Amazon Web Services
    - NPM: Node Package Manager
    - NVM: Node Version Manager

15. A React component using React.useState creates a state variable and a function to update it, allowing the component to manage and update its own state.

16. React Hooks are used to add state and other React features to functional components without writing a class.

17. React Hooks serve the following purposes:
    - State Hook: Adds state to functional components
    - Context Hook: Subscribes to React context
    - Ref Hook: Creates a mutable reference
    - Effect Hook: Performs side effects in functional components
    - Performance Hook: Optimizes component rendering

19. The package.json file in a Node.js project defines the project's dependencies, scripts, version, and other metadata needed for the project to run correctly.

20. The fetch function is used to make network requests, typically to retrieve resources from a server. It returns a Promise that resolves with the response to the request.

21. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server-side, enabling the creation of scalable network applications.

22. PM2 (Process Manager 2) is a production process manager for Node.js applications. It helps manage and keep Node.js applications alive in production environments.

23. Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It serves as a frontend build tool and development server.
