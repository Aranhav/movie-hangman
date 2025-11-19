import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Lightbulb, X, Keyboard, Settings } from 'lucide-react';

// --- Game Data (Expanded & Contextual) ---
const GAME_DATA = {
  BOLLYWOOD: [
    { word: "SHOLAY", hint: "Kitne aadmi the?" },
    { word: "DANGAL", hint: "Mhari chhoriyan chhoron se kam hai ke?" },
    { word: "LAGAAN", hint: "Teen guna lagaan dena padega." },
    { word: "THREE IDIOTS", hint: "All is well!" },
    { word: "DDLJ", hint: "Jaa Simran jaa, jee le apni zindagi." },
    { word: "BAHUBALI", hint: "Katappa ne kyu maara?" },
    { word: "PK", hint: "Wrong number lag gaya." },
    { word: "GULLY BOY", hint: "Apna time aayega." },
    { word: "HERA PHERI", hint: "Paisa hi paisa hoga!" },
    { word: "MUGHAL E AZAM", hint: "Pyaar kiya toh darna kya." },
    { word: "DON", hint: "11 mulkon ki police isse dhund rahi hai." },
    { word: "BRAHMASTRA", hint: "Fire... Button... Shiva!" },
    { word: "KABIR SINGH", hint: "Preeti!!!" },
    { word: "MUNNA BHAI MBBS", hint: "Jadoo ki jhappi." },
    { word: "OM SHANTI OM", hint: "Ek chutki sindoor." },
    { word: "ZNMD", hint: "Bagwati - short form." },
    { word: "KKHH", hint: "Pyaar dosti hai - short form." },
    { word: "ANDAZ APNA APNA", hint: "Teja main hoon, mark idhar hai." },
    { word: "CHENNAI EXPRESS", hint: "Don't underestimate the power of a common man." },
    { word: "WASSEYPUR", hint: "Tumse na ho payega - short form." }
  ],
  FOOD: [
    { word: "BIRYANI", hint: "The king of rice dishes, Hyderabadi vs Kolkata wars." },
    { word: "PANI PURI", hint: "Gol gappa, puchka, water balls - street food queen." },
    { word: "VADA PAV", hint: "Mumbai's own burger." },
    { word: "DOSA", hint: "South Indian crepe, potato filling inside." },
    { word: "SAMOSA", hint: "Triangular fried pastry, chai's best friend." },
    { word: "BUTTER CHICKEN", hint: "Creamy tomato gravy, originated in Delhi." },
    { word: "GULAB JAMUN", hint: "Sweet fried dough balls soaked in syrup." },
    { word: "RASGULLA", hint: "Spongy white balls from Bengal." },
    { word: "CHOLE BHATURE", hint: "Spicy chickpeas with fluffy fried bread." },
    { word: "PAV BHAJI", hint: "Mashed vegetable curry with buttered bread." },
    { word: "DHOKLA", hint: "Steamed gram flour snack from Gujarat." },
    { word: "MOMOS", hint: "Steamed dumplings, red spicy chutney mandatory." },
    { word: "LITTI CHOKHA", hint: "Pride of Bihar, baked dough balls." },
    { word: "JALEBI", hint: "Spiral, orange, sweet and sticky." },
    { word: "RAJMA CHAWAL", hint: "Sunday comfort food for North Indians." },
    { word: "IDLI", hint: "Steamed rice cakes, healthiest breakfast." }
  ],
  CRICKET: [
    { word: "SACHIN", hint: "God of Cricket." },
    { word: "KOHLI", hint: "The Run Machine, King." },
    { word: "DHONI", hint: "Captain Cool, finishes off in style." },
    { word: "ROHIT", hint: "Hitman, loves double centuries." },
    { word: "WORLD CUP", hint: "The trophy everyone wants every 4 years." },
    { word: "IPL", hint: "Indian cash-rich league." },
    { word: "YORKER", hint: "Toe-crushing delivery." },
    { word: "GOOGLY", hint: "Looks like leg spin, goes the other way." },
    { word: "WANKHEDE", hint: "Stadium where 2011 history was made." },
    { word: "EDEN GARDENS", hint: "Kolkata's massive stadium." },
    { word: "GABBA", hint: "Where the streak was broken in Australia." },
    { word: "BUMRAH", hint: "Unorthodox action, lethal yorkers." },
    { word: "KAPIL DEV", hint: "1983 World Cup winning captain." },
    { word: "DRAVID", hint: "The Wall, Mr. Dependable." }
  ],
  SLANG: [
    { word: "JUGAAD", hint: "A flexible approach to problem-solving." },
    { word: "BINDAAS", hint: "Carefree, cool, relaxed." },
    { word: "VELLA", hint: "Someone with absolutely no work." },
    { word: "DHAKKAN", hint: "Fool or idiot (literally a lid)." },
    { word: "PATAKA", hint: "Firecracker, or someone looking stunning." },
    { word: "CHAI PANI", hint: "Code word for a small bribe or tip." },
    { word: "TENSION", hint: "Stress, worry (don't take it)." },
    { word: "PAISA VASOOL", hint: "Value for money." },
    { word: "BHAI", hint: "Brother, friend, or gangster." },
    { word: "KHADOOS", hint: "Grumpy person." },
    { word: "CHAMPU", hint: "Oily hair, nerdy look." },
    { word: "FATTU", hint: "Coward." },
    { word: "BAKCHODI", hint: "Nonsense talk, timepass." },
    { word: "MAST", hint: "Cool, awesome, great." }
  ],
  PLACES: [
    { word: "TAJ MAHAL", hint: "Symbol of love in Agra." },
    { word: "GOA", hint: "Plans are made here but never happen." },
    { word: "VARANASI", hint: "Spiritual capital, Ghats of Ganga." },
    { word: "LADAKH", hint: "Pangong Lake, bikers paradise." },
    { word: "KERALA", hint: "God's own country." },
    { word: "JAIPUR", hint: "The Pink City." },
    { word: "MUMBAI", hint: "City of Dreams, never sleeps." },
    { word: "DELHI", hint: "Dilwalon ki... also traffic." },
    { word: "MANALI", hint: "Snow, mountains, honeymoon destination." },
    { word: "RISHIKESH", hint: "Yoga capital, river rafting." },
    { word: "DARJEELING", hint: "Famous for tea and toy train." },
    { word: "BANGALORE", hint: "Silicon Valley of India, stuck in traffic." },
    { word: "KOLKATA", hint: "City of Joy." }
  ]
};

const MESSAGES = {
  win: ["Shabash!", "Ek number!", "Kya baat hai!", "Nailed it!", "Badhai ho!", "Full power!"],
  lose: ["Arre yaar!", "Ab kya hoga?", "Game over!", "So close!", "Try again!"],
  start: ["Chalo shuru!", "Let's play!", "Guess karo!", "Dimag lagao!"]
};

// Keyboard Layouts
const KEYBOARD_LAYOUTS = {
  QWERTY: [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ],
  ABCD: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
  ]
};

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 z-[-1] bg-black w-full h-full">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
  </div>
);

const HangmanFigure = ({ wrongGuesses, shake }) => {
  const strokeColor = "#e4e4e7";

  return (
    <div className={`relative w-48 h-56 mx-auto flex items-center justify-center opacity-90 transition-transform ${shake ? 'animate-shake' : ''}`}>
      <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible">
        {/* Base */}
        <line x1="20" y1="230" x2="180" y2="230" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="230" x2="60" y2="20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="20" x2="140" y2="20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="20" x2="140" y2="50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        {/* Head */}
        {wrongGuesses >= 1 && (
          <circle cx="140" cy="70" r="20" stroke={strokeColor} strokeWidth="2" fill="transparent" className="animate-draw" />
        )}
        {/* Body */}
        {wrongGuesses >= 2 && (
          <line x1="140" y1="90" x2="140" y2="150" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="animate-draw" />
        )}
        {/* Left Arm */}
        {wrongGuesses >= 3 && (
          <line x1="140" y1="100" x2="110" y2="130" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="animate-draw" />
        )}
        {/* Right Arm */}
        {wrongGuesses >= 4 && (
          <line x1="140" y1="100" x2="170" y2="130" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="animate-draw" />
        )}
        {/* Left Leg */}
        {wrongGuesses >= 5 && (
          <line x1="140" y1="150" x2="120" y2="190" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="animate-draw" />
        )}
        {/* Right Leg */}
        {wrongGuesses >= 6 && (
          <line x1="140" y1="150" x2="160" y2="190" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="animate-draw" />
        )}
      </svg>
    </div>
  );
};

const Confetti = ({ active }) => {
  if (!active) return null;
  const particles = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            backgroundColor: ['#ffffff', '#a1a1aa', '#71717a', '#52525b'][i % 4],
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1.5 + Math.random()}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  // Game State
  const [category, setCategory] = useState('BOLLYWOOD');
  const [currentWordObj, setCurrentWordObj] = useState({ word: '', hint: '' });
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState(MESSAGES.start[0]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState('QWERTY');
  const [usedWords, setUsedWords] = useState(new Set());
  const [shake, setShake] = useState(false);

  const gameContainerRef = useRef(null);

  const MAX_MISTAKES = 6;

  // Select random word avoiding recently used ones
  const selectRandomWordObj = useCallback((cat) => {
    const words = GAME_DATA[cat];
    const availableWords = words.filter(w => !usedWords.has(w.word));

    // Reset used words if we've gone through most of them
    if (availableWords.length === 0) {
      setUsedWords(new Set());
      return words[Math.floor(Math.random() * words.length)];
    }

    return availableWords[Math.floor(Math.random() * availableWords.length)];
  }, [usedWords]);

  // Initialize / Reset
  const startNewGame = useCallback((newCategory = category) => {
    const newWordObj = selectRandomWordObj(newCategory);

    // Track used words
    setUsedWords(prev => new Set([...prev, newWordObj.word]));

    setCategory(newCategory);
    setCurrentWordObj(newWordObj);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
    setShowCategoryModal(false);
    setHintRevealed(false);
    setShake(false);

    const startMsgs = MESSAGES.start;
    setMessage(startMsgs[Math.floor(Math.random() * startMsgs.length)]);
  }, [category, selectRandomWordObj]);

  // Handle letter guess
  const handleGuess = useCallback((letter) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessed);

    if (!currentWordObj.word.includes(letter)) {
      // Wrong guess
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);

      if (newWrong >= MAX_MISTAKES) {
        setGameStatus('lost');
        setMessage(MESSAGES.lose[Math.floor(Math.random() * MESSAGES.lose.length)]);
        setStreak(0);
      }
    } else {
      // Correct guess - check win
      const lettersToGuess = currentWordObj.word.split('').filter(c => c !== ' ');
      const isWon = lettersToGuess.every(l => newGuessed.has(l));

      if (isWon) {
        setGameStatus('won');
        const winMsg = MESSAGES.win[Math.floor(Math.random() * MESSAGES.win.length)];
        setMessage(winMsg);

        // Score: base 100, -30 for hint, +10 per streak
        const baseScore = hintRevealed ? 70 : 100;
        const streakBonus = streak * 10;
        setScore(s => s + baseScore + streakBonus);
        setStreak(s => s + 1);
      }
    }
  }, [gameStatus, guessedLetters, currentWordObj.word, wrongGuesses, hintRevealed, streak]);

  const revealHint = useCallback(() => {
    if (gameStatus === 'playing' && !hintRevealed) {
      setHintRevealed(true);
    }
  }, [gameStatus, hintRevealed]);

  const toggleLayout = useCallback(() => {
    setKeyboardLayout(prev => prev === 'QWERTY' ? 'ABCD' : 'QWERTY');
  }, []);

  // Change category (resets streak)
  const handleCategoryChange = useCallback((newCat) => {
    setStreak(0);
    setUsedWords(new Set());
    startNewGame(newCat);
  }, [startNewGame]);

  // Initialize game
  useEffect(() => {
    startNewGame('BOLLYWOOD');
  }, []);

  // Keyboard handler
  useEffect(() => {
    const handleKeydown = (e) => {
      if (showCategoryModal) return;

      const char = e.key.toUpperCase();
      if (char >= 'A' && char <= 'Z') {
        handleGuess(char);
      }

      // Escape to close modal
      if (e.key === 'Escape' && showCategoryModal) {
        setShowCategoryModal(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleGuess, showCategoryModal]);

  // Derived UI values
  const wordLetters = currentWordObj.word.split('');
  const currentLayout = KEYBOARD_LAYOUTS[keyboardLayout];

  // Check if a letter in the word was missed (for game over display)
  const isLetterMissed = (char) => {
    return gameStatus === 'lost' && char !== ' ' && !guessedLetters.has(char);
  };

  // Check keyboard button state
  const getKeyState = (char) => {
    if (!guessedLetters.has(char)) return 'unused';
    if (currentWordObj.word.includes(char)) return 'correct';
    return 'wrong';
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-light font-sans selection:bg-white/20">
      <Background />

      {/* Header */}
      <header className="relative z-10 pt-4 sm:pt-6 px-4 md:px-8 flex justify-between items-center max-w-5xl mx-auto border-b border-white/5 pb-4">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-thin tracking-[0.15em] sm:tracking-[0.2em] text-white uppercase">
            Desi Hangman
          </h1>
          <span className="text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase mt-1">
            {category} Edition
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-end text-[10px] sm:text-xs tracking-widest">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="hidden sm:inline">SCORE</span>
              <span className="sm:hidden">SC</span>
              <span className="text-white font-normal">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="hidden sm:inline">STREAK</span>
              <span className="sm:hidden">ST</span>
              <span className="text-white font-normal">{streak}</span>
            </div>
          </div>

          <button
            onClick={() => setShowCategoryModal(true)}
            className="p-2 sm:px-4 sm:py-2 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors text-xs tracking-widest"
            aria-label="Change theme"
          >
            <span className="hidden sm:inline">THEME</span>
            <Settings size={16} className="sm:hidden" />
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main ref={gameContainerRef} className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">

        {/* Left Column: Drawing & Info */}
        <div className="w-full md:flex-1 flex flex-col items-center">
          <div className="relative bg-zinc-900/30 border border-zinc-800 p-6 sm:p-8 w-full max-w-sm backdrop-blur-sm">
            {/* Lives indicator */}
            <div className="flex justify-between items-center mb-6 sm:mb-8 w-full">
              <span className="text-[10px] font-medium text-zinc-600 tracking-[0.15em]">LIVES</span>
              <div className="flex gap-1">
                {[...Array(MAX_MISTAKES)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-4 sm:w-6 transition-all duration-300 ${
                      i < (MAX_MISTAKES - wrongGuesses) ? 'bg-white' : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <HangmanFigure wrongGuesses={wrongGuesses} shake={shake} />

            {/* Message */}
            <div className="mt-6 sm:mt-8 text-center min-h-[2.5rem]">
              <p className={`text-sm tracking-wide transition-all duration-300 ${
                gameStatus === 'won' ? 'text-white font-normal' :
                gameStatus === 'lost' ? 'text-zinc-500' : 'text-zinc-500'
              }`}>
                {message}
              </p>
            </div>

            {/* Play Again Button (shown inside card on game end) */}
            {gameStatus !== 'playing' && (
              <button
                onClick={() => startNewGame()}
                className="mt-6 w-full py-3 px-6 bg-white text-black font-normal tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors active:scale-95"
                aria-label="Play again"
              >
                <RotateCcw size={16} />
                PLAY AGAIN
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Game Interaction */}
        <div className="w-full md:flex-[1.5] max-w-2xl">

          {/* Word Display */}
          <div className="mb-8 sm:mb-10 flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-4 min-h-[60px] sm:min-h-[80px]">
            {wordLetters.map((char, i) => {
              if (char === ' ') return <div key={i} className="w-3 sm:w-6"></div>;

              const isGuessed = guessedLetters.has(char);
              const isMissed = isLetterMissed(char);
              const showChar = isGuessed || gameStatus === 'lost';

              return (
                <div
                  key={i}
                  className={`
                    flex items-end justify-center w-7 h-10 sm:w-10 sm:h-14 md:w-12 md:h-16
                    border-b-2 font-light text-xl sm:text-2xl md:text-3xl transition-all duration-300
                    ${!showChar ? 'border-zinc-700' :
                      isMissed ? 'border-zinc-600 text-zinc-500' :
                      'border-white text-white'}
                  `}
                >
                  <span className={showChar ? 'opacity-100' : 'opacity-0'}>
                    {char}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="flex justify-between items-start mb-4 sm:mb-6 px-1 gap-4">
            {/* Hint Section */}
            <div className="flex-1 min-w-0">
              {!hintRevealed && gameStatus === 'playing' ? (
                <button
                  onClick={revealHint}
                  className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest text-zinc-500 hover:text-white transition-colors py-2"
                  aria-label="Reveal hint"
                >
                  <Lightbulb size={14} className="shrink-0" />
                  <span>HINT?</span>
                </button>
              ) : hintRevealed ? (
                <div className="text-[11px] sm:text-xs text-zinc-400 italic py-2 pr-2">
                  <span className="flex items-start gap-2">
                    <Lightbulb size={12} className="mt-0.5 shrink-0 text-zinc-600" />
                    <span className="line-clamp-2">{currentWordObj.hint}</span>
                  </span>
                </div>
              ) : null}
            </div>

            {/* Layout Toggle */}
            <button
              onClick={toggleLayout}
              className="shrink-0 flex items-center gap-1.5 text-[10px] tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors uppercase border border-zinc-800 px-2 sm:px-3 py-1.5 sm:py-2"
              aria-label={`Switch to ${keyboardLayout === 'QWERTY' ? 'ABCD' : 'QWERTY'} layout`}
            >
              <Keyboard size={12} />
              <span className="hidden sm:inline">{keyboardLayout}</span>
            </button>
          </div>

          {/* Keyboard */}
          <div className="p-1" role="group" aria-label="Letter keyboard">
            {currentLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                {row.map((char) => {
                  const keyState = getKeyState(char);

                  let btnStyle = "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50";
                  if (keyState === 'correct') {
                    btnStyle = "bg-white text-black border-white";
                  } else if (keyState === 'wrong') {
                    btnStyle = "bg-zinc-900/80 text-zinc-700 border-zinc-800";
                  }

                  return (
                    <button
                      key={char}
                      disabled={keyState !== 'unused' || gameStatus !== 'playing'}
                      onClick={() => handleGuess(char)}
                      className={`
                        h-11 sm:h-12 md:h-14 min-w-[2.2rem] sm:min-w-[2.5rem] md:min-w-[3rem]
                        rounded border text-sm sm:text-base font-light
                        transition-all duration-150 active:scale-95
                        disabled:cursor-not-allowed
                        ${btnStyle}
                      `}
                      aria-label={`Letter ${char}`}
                      aria-pressed={keyState !== 'unused'}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Keyboard shortcut hint */}
          <p className="text-center text-[10px] text-zinc-700 mt-4 tracking-widest hidden md:block">
            USE YOUR KEYBOARD TO TYPE
          </p>
        </div>
      </main>

      {/* Category Modal */}
      {showCategoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setShowCategoryModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-black border border-zinc-800 w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h2 id="modal-title" className="text-xl sm:text-2xl font-thin text-white tracking-[0.15em] mb-2 uppercase">
              Select Theme
            </h2>
            <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest mb-6 sm:mb-8 uppercase">
              Choose your arena
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(GAME_DATA).map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    w-full p-4 sm:p-5 border text-left transition-all duration-200 group active:scale-98
                    ${category === cat
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'}
                  `}
                >
                  <span className="text-xs sm:text-sm font-light tracking-[0.15em] uppercase">
                    {cat}
                  </span>
                  <span className="block text-[10px] mt-1 opacity-60">
                    {GAME_DATA[cat].length} words
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confetti Effect on Win */}
      <Confetti active={gameStatus === 'won'} />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        @keyframes draw {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-draw {
          animation: draw 0.3s ease-out forwards;
        }

        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
