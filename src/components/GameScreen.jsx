function GameScreen({ abortGame }) {
  return (
    <div className="gameScreen">
      <h1>Game Screen</h1>
      <button onClick={abortGame}>Return Home</button>
    </div>
  );
}

export default GameScreen;
