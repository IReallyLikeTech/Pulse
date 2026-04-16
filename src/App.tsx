import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, Briefcase, Moon, BellRing, Settings, X, Check, Volume2, Sun, Sparkles, Wind, Waves as WavesIcon } from 'lucide-react';

type Mode = 'work' | 'shortBreak' | 'longBreak';
type AnimationTheme = 'orbs' | 'bubbles' | 'waves';

const DEFAULT_DURATIONS: Record<Mode, number> = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

const MODES: Record<Mode, { label: string; icon: any }> = {
  work: { label: 'Work', icon: Briefcase },
  shortBreak: { label: 'Short Break', icon: Coffee },
  longBreak: { label: 'Long Break', icon: Moon },
};

const ANIMATION_THEMES: { id: AnimationTheme; label: string; icon: any }[] = [
  { id: 'orbs', label: 'Floating Orbs', icon: Wind },
  { id: 'bubbles', label: 'Gentle Bubbles', icon: Sparkles },
  { id: 'waves', label: 'Flowing Waves', icon: WavesIcon },
];

const NOTIFICATION_SOUNDS = [
  { id: 'bell', label: 'Classic Bell', url: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
  { id: 'chime', label: 'Soft Chime', url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
  { id: 'marimba', label: 'Gentle Marimba', url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
  { id: 'pulse', label: 'Minimal Pulse', url: 'https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3' },
];

function Orbs({ isActive }: { isActive: boolean }) {
  return (
    <>
      <motion.div
        animate={{
          x: isActive ? [0, 100, -100, 0] : [0, 30, -30, 0],
          y: isActive ? [10, -50, 50, 10] : [10, -10, 10, 10],
          scale: isActive ? [1.1, 1.4, 0.8, 1.1] : [1.1, 1.15, 1.05, 1.1],
        }}
        transition={{ duration: isActive ? 15 : 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] opacity-[0.35] dark:opacity-[0.2] blur-[80px] rounded-full bg-primary-container"
      />
      <motion.div
        animate={{
          x: isActive ? [0, -120, 80, 0] : [0, -40, 40, 0],
          y: isActive ? [0, 80, -40, 0] : [0, 20, -20, 0],
          scale: isActive ? [1, 0.7, 1.2, 1] : [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: isActive ? 18 : 30, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-15%] right-[-10%] w-[100%] h-[100%] opacity-[0.3] dark:opacity-[0.18] blur-[100px] rounded-full bg-secondary-container"
      />
      <motion.div
        animate={{
          scale: isActive ? [1, 1.3, 1] : [1, 1.05, 1],
          opacity: isActive ? [0.2, 0.4, 0.2] : [0.15, 0.2, 0.15],
        }}
        transition={{ duration: isActive ? 4 : 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[120px] rounded-full bg-tertiary-container"
      />
    </>
  );
}

function Bubbles({ isActive }: { isActive: boolean }) {
  const bubbles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0">
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110%", x: `${Math.random() * 100}%`, scale: Math.random() * 0.5 + 0.5, opacity: 0 }}
          animate={{
            y: "-10%",
            opacity: [0, 0.4, 0],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
          }}
          transition={{
            duration: isActive ? Math.random() * 10 + 5 : Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
          className="absolute w-24 h-24 rounded-full bg-primary-container/40 blur-xl"
          style={{ backgroundColor: i % 2 === 0 ? 'var(--color-primary-container)' : 'var(--color-secondary-container)' }}
        />
      ))}
    </div>
  );
}

function Waves({ isActive }: { isActive: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      {[1, 2, 3].map((layer) => (
        <motion.div
          key={layer}
          animate={{
            x: ["-50%", "0%", "-50%"],
            scaleY: isActive ? [1, 1.2, 1] : [1, 1.05, 1],
            y: isActive ? [0, -20, 0] : [0, -5, 0],
          }}
          transition={{
            duration: (10 + layer * 5) / (isActive ? 1.5 : 1),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-[-100%] w-[300%] h-[40vh] opacity-[0.15] dark:opacity-[0.1] blur-3xl"
          style={{
            backgroundColor: layer === 1 ? 'var(--color-primary-container)' : layer === 2 ? 'var(--color-secondary-container)' : 'var(--color-tertiary-container)',
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            zIndex: -layer,
          }}
        />
      ))}
    </div>
  );
}

function CalmingBackground({ isActive, progress, theme }: { isActive: boolean; progress: number; theme: AnimationTheme }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-surface transition-colors duration-700">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {theme === 'orbs' && <Orbs isActive={isActive} />}
          {theme === 'bubbles' && <Bubbles isActive={isActive} />}
          {theme === 'waves' && <Waves isActive={isActive} />}
        </motion.div>
      </AnimatePresence>

      {/* High-frequency subtle shimmer */}
      {isActive && (
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="absolute inset-0 bg-primary/5 mix-blend-overlay"
        />
      )}

      {/* Dynamic progress bar subtle background */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1.5 bg-primary/30"
        initial={{ width: 0 }}
        animate={{ width: `${100 - progress}%` }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>('work');
  const [durations, setDurations] = useState<Record<Mode, number>>(() => {
    const saved = localStorage.getItem('pulse-durations');
    return saved ? JSON.parse(saved) : DEFAULT_DURATIONS;
  });
  const [timeLeft, setTimeLeft] = useState(durations.work * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempDurations, setTempDurations] = useState(durations);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('pulse-dark-mode') === 'true';
  });
  const [animationTheme, setAnimationTheme] = useState<AnimationTheme>(() => {
    return (localStorage.getItem('pulse-animation-theme') as AnimationTheme) || 'orbs';
  });
  const [tempAnimationTheme, setTempAnimationTheme] = useState(animationTheme);
  const [selectedSoundId, setSelectedSoundId] = useState(() => {
    return localStorage.getItem('pulse-sound') || 'bell';
  });
  const [tempSoundId, setTempSoundId] = useState(selectedSoundId);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('pulse-durations', JSON.stringify(durations));
    if (!isActive) {
      setTimeLeft(durations[mode] * 60);
    }
  }, [durations, mode]);

  useEffect(() => {
    const sound = NOTIFICATION_SOUNDS.find(s => s.id === selectedSoundId);
    if (sound) {
      audioRef.current = new Audio(sound.url);
      localStorage.setItem('pulse-sound', selectedSoundId);
    }
  }, [selectedSoundId]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pulse-dark-mode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
    }
    
    if (mode === 'work') {
      setSessionsCompleted((prev) => prev + 1);
    }
    
    // Notification vibration if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durations[mode] * 60);
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(durations[newMode] * 60);
  };

  const saveSettings = () => {
    setDurations(tempDurations);
    setSelectedSoundId(tempSoundId);
    setAnimationTheme(tempAnimationTheme);
    localStorage.setItem('pulse-animation-theme', tempAnimationTheme);
    setIsSettingsOpen(false);
  };

  const playPreview = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(e => console.log('Audio preview blocked:', e));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (durations[mode] * 60)) * 100;

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between p-8 bg-surface text-on-surface transition-colors duration-700 overflow-hidden">
      <CalmingBackground isActive={isActive} progress={progress} theme={animationTheme} />

      {/* Header / Mode Selection */}
      <header className="w-full max-w-md flex flex-col items-center gap-6 mt-4 relative z-20">
        <div className="w-full flex justify-between items-center px-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-surface-variant/50 transition-colors"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <Sun size={24} className="text-on-surface-variant" /> : <Moon size={24} className="text-on-surface-variant" />}
          </button>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold tracking-tight text-on-surface/80"
          >
            Pulse
          </motion.h1>
          <button
            onClick={() => {
              setTempDurations(durations);
              setIsSettingsOpen(true);
            }}
            className="p-2 rounded-full hover:bg-surface-variant/50 transition-colors"
            title="Settings"
          >
            <Settings size={24} className="text-on-surface-variant" />
          </button>
        </div>
        
        <div className="flex bg-surface-variant/30 p-1 rounded-full gap-1">
          {(Object.keys(MODES) as Mode[]).map((m) => {
            const Icon = MODES[m].icon;
            const isSelected = mode === m;
            return (
              <button
                key={m}
                id={`mode-${m}`}
                onClick={() => changeMode(m)}
                className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isSelected ? 'text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="mode-bg"
                    className="absolute inset-0 bg-primary-container rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={16} className="relative z-10" />
                <span className="relative z-10">{MODES[m].label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Timer Display */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-8 md:gap-12 relative z-20">
        <div className="relative flex items-center justify-center w-64 h-64 xs:w-72 xs:h-72 md:w-80 md:h-80">
          {/* Circular Progress Container */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              className="stroke-secondary-container fill-none"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="46%"
              className="stroke-primary fill-none transition-colors duration-700"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="100 100"
              initial={{ pathLength: 1 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Time Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={timeLeft}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl xs:text-7xl md:text-8xl font-bold tracking-tighter"
            >
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </motion.div>
            <motion.div 
              animate={{ opacity: isActive ? 1 : 0.5 }}
              className="text-xs xs:text-sm font-medium uppercase tracking-[0.2em] mt-2 text-on-surface-variant"
            >
              {isActive ? 'Flowing' : 'Paused'}
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 md:gap-8">
          <button
            id="reset-btn"
            onClick={resetTimer}
            className="p-3 md:p-4 rounded-full bg-secondary-container text-on-secondary-container hover:scale-110 active:scale-95 transition-all duration-200"
            title="Reset"
          >
            <RotateCcw size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            id="start-pause-btn"
            onClick={toggleTimer}
            className="w-16 h-16 md:w-20 md:h-20 rounded-[20px] md:rounded-[24px] bg-primary-container text-on-primary-container shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
                >
                  <Pause size={28} className="md:w-8 md:h-8" fill="currentColor" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, rotate: -45, opacity: 0 }}
                >
                  <Play size={28} className="md:w-8 md:h-8 ml-1" fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={handleComplete}
            className="p-3 md:p-4 rounded-full bg-tertiary-container text-on-tertiary-container hover:scale-110 active:scale-95 transition-all duration-200"
            title="Force Complete"
          >
            <BellRing size={20} className="md:w-6 md:h-6" />
          </button>
        </div>
      </main>

      {/* Footer / Stats */}
      <footer className="w-full max-w-md flex flex-col items-center gap-4 mb-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">
            Sessions completed today
          </span>
          <span className="text-4xl font-bold text-primary transition-colors duration-700">
            {sessionsCompleted}
          </span>
        </motion.div>
        
        {/* Subtle decorative quote or hint */}
        <p className="text-xs text-on-surface-variant/40 font-medium italic">
          "Focus is a quiet power."
        </p>
      </footer>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-on-background/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-surface p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl border border-outline/10 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 md:mb-8 sticky top-0 bg-surface z-10 py-2">
                <h2 className="text-xl font-bold tracking-tight">Settings</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-variant/50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {/* Durations Section */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <Check size={14} /> Durations
                  </h3>
                  {(Object.keys(MODES) as Mode[]).map((m) => (
                    <div key={m} className="flex flex-col gap-3">
                      <div className="flex justify-between items-center text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                        <span>{MODES[m].label}</span>
                        <span className="text-primary">{tempDurations[m]} min</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="60"
                        value={tempDurations[m]}
                        onChange={(e) => setTempDurations({ ...tempDurations, [m]: parseInt(e.target.value) })}
                        className="w-full h-2 bg-secondary-container rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  ))}
                </div>

                {/* Ambient Mode Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <Sparkles size={14} /> Ambient Theme
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {ANIMATION_THEMES.map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setTempAnimationTheme(theme.id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                            tempAnimationTheme === theme.id 
                              ? 'border-primary bg-primary-container text-on-primary-container font-semibold' 
                              : 'border-outline/10 bg-surface-variant/20 text-on-surface-variant'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={18} />
                            <span>{theme.label}</span>
                          </div>
                          {tempAnimationTheme === theme.id && <Check size={18} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sounds Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <Volume2 size={14} /> Notification Sound
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {NOTIFICATION_SOUNDS.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => {
                          setTempSoundId(sound.id);
                          playPreview(sound.url);
                        }}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                          tempSoundId === sound.id 
                            ? 'border-primary bg-primary-container text-on-primary-container font-semibold' 
                            : 'border-outline/10 bg-surface-variant/20 text-on-surface-variant'
                        }`}
                      >
                        <span>{sound.label}</span>
                        {tempSoundId === sound.id && <Check size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 md:mt-12 flex gap-4 sticky bottom-0 bg-surface py-4 border-t border-outline/10">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-full font-bold text-sm bg-surface-variant text-on-surface-variant hover:opacity-80 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSettings}
                  className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-full font-bold text-sm bg-primary text-on-primary shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Check size={18} />
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
