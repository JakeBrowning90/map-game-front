import { useEffect, useState } from "react";
import TargetNamer from "./TargetNamer";

function GameScreen({
  abortGame,
  navToHome,
  navToScoreboard,
  tileSet,
  userToBeat,
}) {
  const [currentTile, setCurrentTile] = useState();
  const [targetData, setTargetData] = useState([]);
  const [foundTiles, setFoundTiles] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const clickTile = (e) => {
    if (!currentTile) {
      setCurrentTile(e.target.id);
      if (!e.target.id) {
        updateBannerText("You've already found something here!");
      } else {
        updateBannerText("What is this?");
      }
    } else {
      resetBoard();
      updateBannerText();
    }
  };

  const resetBoard = () => {
    setCurrentTile(undefined);
    // removeMarker();
  };

  const updateBannerText = (string) => {
    const banner = document.querySelector(".banner");
    if (string == undefined) {
      banner.textContent = "Click on a target in the image.";
    } else {
      banner.textContent = string;
    }
  };

  const checkEndgame = (remaining) => {
    if (remaining.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const submitScore = () => {
    //Delete scoreToBeat
    fetch(
      `http://localhost:3000/users/${userToBeat.id}`,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //Add userScore
    const playerName = document.querySelector("#playerName");
    let name;
    if (playerName.value) {
      name = playerName.value;
    } else {
      name = "Anonymous player";
    }

    fetch("http://localhost:3000/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        score: timer,
      }),
    }).then(navToScoreboard())

    // navToScoreboard();
  };

  function checkMove() {
    const targetNamer = document.querySelector("#targetNamer");
    let namedTarget = targetNamer.value;
    let target = targetData.find(({ name }) => name === namedTarget);
    if (target.location.includes(currentTile)) {
      updateBannerText(`Correct! ${namedTarget} is at ${currentTile}`);
      setFoundTiles([...foundTiles, currentTile]);
      resetBoard();
      // TODO: Update score/list display

      const remainingTargets = targetData.filter(
        (unfound) => unfound.id !== target.id
      );
      if (checkEndgame(remainingTargets)) {
        setGameOver(true);
      }
      setTargetData(remainingTargets);
    } else {
      updateBannerText(`Sorry, ${namedTarget} is NOT at ${currentTile}`);
      // Penalty for mistake (Change this penalty system?)
      setTimer((timer) => timer + 10);
      resetBoard();
    }
  }

  useEffect(() => {
    const getTargets = async () => {
      let response = await fetch("http://localhost:3000/targets");
      let data = await response.json();
      // TODO: add a found boolean?
      setTargetData(data);
    };
    getTargets();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const key = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);

      return () => {
        clearInterval(key);
      };
    }
  }, [gameOver]);

  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>
      {!gameOver ? (
        <div className="gameScreenControls">
          <p>Time: {timer}</p>
          <p className="banner">Click on a target in the image.</p>
          {currentTile && (
            <div className="targetForm">
              <TargetNamer targetData={targetData} />
              <button onClick={checkMove}>Check</button>
            </div>
          )}
        </div>
      ) : (
        <div className="endGameControls">
          {timer < userToBeat.score ? (
            <form>
              <p>
                You finished in {timer} seconds! Add your name to the
                scoreboard!
              </p>
              <input
                type="text"
                name=""
                id="playerName"
                minLength="1"
                maxLength="20"
              />
              <button onClick={submitScore}>Submit score</button>
            </form>
          ) : (
            <div>
              <p>
                You finished in {timer} seconds! Can you make it to the top 10?
              </p>
              <button onClick={navToScoreboard}>View scoreboard</button>
            </div>
          )}
        </div>
      )}

      <div className="gameBoard">
        {tileSet.map((tile) => {
          return (
            <div
              className="gameTile"
              key={tile.key}
              id={tile.key}
              onClick={clickTile}
            >
              {/* {tile.key} */}
              {currentTile == tile.key && <div id="targetMarker"></div>}
              {foundTiles.includes(tile.key) && (
                <div className="checkmark"></div>
              )}
            </div>
          );
        })}
      </div>
      {/* //TODO: add function to clear all game data + navToHome */}
      <button onClick={navToHome}>Return Home</button>
    </div>
  );
}

export default GameScreen;
