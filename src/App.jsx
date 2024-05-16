import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ScoreScreen from "./components/ScoreScreen";
import Footer from "./components/Footer";
// import TargetNamer from ".components/TargetNamer"

function App() {
  // const [count, setCount] = useState(0);
  const [userData, setUserData] = useState([]);
  // const [targetData, setTargetData] = useState([]);
  const [tileSet, setTileSet] = useState([]);

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
    drawTileSet();
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

  const drawTileSet = () => {
    setTileSet((tileSet) => []);
    // Y axis (rows)
    for (let i = 0; i < 4; i++) {
      // X axis (columns)
      for (let j = 0; j < 8; j++) {
        setTileSet((tileSet) => [...tileSet, { key: `${j},${i}` }]);
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      let response = await fetch("http://localhost:3000/users");
      let data = await response.json();
      setUserData(data);
    };
    getUsers();
  }, []);

  // useEffect(() => {
  //   const getTargets = async () => {
  //     let response = await fetch("http://localhost:3000/targets");
  //     let data = await response.json();
  //     // TODO: add a found boolean?
  //     setTargetData(data);
  //   };
  //   getTargets();
  // }, []);

  return (
    <>
      <main>
        <StartScreen viewScoreboard={viewScoreboard} startGame={startGame} />
        <GameScreen
          abortGame={abortGame}
          // targetData={targetData}
          // setTargetData={setTargetData}
          tileSet={tileSet}
          // clickTile={clickTile}
        />
        <ScoreScreen returnHome={returnHome} userData={userData} />
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
