import { useEffect, useState } from "react";

function GameScreen({
  navToHome,
  navToScoreboard,
  targetData,
  setTargetData,
  tileSet,
  userToBeat,
}) {
  const [currentTile, setCurrentTile] = useState();
  const [foundTiles, setFoundTiles] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const clickTile = (e) => {
    if (!gameOver) {
      if (!currentTile) {
        setCurrentTile(e.target.id);
        console.log(e.target.id);
        if (!e.target.id) {
          updateBannerText("You've already found something here!");
        } else {
          updateBannerText("Which city is this?");
        }
      } else {
        resetBoard();
        updateBannerText();
      }
    }
  };

  const checkMove = (e) => {
    // console.log(e.target.id);
    let target = targetData.find(({ name }) => name === e.target.id);
    let splitName = target.name.split(', ')
    let random = Math.floor(Math.random() * target.trivia.length);
    if (target.location.includes(currentTile)) {
      updateBannerText(`Correct! You located ${e.target.id}.`);
      updateTriviaText(`${splitName[1]} fact: ${target.trivia[random]}`);
      setFoundTiles([...foundTiles, currentTile]);
      resetBoard();

      const remainingTargets = targetData.filter(
        (unfound) => unfound.id !== target.id
      );
      if (checkEndgame(remainingTargets)) {
        setGameOver(true);
      }
      setTargetData(remainingTargets);
    } else {
      updateBannerText(`Sorry, try again!`);
      // Penalty for mistake (Change this penalty system?)
      setTimer((timer) => timer + 1001);
      resetBoard();
    }
  };

  const resetBoard = () => {
    setCurrentTile(undefined);
    // removeMarker();
  };

  const updateBannerText = (string) => {
    const banner = document.querySelector(".banner");
    if (string == undefined) {
      banner.textContent = "Click on a star in the image.";
    } else {
      banner.textContent = string;
    }
  };

  const updateTriviaText = (string) => {
    const trivia = document.querySelector(".triviaBanner");
    if (string == undefined) {
      trivia.textContent = null;
    } else {
      trivia.textContent = string;
    }
  };

  const checkEndgame = (remaining) => {
    if (remaining.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const updateScoreboard = () => {
    // addUserscore();
    // deleteBeatenScore();
    // navToScoreboard();

    let promise1 = addUserscore();
    let promise2 = deleteBeatenScore();
    Promise.all([promise1, promise2]).then(() => {
      navToScoreboard();
    });
  };

  const addUserscore = () => {
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
    });
  };

  const deleteBeatenScore = () => {
    fetch(`http://localhost:3000/users/${userToBeat.id}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //If NOT gameover, run timer
  useEffect(() => {
    if (!gameOver) {
      const key = setInterval(() => {
        setTimer((timer) => timer + 100);
      }, 1000);

      return () => {
        clearInterval(key);
      };
    }
  }, [gameOver]);

  return (
    <div className="gameScreen">
      {/* 1 */}
      <div className="gameStatus">
        <p>Time: {timer}</p>
        <p>Remaining: {targetData.length} </p>
      </div>
      {/* 2 */}
      <p className="triviaBanner"></p>
      {/* 3 */}
      <div className="gameScreenSidebar">
        <p className="banner">Click on a star in the image.</p>
        {!gameOver ? (
          <div className="gameScreenControls">
            {currentTile && (
              // <div className="targetForm">
              //   <TargetNamer targetData={targetData} />
              //   <button onClick={checkMove}>Check</button>
              // </div>
              <ul className="cityList">
                {targetData.map((target) => {
                  return (
                    <li key={target.id} id={target.name} className="cityChoice"onClick={checkMove}>
                      {target.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <div className="endGameControls">
            {timer < userToBeat.score ? (
              <form className="newScoreForm">
                <p>
                  You finished in the top ten! Add your name to the scoreboard!
                </p>
                <input
                  type="text"
                  name=""
                  id="playerName"
                  minLength="1"
                  maxLength="20"
                />
                <button onClick={updateScoreboard}>Submit score</button>
              </form>
            ) : (
              <div>
                <p>Your score is {timer}! Can you make it to the top ten?</p>
                <button onClick={navToScoreboard}>View scoreboard</button>
              </div>
            )}
          </div>
        )}
      </div>

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
      <button className="cancelGameButton" onClick={navToHome}>
        Return Home
      </button>
    </div>
  );
}

export default GameScreen;
