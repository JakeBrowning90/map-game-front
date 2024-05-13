function GameScreen({ abortGame, tileSet, clickTile }) {
  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>
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
