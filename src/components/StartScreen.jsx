function StartScreen({ navToScoreboard, navToGame, drawTileSet }) {
  const startGame = () => {
    navToGame();
    drawTileSet();
  };
  return (
    <div className="startScreen">
      <h1 className="startTitle">US Capitals</h1>
      <ul className="startUl">
        <li>Correctly identify all the cities marked on the map.</li>
        <li>Click on a star to see a list of city names.</li>
        <li>Think carefully: incorrect guesses are penalized!</li>
      </ul>
      <button onClick={startGame}>Start Game</button>
      <button onClick={navToScoreboard}>Leaderboard</button>
    </div>
  );
}

export default StartScreen;
