import Header from './components/Header';
import ColorGrid from './components/ColorGrid';
import Footer from './components/Footer';
import { COLORS } from "./data/Colors";
import { useState, useEffect } from 'react';

const REVEAL_DURATION = 4; // seconds

import "./index.css";

function App() {
   const [target] = useState(() => COLORS[Math.floor(Math.random()*COLORS.length)]);
   const [acceptingAnswers, setAcceptingAnswers] = useState(true);
   const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState(false);

   useEffect(() => {
     setAcceptingAnswers(true);
     const timer = setTimeout(() => setAcceptingAnswers(false), REVEAL_DURATION * 1000);
     return () => clearTimeout(timer);
   }, []);

   function handleColorClick(color: typeof COLORS[number]) {
      if (!acceptingAnswers) {
        console.log("Time expired.");
        return;
      }

      if (hasAlreadyAnswered) {
        console.log("Already answered.");
        return;
      }

      const correct = color.name === target.name;
      const message = correct ? "Correct!" : `Wrong! It was ${target.name}.`;
      alert(message);

      setHasAlreadyAnswered(true);
   }

  return (
    <div className="min-h-screen flex flex-col">
      <Header color={target} revealDuration={REVEAL_DURATION} />

      <main>
        <ColorGrid onSelect={handleColorClick} />
      </main>

      <Footer />
    </div>
  );
}

export default App
