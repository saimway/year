import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useMessages } from "@/hooks/use-messages";

interface CelebrationProps {
  year: number;
}

export function CelebrationOverlay({ year }: CelebrationProps) {
  const { data: messages } = useMessages();
  const [messageIndex, setMessageIndex] = useState(0);

  // Intense fireworks effect
  useEffect(() => {
    const duration = 5 * 60 * 1000; // 5 minutes
    const end = Date.now() + duration;

    const frame = () => {
      // Launch fireworks from random locations
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF4500', '#FFFFFF']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#FF4500', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Initial big burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

  }, []);

  // Carousel for messages
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Change message every 5s

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm overflow-hidden p-4">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="relative z-10 text-center"
      >
        <motion.h1 
          className="text-6xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_0_25px_rgba(234,179,8,0.5)]"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(255,215,0,0.3)",
              "0 0 50px rgba(255,215,0,0.6)",
              "0 0 20px rgba(255,215,0,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {year}
        </motion.h1>
        
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-white mt-4 sm:mt-8 tracking-wide text-glow"
        >
          Happy New Year!
        </motion.h2>

        <div className="mt-12 sm:mt-24 h-24 sm:h-32 flex items-center justify-center max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {messages && messages.length > 0 ? (
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl sm:text-2xl text-muted-foreground font-light px-6 text-center"
              >
                "{messages[messageIndex].content}"
              </motion.p>
            ) : (
              <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-xl text-muted-foreground"
              >
                Let this be your best year yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
