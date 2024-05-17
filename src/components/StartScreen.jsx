function StartScreen({ navToScoreboard, navToGame, drawTileSet  }) {
  const startGame = () => {
    navToGame()
    drawTileSet()
  }
  return (
    <div className="startScreen">
      <h1>Start Screen</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={navToScoreboard}>High Scores</button>
    </div>
  );
}

export default StartScreen;
