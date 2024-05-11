function StartScreen({ startGame, viewScoreboard }) {
  return (
    <div className="startScreen">
      <h1>Start Screen</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={viewScoreboard}>High Scores</button>
    </div>
  );
}

export default StartScreen;
