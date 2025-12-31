import { useState, useEffect } from "react";
import { differenceInSeconds, startOfYear, addYears } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
  targetDate: Date;
}

export function CountdownTimer({ onComplete, targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // differenceInSeconds works with Date objects, which are inherently UTC but initialized with local time here
      const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

      if (diffInSeconds <= 0) {
        onComplete();
        return;
      }

      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = Math.floor(diffInSeconds % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 w-full max-w-4xl mx-auto px-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  // Format with leading zero
  const formattedValue = value < 10 ? `0${value}` : value;

  return (
    <div className="flex flex-col items-center">
      <div className="relative glass-card rounded-2xl p-4 sm:p-6 md:p-8 min-w-[100px] sm:min-w-[140px] md:min-w-[180px] text-center border-t border-primary/20 shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="block text-4xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60 font-mono tracking-tighter"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 rounded-tl-lg m-2" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50 rounded-tr-lg m-2" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50 rounded-bl-lg m-2" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 rounded-br-lg m-2" />
      </div>
      <span className="mt-4 text-sm sm:text-base md:text-lg font-medium text-muted-foreground uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}
