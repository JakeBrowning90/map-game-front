import { useEffect, useState } from "react";

function GameScreen({ abortGame, targetData, setTargetData, tileSet }) {
  const [currentTile, setCurrentTile] = useState();

  const clickTile = (e) => {
    if (!currentTile) {
      setCurrentTile(e.target.id);
      addMarker(e.target);
      toggleTargetForm();
      updateBannerText("What is this?");
    } else {
      resetBoard();
      updateBannerText();
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

  const addCheckmark = () => {
    const correctTile = document.getElementById(`${currentTile}`);
    const checkmark = document.createElement("div");
    checkmark.setAttribute("class", "checkmark");
    correctTile.appendChild(checkmark);
  };

  const toggleTargetForm = () => {
    const targetForm = document.querySelector(".targetForm");
    targetForm.classList.toggle("visible");
  };

  const resetBoard = () => {
    setCurrentTile(undefined);
    removeMarker();
    toggleTargetForm();
  };

  const updateBannerText = (string) => {
    const banner = document.querySelector(".banner");
    if (string == undefined) {
      banner.textContent = "Click on a target in the image.";
    } else {
      banner.textContent = string;
    }
  };

  const removeFoundTarget = (found) => {
    setTargetData(targetData.filter((target) => target.id) !== found);
    console.log(targetData)
  };

  function checkMove() {
    const targetNamer = document.querySelector("#targetNamer");
    let namedTarget = targetNamer.value;
    let target = targetData.find(({ name }) => name === namedTarget);
    console.log(target);
    if (target.location.includes(currentTile)) {
      updateBannerText(`Correct! ${namedTarget} is at ${currentTile}`);
      addCheckmark();
      resetBoard();
      // TODO: Update score/list display
      // TODO: Remove target from list
      removeFoundTarget(target.id)
      // TODO: Check for endgame
    } else {
      updateBannerText(`Sorry, ${namedTarget} is NOT at ${currentTile}`);
      resetBoard();
    }
  }

  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>

      <div className="gameScreenControls">
        <p className="banner">Click on a target in the image.</p>
        <div className="targetForm">
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
