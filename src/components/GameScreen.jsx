import { useEffect, useState } from "react";

function GameScreen({ abortGame, targetData, tileSet }) {
  const [currentTile, setCurrentTile] = useState();

  const clickTile = (e) => {
    if (!currentTile) {
      setCurrentTile(e.target.id);
      addMarker(e.target);
      toggleTargetList();
    } else {
      setCurrentTile(undefined);
      removeMarker();
      toggleTargetList();
    }
    // console.log(currentTile);
  };

  const addMarker = (tile) => {
    const targetMarker = document.createElement("div");
    targetMarker.setAttribute("id", "targetMarker");
    tile.appendChild(targetMarker);
  };

  const removeMarker = () => {
    const targetMarker = document.querySelector("#targetMarker");
    targetMarker.remove();
  };

  const toggleTargetList = () => {
    const targetNamer = document.querySelector(".gameScreenControls");
    targetNamer.classList.toggle("visible");
  };

  function checkMove() {
    // console.log(currentTile);
    const targetNamer = document.querySelector("#targetNamer");
    let namedTarget = targetNamer.value;
    // console.log(targetData);
    let target = targetData.find(({ name }) => name === namedTarget);
    // console.log(target);
    if (target.location.includes(currentTile)) {
      console.log(`Correct! ${namedTarget} is at ${currentTile}`);
    } else {
      console.log(`Sorry, ${namedTarget} is NOT at ${currentTile}`);
    }
  }

  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>

      <div className="gameScreenControls">
        <div>
          <select name="targetNamer" id="targetNamer">
            {targetData.map((target) => {
              return (
                <option key={target.key} id={target.key}>
                  {target.name}
                </option>
              );
            })}
          </select>
          <button onClick={checkMove}>Check</button>
        </div>
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
              {tile.key}
            </div>
          );
        })}
      </div>

      <button onClick={abortGame}>Return Home</button>
    </div>
  );
}

export default GameScreen;
