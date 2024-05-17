function ScoreScreen({ navToHome, userData }) {
  return (
    <div className="scoreScreen">
      <h1>Score Screen</h1>

      <ol>
        {userData.map((user) => {
          return (
            <li key={user.id}>
              {user.name}: {user.score}
            </li>
          );
        })}
      </ol>

      <button onClick={navToHome}>Return Home</button>
    </div>
  );
}

export default ScoreScreen;
