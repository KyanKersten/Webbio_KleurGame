function ScoreBoard({ correctAnswers, wrongAnswers }: { correctAnswers: number; wrongAnswers: number }) {
  return (
    <div className="text-center text-black mb-4">
      <h1>
      Aantal Goed: {correctAnswers} - Aantal Fout: {wrongAnswers}
      </h1>
    </div>
  );
}

export default ScoreBoard;