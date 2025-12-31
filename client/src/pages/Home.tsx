import { useState, useEffect } from "react";
import { addYears, startOfYear, getYear } from "date-fns";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { Sparkles, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const now = new Date();
    const nextYear = startOfYear(addYears(now, 1));
    // If it's already Jan 1st 00:00:00, ensure we target next year
    // But for testing/logic, strictly next Jan 1
    return nextYear;
  });

  const [isCelebrationMode, setIsCelebrationMode] = useState(false);
  const [celebrationYear, setCelebrationYear] = useState<number>(() => getYear(new Date()) + 1);

  // Logic to handle 5-minute celebration timer
  useEffect(() => {
    if (isCelebrationMode) {
      // After 5 minutes, reset to countdown for the NEXT year
      const timer = setTimeout(() => {
        setIsCelebrationMode(false);
        setTargetDate((prev) => addYears(prev, 1)); // Prepare for year after next
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [isCelebrationMode]);

  const handleCountdownComplete = () => {
    setCelebrationYear(getYear(targetDate));
    setIsCelebrationMode(true);
  };

  const triggerTestCelebration = () => {
    setCelebrationYear(2025); // Use a fixed year or next year for test
    setIsCelebrationMode(true);
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Test Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={triggerTestCelebration}
          data-testid="button-test-animation"
          className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 px-4 py-2 rounded-lg backdrop-blur-md transition-all active:scale-95 text-xs font-mono uppercase tracking-widest flex items-center gap-2"
        >
          <Sparkles className="w-3 h-3" />
          Test Animation
        </button>
      </div>
      
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Local Timezone Synced
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
               <Music className="w-4 h-4" />
               Audio Responsive
            </div>
          </div>
          
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
