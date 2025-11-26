import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Lightbulb, X, Keyboard, Settings } from 'lucide-react';
import CookieConsent from './components/CookieConsent';

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
  start: [
    "Picture abhi baaki hai!",
    "Khel shuru kiya jaye!",
    "Ready? Action!",
    "Bade bade deshon mein...",
    "Basanti, guess karo!",
    "Mogambo khush hua!",
    "Chalo shuru!",
    "Dimag lagao!"
  ]
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
  <div className="fixed inset-0 z-[-1] paper-pattern-ruled w-full h-full pointer-events-none" />
);

const HangmanFigure = ({ wrongGuesses, shake }) => {
  const strokeColor = "#1e3a8a"; // Blue ink color

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
            backgroundColor: ['#1e3a8a', '#dc2626', '#16a34a', '#d97706'][i % 4],
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1.5 + Math.random()}s`
          }}
        />
      ))}
    </div>
  );
};

const HandDrawnHeart = ({ className, filled }) => (
  <svg viewBox="0 0 100 100" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50,90 C 20,70 0,50 0,30 C 0,10 20,-10 50,20 C 80,-10 100,10 100,30 C 100,50 80,70 50,90 Z" />
    <path d="M 50,90 C 25,70 5,50 5,30 C 5,15 20,5 45,25" fill="none" strokeWidth="2" className="opacity-60" />
  </svg>
);

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
    <div className="min-h-screen text-slate-800 font-hand selection:bg-blue-200">
      <Background />

      {/* Header */}
      <header className="relative z-10 pt-4 sm:pt-6 px-4 md:px-8 flex justify-between items-center max-w-5xl mx-auto border-b-2 border-slate-800/20 pb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide text-blue-900 uppercase transform -rotate-1">
            Desi Hangman
          </h1>
          <span className="text-sm sm:text-base text-slate-600 tracking-widest uppercase mt-1 font-bold">
            {category} Edition
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-end text-xs sm:text-sm tracking-widest font-bold">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="hidden sm:inline">SCORE</span>
              <span className="sm:hidden">SC</span>
              <span className="text-blue-900 text-lg">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="hidden sm:inline">STREAK</span>
              <span className="sm:hidden">ST</span>
              <span className="text-blue-900 text-lg">{streak}</span>
            </div>
          </div>

          <button
            onClick={() => setShowCategoryModal(true)}
            className="p-2 sm:px-4 sm:py-2 border-2 border-slate-800 text-slate-700 hover:text-blue-900 hover:border-blue-900 transition-colors text-sm font-bold tracking-widest scribble-border bg-white/50"
            aria-label="Change theme"
          >
            <span className="hidden sm:inline">CATEGORY</span>
            <Settings size={18} className="sm:hidden" />
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main ref={gameContainerRef} className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">

        {/* Left Column: Drawing & Info */}
        <div className="w-full md:flex-1 flex flex-col items-center">
          <div className="relative p-6 sm:p-8 w-full max-w-sm">
            {/* Lives indicator */}
            <div className="flex justify-between items-center mb-6 sm:mb-8 w-full">
              <span className="text-sm font-bold text-slate-500 tracking-widest">LIVES</span>
              <div className="flex gap-1">
                {[...Array(MAX_MISTAKES - wrongGuesses)].map((_, i) => (
                  <HandDrawnHeart key={i} filled className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 animate-in" />
                ))}
                {[...Array(wrongGuesses)].map((_, i) => (
                  <div key={`lost-${i}`} className="w-6 h-6 sm:w-8 sm:h-8 opacity-50">
                    <HandDrawnHeart className="w-full h-full text-red-950" />
                  </div>
                ))}
              </div>
            </div>

            <HangmanFigure wrongGuesses={wrongGuesses} shake={shake} />

            {/* Message */}
            <div className="mt-6 sm:mt-8 text-center min-h-[3rem]">
              <p className={`text-xl sm:text-2xl tracking-wide transition-all duration-300 font-bold transform -rotate-1 ${gameStatus === 'won' ? 'text-green-700' :
                gameStatus === 'lost' ? 'text-red-700' : 'text-slate-600'
                }`}>
                {message}
              </p>
            </div>

            {/* Play Again Button (shown inside card on game end) */}
            {gameStatus !== 'playing' && (
              <button
                onClick={() => startNewGame()}
                className="mt-6 w-full py-3 px-6 bg-blue-900 text-white font-bold tracking-widest text-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors active:scale-95 scribble-border shadow-md"
                aria-label="Play again"
              >
                <RotateCcw size={20} />
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
                    flex items-end justify-center w-8 h-12 sm:w-12 sm:h-16 md:w-14 md:h-20
                    border-b-4 font-bold text-3xl sm:text-4xl md:text-5xl transition-all duration-300
                    ${!showChar ? 'border-slate-400' :
                      isMissed ? 'border-red-400 text-red-600' :
                        'border-blue-900 text-blue-900'}
                  `}
                >
                  <span className={`${showChar ? 'opacity-100' : 'opacity-0'} transform ${Math.random() > 0.5 ? 'rotate-1' : '-rotate-1'}`}>
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
                  className="flex items-center gap-2 text-xs sm:text-sm tracking-widest text-slate-500 hover:text-blue-900 transition-colors py-2 font-bold"
                  aria-label="Reveal hint"
                >
                  <Lightbulb size={16} className="shrink-0" />
                  <span>HINT?</span>
                </button>
              ) : hintRevealed ? (
                <div className="text-sm sm:text-base text-slate-600 italic py-2 pr-2 font-hand font-bold">
                  <span className="flex items-start gap-2">
                    <Lightbulb size={16} className="mt-1 shrink-0 text-yellow-600" />
                    <span className="line-clamp-2">{currentWordObj.hint}</span>
                  </span>
                </div>
              ) : null}
            </div>

            {/* Layout Toggle */}
            <button
              onClick={toggleLayout}
              className="shrink-0 flex items-center gap-1.5 text-xs tracking-widest text-slate-600 hover:text-blue-900 transition-colors uppercase border-2 border-slate-800 px-2 sm:px-3 py-1.5 sm:py-2 font-bold scribble-border bg-white"
              aria-label={`Switch to ${keyboardLayout === 'QWERTY' ? 'ABCD' : 'QWERTY'} layout`}
            >
              <Keyboard size={14} />
              <span className="hidden sm:inline">{keyboardLayout}</span>
            </button>
          </div>

          {/* Keyboard */}
          <div className="p-1" role="group" aria-label="Letter keyboard">
            {currentLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                {row.map((char) => {
                  const keyState = getKeyState(char);

                  let btnStyle = "bg-white text-slate-600 border-slate-300 hover:border-blue-500 hover:text-blue-900";
                  if (keyState === 'correct') {
                    btnStyle = "bg-blue-100 text-blue-900 border-blue-900 font-bold transform -rotate-2";
                  } else if (keyState === 'wrong') {
                    btnStyle = "bg-slate-100 text-slate-300 border-slate-200 decoration-slate-400 line-through";
                  }

                  return (
                    <button
                      key={char}
                      disabled={keyState !== 'unused' || gameStatus !== 'playing'}
                      onClick={() => handleGuess(char)}
                      className={`
                        h-12 sm:h-14 md:h-16 flex-1 sm:flex-none sm:w-12 md:w-14
                        max-w-[2.5rem] sm:max-w-none
                        rounded-sm border-2 text-lg sm:text-2xl font-hand
                        transition-all duration-150 active:scale-95
                        disabled:cursor-not-allowed scribble-border
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setShowCategoryModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-[#fdfbf7] border-2 border-blue-900 w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative scribble-border shadow-xl">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition-colors p-4"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-wide mb-2 uppercase transform -rotate-1">
              Select Category
            </h2>
            <p className="text-sm sm:text-base text-slate-500 tracking-widest mb-6 sm:mb-8 uppercase font-bold">
              Choose your arena
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(GAME_DATA).map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    w-full p-4 sm:p-5 border-2 text-left transition-all duration-200 group active:scale-98 scribble-border
                    ${category === cat
                      ? 'bg-blue-100 text-blue-900 border-blue-900 transform -rotate-1'
                      : 'bg-white text-slate-500 border-slate-300 hover:border-blue-400 hover:text-blue-800'}
                  `}
                >
                  <span className="text-lg sm:text-xl font-bold tracking-wide uppercase">
                    {cat}
                  </span>
                  <span className="block text-xs mt-1 opacity-70 font-sans font-bold">
                    {GAME_DATA[cat].length} words
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-slate-500 text-sm font-hand font-bold tracking-widest">
        <p>POWERED BY <span className="text-blue-900 text-base">KAIROSS</span></p>
        <p className="text-[10px] mt-1 opacity-70">&copy; {new Date().getFullYear()} All Rights Reserved</p>
      </footer>

      {/* GDPR Cookie Consent */}
      <CookieConsent />

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
