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

- Optimize async functions: When the user completes the game with a qualifying time, they are prompted to submit their name, which calls `addUserscore()`, `deleteBeatenScore()`, and `navToScoreboard()`. However, the scoreboard occasionally loads before the updates to the database scores are applied. I am still working on correcting this.

- Responsive design: The current layout is not ideal for smaller screens, given the size of the map image. I've added an overflow scroll, but I need a cleaner appearance to allow users to resize the image and select targets without obscuring the rest of the game information.

## How to use

When the page loads, you will see a screen with the game title, play instructions, and two buttons. 

- Click the "Leaderboard" button to view the 10 best scores, and a click "Return Home" to navigate back the the title screen.

- Click the "Start Game" button to navigate to the game screen.

On the game screen, you will see a blue div with several children:
- To the top left is a timer showing your current score, adding 100 for each elapsed second, and a counter showing how many targets need to be found to complete the game. 
- To the top right is a trivia banner. As you correctly identify targets, relevant facts will be displayed here. 
- To the bottom right is a map with multiple blue stars indicating the locations of cities. Click on a star and a list of city names will appear to the left. Click one of these names to submit a guess, or click elsewhere on the map to dismiss the list. An incorrect guess adds 1001 to your score.
- To the bottom left is the "Return Home" button. Click this to cancel the game, resetting your score and progress.
- If your final score qualifies, you will be asked to enter your name, then the game will navigate to the updated leaderboard. If your score does not qualify, you will be shown your final score and a link to the leaderboard. 

## Credits

Original USA map from Wikimedia Commons, image from National Atlas of the United States: https://commons.wikimedia.org/wiki/File:National-atlas-blank-state-outlines.png?uselang=en#Licensing