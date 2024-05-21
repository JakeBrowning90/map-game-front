function ScoreScreen({ navToHome, userData }) {
  return (
    <div className="scoreScreen">
      <h1 className="screenTitle"> Leaderboard</h1>

      <ul className="screenBody scoreList">
        {userData.map((user, index) => {
          return (
            <li key={user.id} className="scoreLI">
              <span>{index + 1}. {user.name}</span>
              <span>{user.score}</span>
            </li>
          );
        })}
      </ul>

      <button onClick={navToHome}>Return Home</button>
    </div>
  );
}

export default ScoreScreen;
