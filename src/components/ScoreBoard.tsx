function ScoreBoard({ correctAnswers, wrongAnswers, reactionTime }: { correctAnswers: number; wrongAnswers: number; reactionTime: number }) {
  return (
    <div className="text-center text-black mb-4">
      <h1>
      Aantal Goed: {correctAnswers} - Aantal Fout: {wrongAnswers}
      </h1>
        <h2>Reactietijd: {(reactionTime / 1000).toFixed(2)} sec</h2>
    </div>
  );
}

export default ScoreBoard;