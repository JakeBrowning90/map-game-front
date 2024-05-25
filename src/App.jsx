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
  const [error, setError] = useState(null);

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
    for (let i = 0; i < 45; i++) {
      // X axis (columns)
      for (let j = 0; j < 80; j++) {
        setTileSet((tileSet) => [...tileSet, { key: `${i},${j}` }]);
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/users", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("user fetch error");
        }
        return response.json();
      })
      .then((response) => setUserData(response))
      .catch((error) => setError(error));
  }, [scoreboardActive]);

  useEffect(() => {
    fetch("http://localhost:3000/targets", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("user fetch error");
        }
        return response.json();
      })
      .then((response) => setTargetData(response))
      .catch((error) => console.error(error));
  }, [gameActive]);

  const userToBeat = userData[userData.length - 1];

  if (error)
    return (
      <>
        <main>
          <p>
            Sorry, there is a network error. Please try this page again later.
          </p>
        </main>
      </>
    );

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
