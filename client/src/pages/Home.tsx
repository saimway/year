import { useState, useEffect } from "react";
import { addYears, startOfYear, getYear } from "date-fns";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { Sparkles, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const now = new Date();
    // Use local timezone by default with Date constructor
    const currentYear = now.getFullYear();
    const nextYearDate = new Date(currentYear + 1, 0, 1, 0, 0, 0);
    return nextYearDate;
  });

  const [isCelebrationMode, setIsCelebrationMode] = useState(false);
  const [celebrationYear, setCelebrationYear] = useState<number>(() => {
    const now = new Date();
    return now.getFullYear() + 1;
  });

  useEffect(() => {
    const checkCelebrationWindow = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target 12:00:00 AM of the upcoming year
      const target = new Date(currentYear + 1, 0, 1, 0, 0, 0);
      const diffSeconds = (now.getTime() - target.getTime()) / 1000;

      // If we are within the first 5 minutes of the new year (0 to 300 seconds after target)
      if (diffSeconds >= 0 && diffSeconds <= 5 * 60) {
        setCelebrationYear(currentYear + 1);
        setIsCelebrationMode(true);
      }
      
      // Also check if we just passed a year and are in the first 5 mins of Jan 1st CURRENT year
      const currentJan1 = new Date(currentYear, 0, 1, 0, 0, 0);
      const currentDiffSeconds = (now.getTime() - currentJan1.getTime()) / 1000;
      if (currentDiffSeconds >= 0 && currentDiffSeconds <= 5 * 60) {
        setCelebrationYear(currentYear);
        setIsCelebrationMode(true);
      }
    };

    checkCelebrationWindow();
  }, []);

  // Logic to handle 5-minute celebration timer
  useEffect(() => {
    if (isCelebrationMode) {
      // After 5 minutes, reset to countdown for the NEXT year
      const timer = setTimeout(() => {
        setIsCelebrationMode(false);
        const nextTarget = new Date(targetDate);
        nextTarget.setFullYear(nextTarget.getFullYear() + 1);
        setTargetDate(nextTarget);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [isCelebrationMode, targetDate]);

  const handleCountdownComplete = () => {
    setCelebrationYear(targetDate.getFullYear());
    setIsCelebrationMode(true);
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle animated gradient orbs */}
        <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Animated stars/particles (CSS only for performance) */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-12 sm:gap-16 md:gap-24">
        
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-primary/80 font-medium uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            <span>The Big Moment Awaits</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 drop-shadow-lg">
            New Year Countdown
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Experience the magic as the world transitions into <span className="text-primary font-semibold">{getYear(targetDate)}</span>.
          </p>
        </motion.header>

        {/* Countdown Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full"
        >
          <CountdownTimer 
            targetDate={targetDate} 
            onComplete={handleCountdownComplete} 
          />
        </motion.div>

        {/* Footer info */}
        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-6"
        >
          <p className="text-xs text-muted-foreground/40 font-mono">
             DESIGNED FOR THE NEW ERA
          </p>
        </motion.footer>

      </main>

      {/* Overlay takes over screen when active */}
      {isCelebrationMode && <CelebrationOverlay year={celebrationYear} />}

    </div>
  );
}
