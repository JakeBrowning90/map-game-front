import { useEffect, useState } from "react";
import TargetNamer from "./TargetNamer";

function GameScreen({ abortGame, tileSet }) {
  const [currentTile, setCurrentTile] = useState();
  const [targetData, setTargetData] = useState([]);
  const [foundTiles, setFoundTiles] = useState([]);

  const clickTile = (e) => {
    if (!currentTile) {
      setCurrentTile(e.target.id);
      // addMarker(e.target);
      toggleTargetForm();
      updateBannerText("What is this?");
    } else {
      resetBoard();
      updateBannerText();
    }
    // console.log(currentTile);
  };

  const toggleTargetForm = () => {
    const targetForm = document.querySelector(".targetForm");
    targetForm.classList.toggle("visible");
  };

  const resetBoard = () => {
    setCurrentTile(undefined);
    // removeMarker();
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

  const checkEndgame = (remaining) => {
    if (remaining.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  function checkMove() {
    const targetNamer = document.querySelector("#targetNamer");
    let namedTarget = targetNamer.value;
    let target = targetData.find(({ name }) => name === namedTarget);
    if (target.location.includes(currentTile)) {
      updateBannerText(`Correct! ${namedTarget} is at ${currentTile}`);
      // addCheckmark();
      setFoundTiles([...foundTiles, currentTile]);

      resetBoard();
      // TODO: Update score/list display

      const remainingTargets = targetData.filter(
        (unfound) => unfound.id !== target.id
      );
      if (checkEndgame(remainingTargets)) {
        alert("Finished!");
      }
      setTargetData(remainingTargets);
    } else {
      updateBannerText(`Sorry, ${namedTarget} is NOT at ${currentTile}`);
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

  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>

      <div className="gameScreenControls">
        <p className="banner">Click on a target in the image.</p>
        <div className="targetForm">
          <TargetNamer targetData={targetData} />
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
              {currentTile == tile.key && <div id="targetMarker"></div>}
              {foundTiles.includes(tile.key) && <div className='checkmark'></div>}
            </div>
          );
        })}
      </div>

      <button onClick={abortGame}>Return Home</button>
    </div>
  );
}

export default GameScreen;
