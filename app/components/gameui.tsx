import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextGenerateEffect } from "./text-generate-effect";

interface GameUIProps {
  score: number;
  onScoreIncrease: () => void;
}
const words = `COSMIC CUBES`;
export function GameUI({ score, onScoreIncrease }: GameUIProps) {
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-4">
        <motion.h1
          className="text-4xl font-bold text-white shadow-glow select-none"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextGenerateEffect words={words} />
        </motion.h1>
        <motion.div
          className="bg-black bg-opacity-50 rounded-lg p-2 text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Score: {score}
        </motion.div>
      </div>
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-lg p-4 text-white text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            Click the cubes to increase your score!
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded pointer-events-auto"
        onClick={onScoreIncrease}
      >
        Increase Score
      </button>
    </div>
  );
}
