import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ScoreScreen from "./components/ScoreScreen";
import Footer from "./components/Footer";
// import TargetNamer from ".components/TargetNamer"

function App() {
  // const [count, setCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [tileSet, setTileSet] = useState([]);
  const [homeActive, setHomeActive] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [scoreboardActive, setScoreboardActive] = useState(false);

  const navToHome = () => {
    setHomeActive(true);
    setGameActive(false);
    setScoreboardActive(false);
  };

  const navToGame = () => {
    setHomeActive(false);
    setGameActive(true);
    setScoreboardActive(false);
  };

  const navToScoreboard = () => {
    setHomeActive(false);
    setGameActive(false);
    setScoreboardActive(true);
  };

  const abortGame = () => {
    setGameActive(false);
    setHomeActive(true);
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
  }, [scoreboardActive]);

  useEffect(() => {
    const getTargets = async () => {
      let response = await fetch("http://localhost:3000/targets");
      let data = await response.json();
      setTargetData(data);
    };
    getTargets();
  }, [gameActive]);

  const userToBeat = userData[userData.length - 1];

  return (
    <>
      <main>
        {homeActive && (
          <StartScreen
            navToScoreboard={navToScoreboard}
            navToGame={navToGame}
            drawTileSet={drawTileSet}
          />
        )}
        {gameActive && (
          <GameScreen
            abortGame={abortGame}
            navToHome={navToHome}
            navToScoreboard={navToScoreboard}
            targetData={targetData}
            setTargetData={setTargetData}
            tileSet={tileSet}
            userToBeat={userToBeat}
          />
        )}
        {scoreboardActive && (
          <ScoreScreen navToHome={navToHome} userData={userData} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
