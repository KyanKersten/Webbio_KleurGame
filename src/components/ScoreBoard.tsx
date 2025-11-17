function ScoreBoard({ correctAnswers, wrongAnswers, reactionTime }: { correctAnswers: number; wrongAnswers: number; reactionTime: number }) {
  return (
    <div className="text-center text-black mb-4">
      <h1 className="text-green-800">
      Aantal Goed: {correctAnswers} 
      </h1>
      <h1 className="text-red-600">
      Aantal Fout: {wrongAnswers}
      </h1>
      <h1>Reactietijd: {(reactionTime / 1000).toFixed(2)} sec</h1>
    </div>
  );
}

export default ScoreBoard;