import { useEffect, useState } from "react";

function GameScreen({ abortGame, targetData, tileSet }) {

  const [currentTile, setCurrentTile] = useState();

  const clickTile = (e) => {
    console.log(e.target.id);
    setCurrentTile(e.target.id)
    let target = targetData.find((object) =>
      object.location.includes(e.target.id)
    );
    if (target == undefined) {
      console.log("No target");
    } else {
      console.log(target.name);
    }
  };

  function checkMove(){
    console.log(currentTile)

    
  }

  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>

      <div className="targetNamer">
        <select name="targetNamer" id="targetNamer">
          {targetData.map((target) => {
            return (
              <option className="gameTile" key={target.key} id={target.key}>
                {target.name}
              </option>
            );
          })}
        </select>
        <button onClick={checkMove}>Check</button>
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
