function ScoreScreen({ returnHome, userData }) {

  return (
    <div className="scoreScreen">
      <h1>Score Screen</h1>

      <ol>
      {userData.map((user) => {
        return <li key={user}>{user.name}: {user.score}</li>
      })}
      </ol>

      <button onClick={returnHome}>Return Home</button>
    </div>
  );
}

export default ScoreScreen;
