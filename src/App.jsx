import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ScoreScreen from "./components/ScoreScreen";
import Footer from "./components/Footer";

const toggleHome = () => {
  let startScreen = document.querySelector(".startScreen");
  startScreen.classList.toggle("hidden");
};

const toggleScore = () => {
  let scoreScreen = document.querySelector(".scoreScreen");
  scoreScreen.classList.toggle("visible");
};

const toggleGame = () => {
  let gameScreen = document.querySelector(".gameScreen");
  gameScreen.classList.toggle("visible");
};

const startGame = () => {
  toggleHome();
  toggleGame();
};

const abortGame = () => {
  toggleGame();
  toggleHome();
};

const viewScoreboard = () => {
  toggleHome();
  toggleScore();
};

const returnHome = () => {
  toggleHome();
  toggleScore();
};

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <StartScreen viewScoreboard={viewScoreboard} startGame={startGame} />
        <GameScreen abortGame={abortGame} />
        <ScoreScreen returnHome={returnHome} />
      </main>
      <Footer />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
