# Map Game

## Overview

This is my submission for the "Where's Waldo" assignment in the The Odin Project's (TOP) Node.js course. (https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app)

The live app can be viewed at https://jakebrowningmapgame.netlify.app/

The repo for the backend can be viewed at https://github.com/JakeBrowning90/map-game-back


## Technologies

This project utilizes the MERN stack: The frontend is built with React, The backend is built with Express and Node.js, and MongoDB is the database.

## Challenges/To-dos

This was my first project with the entire MERN stack, although I had previously completed projects that used each individual component. As this point of TOP curriculum focuses on Express, Node.js, and MongoDB, so I hadn't worked with React recently, and needed to review the new official documentation. This gave me the opportunity to practice techniques I had not used before, such as conditional rendering and greater utility of useState.

There are a few elements of the app which are "in-progress":
- Optimizine async functions: When the user completes the game with a qualifying time, they are prompted to submit their name, which calls `addUserscore()`, `deleteBeatenScore()`, and `navToScoreboard()`. However, the scoreboard occasionally loads before the updates to the database scores are applied. I am still working on correcting this. 

- Responsive design: The current layout is not ideal for smaller screens, given the size of the map image. I've added an overflow scroll, but I need a cleaner appearance to allow users to resize the image and select targets without obscuring the rest of the game information.

## How to use

To-Do

## Credits

To-Do
