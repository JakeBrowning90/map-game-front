function ScoreScreen({ returnHome }) {

  // Test Array, change to fetch
  const players = [
    { name: "Ann", score: 12000 },
    { name: "Ben", score: 11000 },
    { name: "Cal", score: 10000 },
  ];

  return (
    <div className="scoreScreen">
      <h1>Score Screen</h1>

      <ol>
      {players.map((player) => {
        return <li key={player}>{player.name}: {player.score}</li>
      })}
      </ol>

      <button onClick={returnHome}>Return Home</button>
    </div>
  );
}

export default ScoreScreen;
