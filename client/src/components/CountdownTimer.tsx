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
    <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 w-full max-w-5xl mx-auto px-2 sm:px-4">
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
    <div className="flex flex-col items-center min-w-0">
      <div className="relative glass-card rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-8 w-full text-center border-t border-primary/20 shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)] aspect-square flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="block text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60 font-mono tracking-tighter"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
        
        {/* Decorative elements - hidden on small screens to save space */}
        <div className="absolute top-0 left-0 w-1 sm:w-2 h-1 sm:h-2 border-t border-l border-primary/30 rounded-tl-sm m-1 sm:m-2" />
        <div className="absolute top-0 right-0 w-1 sm:w-2 h-1 sm:h-2 border-t border-r border-primary/30 rounded-tr-sm m-1 sm:m-2" />
        <div className="absolute bottom-0 left-0 w-1 sm:w-2 h-1 sm:h-2 border-b border-l border-primary/30 rounded-bl-sm m-1 sm:m-2" />
        <div className="absolute bottom-0 right-0 w-1 sm:w-2 h-1 sm:h-2 border-b border-r border-primary/30 rounded-br-sm m-1 sm:m-2" />
      </div>
      <span className="mt-2 sm:mt-4 text-[10px] sm:text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest truncate w-full text-center">
        {label}
      </span>
    </div>
  );
}
