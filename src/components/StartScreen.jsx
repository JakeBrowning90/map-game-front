function StartScreen({ navToScoreboard, navToGame, drawTileSet }) {
  const startGame = () => {
    navToGame();
    drawTileSet();
  };
  return (
    <div className="startScreen">
      <h1 className="screenTitle">US Capitals</h1>
      <ul className="screenBody">
        <li>Correctly identify all the cities marked on the map as quickly as possible.</li>
        <li>Click on a star to see a list of city names. Click the map again to hide the list.</li>
        <li>Select carefully: incorrect guesses are penalized!</li>
      </ul>
      <button onClick={startGame}>Start Game</button>
      <button onClick={navToScoreboard}>Leaderboard</button>
    </div>
  );
}

export default StartScreen;
