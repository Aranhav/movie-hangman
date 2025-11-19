import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { RefreshCw, Trophy, Frown, Heart, Film, Lightbulb, RotateCcw, X, Zap } from 'lucide-react';

// --- Massive Movie Bank ---
const MOVIE_DATA = [
  // --- BOLLYWOOD ---
  { word: "SHOLAY", category: "Bollywood Classic" },
  { word: "DILWALE DULHANIA LE JAYENGE", category: "Bollywood Romance" },
  { word: "THREE IDIOTS", category: "Bollywood Comedy" },
  { word: "LAGAAN", category: "Bollywood Sport/Drama" },
  { word: "GANGS OF WASSEYPUR", category: "Bollywood Crime" },
  { word: "ZINDAGI NA MILEGI DOBARA", category: "Bollywood Road Trip" },
  { word: "RANG DE BASANTI", category: "Bollywood Drama" },
  { word: "DANGAL", category: "Bollywood Biopic" },
  { word: "KABHI KHUSHI KABHIE GHAM", category: "Bollywood Drama" },
  { word: "ANDAZ APNA APNA", category: "Bollywood Comedy" },
  { word: "HERA PHERI", category: "Bollywood Comedy" },
  { word: "MUNNA BHAI MBBS", category: "Bollywood Comedy" },
  { word: "BAJRANGI BHAIJAAN", category: "Bollywood Drama" },
  { word: "PK", category: "Bollywood Sci-Fi/Satire" },
  { word: "QUEEN", category: "Bollywood Drama" },
  { word: "OM SHANTI OM", category: "Bollywood Masala" },
  { word: "CHAK DE INDIA", category: "Bollywood Sport" },
  { word: "SWADES", category: "Bollywood Drama" },
  { word: "BARFI", category: "Bollywood Romance" },
  { word: "TAARE ZAMEEN PAR", category: "Bollywood Drama" },
  { word: "DRISHYAM", category: "Bollywood Thriller" },
  { word: "ANDHADHUN", category: "Bollywood Thriller" },
  { word: "GOLMAAL", category: "Bollywood Comedy" },
  { word: "WELCOME", category: "Bollywood Comedy" },
  { word: "BHOOL BHULAIYAA", category: "Bollywood Horror/Comedy" },
  { word: "JAB WE MET", category: "Bollywood Romance" },
  { word: "ROCKSTAR", category: "Bollywood Musical" },
  { word: "TAMASHA", category: "Bollywood Drama" },
  { word: "PIKU", category: "Bollywood Comedy" },
  { word: "UDAAN", category: "Bollywood Drama" },
  { word: "KAHANI", category: "Bollywood Thriller" },
  { word: "HAIDER", category: "Bollywood Drama" },
  { word: "ARTICLE 15", category: "Bollywood Crime" },
  { word: "BADHAAI HO", category: "Bollywood Comedy" },
  { word: "STREE", category: "Bollywood Horror/Comedy" },
  { word: "RAAZI", category: "Bollywood Spy Thriller" },
  { word: "URI THE SURGICAL STRIKE", category: "Bollywood Action" },
  { word: "WAR", category: "Bollywood Action" },
  { word: "PADMAAVAT", category: "Bollywood Period Drama" },
  { word: "BAJIRAO MASTANI", category: "Bollywood Period Drama" },
  { word: "KAL HO NAA HO", category: "Bollywood Romance" },
  { word: "VEER ZAARA", category: "Bollywood Romance" },
  { word: "DON", category: "Bollywood Action" },
  { word: "AGNEEPATH", category: "Bollywood Action" },
  { word: "ROWDY RATHORE", category: "Bollywood Masala" },
  { word: "DABANGG", category: "Bollywood Action" },
  { word: "SINGHAM", category: "Bollywood Action" },
  { word: "KRRISH", category: "Bollywood Superhero" },
  { word: "KOI MIL GAYA", category: "Bollywood Sci-Fi" },
  { word: "KAHO NAA PYAAR HAI", category: "Bollywood Romance" },

  // --- HOLLYWOOD ---
  { word: "THE GODFATHER", category: "Hollywood Classic" },
  { word: "THE SHAWSHANK REDEMPTION", category: "Hollywood Drama" },
  { word: "THE DARK KNIGHT", category: "Hollywood Superhero" },
  { word: "PULP FICTION", category: "Hollywood Crime" },
  { word: "FORREST GUMP", category: "Hollywood Drama" },
  { word: "INCEPTION", category: "Hollywood Sci-Fi" },
  { word: "FIGHT CLUB", category: "Hollywood Drama" },
  { word: "THE MATRIX", category: "Hollywood Sci-Fi" },
  { word: "GOODFELLAS", category: "Hollywood Crime" },
  { word: "STAR WARS", category: "Hollywood Sci-Fi" },
  { word: "THE LORD OF THE RINGS", category: "Hollywood Fantasy" },
  { word: "TITANIC", category: "Hollywood Romance" },
  { word: "JURASSIC PARK", category: "Hollywood Adventure" },
  { word: "AVATAR", category: "Hollywood Sci-Fi" },
  { word: "THE AVENGERS", category: "Hollywood Superhero" },
  { word: "IRON MAN", category: "Hollywood Superhero" },
  { word: "SPIDER MAN", category: "Hollywood Superhero" },
  { word: "BLACK PANTHER", category: "Hollywood Superhero" },
  { word: "JOKER", category: "Hollywood Drama" },
  { word: "THE LION KING", category: "Hollywood Animation" },
  { word: "TOY STORY", category: "Hollywood Animation" },
  { word: "FROZEN", category: "Hollywood Animation" },
  { word: "FINDING NEMO", category: "Hollywood Animation" },
  { word: "SHREK", category: "Hollywood Animation" },
  { word: "HARRY POTTER", category: "Hollywood Fantasy" },
  { word: "PIRATES OF THE CARIBBEAN", category: "Hollywood Adventure" },
  { word: "GLADIATOR", category: "Hollywood History" },
  { word: "SAVING PRIVATE RYAN", category: "Hollywood War" },
  { word: "SCHINDLERS LIST", category: "Hollywood History" },
  { word: "THE DEPARTED", category: "Hollywood Crime" },
  { word: "INTERSTELLAR", category: "Hollywood Sci-Fi" },
  { word: "WHIPLASH", category: "Hollywood Drama" },
  { word: "PARASITE", category: "Hollywood Thriller" },
  { word: "LA LA LAND", category: "Hollywood Musical" },
  { word: "THE WOLF OF WALL STREET", category: "Hollywood Bio" },
  { word: "DJANGO UNCHAINED", category: "Hollywood Western" },
  { word: "BACK TO THE FUTURE", category: "Hollywood Sci-Fi" },
  { word: "TERMINATOR", category: "Hollywood Sci-Fi" },
  { word: "ALIEN", category: "Hollywood Horror" },
  { word: "THE SHINING", category: "Hollywood Horror" },
  { word: "PSYCHO", category: "Hollywood Horror" },
  { word: "JAWS", category: "Hollywood Thriller" },
  { word: "ROCKY", category: "Hollywood Sport" },
  { word: "TOP GUN", category: "Hollywood Action" },
  { word: "DIE HARD", category: "Hollywood Action" },
  { word: "MISSION IMPOSSIBLE", category: "Hollywood Action" },
  { word: "MAD MAX FURY ROAD", category: "Hollywood Action" },
  { word: "JOHN WICK", category: "Hollywood Action" },
  { word: "THE TRUMAN SHOW", category: "Hollywood Drama" },
  { word: "ET THE EXTRA TERRESTRIAL", category: "Hollywood Sci-Fi" }
];

const WIN_MESSAGES = ["BLOCKBUSTER!", "SUPERSTAR!", "LEGENDARY!", "CRITICS CHOICE!", "OSCAR WORTHY!"];
const LOSE_MESSAGES = ["FLOP!", "STRAIGHT TO DVD", "CANCELLED", "BUDGET CUT", "REMAKE NEEDED"];

const MAX_LIVES = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// --- Confetti Canvas (Neo-Brutalist Style) ---
const ConfettiCanvas = ({ isActive }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 5 + 3,
      speedX: (Math.random() - 0.5) * 4,
      color: ['#facc15', '#22d3ee', '#f472b6', '#a3e635', '#000000'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15
    });

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      if (!isActive && particles.current.length === 0) {
        cancelAnimationFrame(animationFrameId.current);
        return;
      }
      if (isActive && particles.current.length < 100) particles.current.push(createParticle());

      particles.current.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > height) isActive ? Object.assign(p, createParticle()) : particles.current.splice(index, 1);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.restore();
      });
      animationFrameId.current = requestAnimationFrame(update);
    };
    update();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

// --- Components ---

const HangmanFigure = ({ wrongGuesses }) => {
  const strokeColor = "#000000";
  const strokeWidth = 8;

  return (
    <div className="relative flex justify-center items-center h-64 lg:h-80 w-full">
      <svg viewBox="0 0 200 250" className="h-full w-auto overflow-visible">
        {/* Gallows */}
        <line x1="20" y1="240" x2="180" y2="240" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />
        <line x1="100" y1="240" x2="100" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />
        <line x1="100" y1="20" x2="150" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />
        <line x1="150" y1="20" x2="150" y2="50" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />

        {/* Head */}
        <g className={`transition-opacity duration-300 ${wrongGuesses >= 1 ? 'opacity-100' : 'opacity-0'}`}>
           <circle cx="150" cy="80" r="25" stroke={strokeColor} strokeWidth={strokeWidth} fill="#facc15" />
           {wrongGuesses >= 6 && (
             <>
               <line x1="140" y1="75" x2="146" y2="81" stroke={strokeColor} strokeWidth={4} />
               <line x1="146" y1="75" x2="140" y2="81" stroke={strokeColor} strokeWidth={4} />
               <line x1="154" y1="75" x2="160" y2="81" stroke={strokeColor} strokeWidth={4} />
               <line x1="160" y1="75" x2="154" y2="81" stroke={strokeColor} strokeWidth={4} />
             </>
           )}
        </g>

        {/* Body */}
        <g className={`transition-opacity duration-300 ${wrongGuesses >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="105" x2="150" y2="170" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>

        {/* Arms */}
        <g className={`transition-opacity duration-300 ${wrongGuesses >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="120" x2="115" y2="145" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
        <g className={`transition-opacity duration-300 ${wrongGuesses >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="120" x2="185" y2="145" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>

        {/* Legs */}
        <g className={`transition-opacity duration-300 ${wrongGuesses >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="170" x2="120" y2="220" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
        <g className={`transition-opacity duration-300 ${wrongGuesses >= 6 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="170" x2="180" y2="220" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  );
};

const Keyboard = ({ onGuess, guessedLetters, disabled, currentWord }) => {
  const wordLetters = currentWord.replace(/ /g, "").split("");

  return (
    <div className="grid grid-cols-6 lg:grid-cols-7 gap-2 lg:gap-3">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && wordLetters.includes(letter);
        const isWrong = isGuessed && !wordLetters.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isGuessed}
            className={`
              h-12 lg:h-14 text-lg lg:text-xl font-black border-4 border-black transition-all duration-150 touch-manipulation
              ${isCorrect
                ? 'bg-[#a3e635] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0'
                : isWrong
                  ? 'bg-[#f87171] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0'
                  : 'bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#22d3ee] hover:-translate-y-1 hover:shadow-[6px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

const WordDisplay = ({ word, guessedLetters, reveal }) => {
  const words = word.split(" ");

  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 my-6">
      {words.map((part, wIndex) => (
        <div key={wIndex} className="flex flex-wrap justify-center gap-2">
          {part.split("").map((letter, index) => {
            const isGuessed = guessedLetters.includes(letter);
            const showLetter = isGuessed || reveal;
            const isMissed = reveal && !isGuessed;

            return (
              <div
                key={`${wIndex}-${index}`}
                className={`
                  flex items-center justify-center w-10 h-14 lg:w-12 lg:h-16
                  border-b-[6px] text-2xl lg:text-3xl font-black
                  ${isMissed
                    ? 'border-[#f87171] text-[#f87171]'
                    : 'border-black text-black'
                  }
                `}
              >
                <span className={`${showLetter ? 'visible' : 'invisible'}`}>
                  {letter}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const HintPanel = ({ word, hintsUsed, onUseHint, guessedLetters, disabled }) => {
  const wordNoSpaces = word.replace(/ /g, "");
  const wordCount = word.split(" ").length;
  const letterCount = wordNoSpaces.length;
  const vowels = wordNoSpaces.split("").filter(l => "AEIOU".includes(l)).length;

  // Find an unrevealed letter for hint 3
  const unrevealedLetters = wordNoSpaces.split("").filter(l => !guessedLetters.includes(l));
  const randomUnrevealed = unrevealedLetters.length > 0
    ? unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)]
    : null;

  const hints = [
    {
      id: 1,
      label: "FIRST LETTER",
      value: `Starts with "${word[0]}"`,
      color: "bg-[#facc15]"
    },
    {
      id: 2,
      label: "STRUCTURE",
      value: `${letterCount} letters${wordCount > 1 ? `, ${wordCount} words` : ''} • ${vowels} vowels`,
      color: "bg-[#22d3ee]"
    },
    {
      id: 3,
      label: "REVEAL LETTER",
      value: randomUnrevealed ? `Contains "${randomUnrevealed}"` : "All revealed!",
      color: "bg-[#f472b6]"
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5" strokeWidth={3} />
        <span className="font-black text-sm uppercase tracking-wider">HINTS</span>
      </div>

      {hints.map((hint) => (
        <div key={hint.id} className="relative">
          {hintsUsed.includes(hint.id) ? (
            <div className={`${hint.color} border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <div className="text-xs font-black uppercase mb-1">{hint.label}</div>
              <div className="text-sm font-bold">{hint.value}</div>
            </div>
          ) : (
            <button
              onClick={() => onUseHint(hint.id)}
              disabled={disabled}
              className="w-full text-left bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-xs font-black uppercase mb-1 flex items-center gap-2">
                {hint.label}
                <Zap className="w-3 h-3" />
              </div>
              <div className="text-sm font-bold text-gray-500">Click to reveal</div>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white border-8 border-black p-6 max-w-sm w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in">
        <h3 className="text-2xl font-black mb-4">{title}</h3>
        <p className="text-sm font-bold mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 font-black border-4 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 font-black border-4 border-black bg-[#f87171] hover:bg-[#ef4444] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
          >
            NEW GAME
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentWordData, setCurrentWordData] = useState({ word: "", category: "" });
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [status, setStatus] = useState("playing");
  const [hintsUsed, setHintsUsed] = useState([]);
  const [endMessage, setEndMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = useCallback(() => {
    const randomData = MOVIE_DATA[Math.floor(Math.random() * MOVIE_DATA.length)];
    setCurrentWordData(randomData);
    setGuessedLetters([]);
    setStatus("playing");
    setHintsUsed([]);
    setEndMessage("");
    setShowConfirm(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== 'playing' || showConfirm) return;
      const char = e.key.toUpperCase();
      if (ALPHABET.includes(char)) handleGuess(char);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, guessedLetters, currentWordData, showConfirm]);

  const handleGuess = (letter) => {
    if (status !== 'playing' || guessedLetters.includes(letter)) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    const wordNoSpaces = currentWordData.word.replace(/ /g, "");
    const wrongGuesses = newGuessed.filter(l => !wordNoSpaces.includes(l)).length;
    const isWin = wordNoSpaces.split("").every(l => newGuessed.includes(l));
    const isLoss = wrongGuesses >= MAX_LIVES;

    if (isWin) {
      setTimeout(() => {
        setStatus("won");
        setEndMessage(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]);
      }, 800);
    } else if (isLoss) {
      setStatus("lost");
      setEndMessage(LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)]);
    }
  };

  const handleHint = (hintId) => {
    if (status !== 'playing' || hintsUsed.includes(hintId)) return;
    setHintsUsed([...hintsUsed, hintId]);
  };

  const handleNewGameClick = () => {
    if (status === 'playing' && guessedLetters.length > 0) {
      setShowConfirm(true);
    } else {
      startNewGame();
    }
  };

  const wordNoSpaces = currentWordData.word ? currentWordData.word.replace(/ /g, "") : "";
  const wrongGuessesCount = useMemo(() =>
    guessedLetters.filter(l => !wordNoSpaces.includes(l)).length,
    [guessedLetters, currentWordData.word]
  );

  const livesLeft = MAX_LIVES - wrongGuessesCount;

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black flex flex-col overflow-hidden relative selection:bg-[#facc15] selection:text-black">

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px),linear-gradient(to_bottom,#d4d4d4_2px,transparent_2px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-20 bg-[#facc15] border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black text-[#facc15] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              <Film className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-black tracking-tighter uppercase">MOVIE HANGMAN</h1>
              <p className="text-xs lg:text-sm font-bold uppercase tracking-wider hidden sm:block">Guess the Film</p>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Lives */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <Heart className={`w-5 h-5 lg:w-6 lg:h-6 ${livesLeft <= 2 ? 'fill-[#f87171] text-[#f87171] animate-pulse' : 'fill-black'}`} strokeWidth={3} />
               <span className="text-lg lg:text-xl font-black">{livesLeft}</span>
            </div>

            {/* New Game Button */}
            <button
              onClick={handleNewGameClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#22d3ee] border-4 border-black font-black text-sm lg:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all"
            >
              <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />
              <span className="hidden sm:inline">NEW GAME</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Desktop Split Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-8 z-10">

        {/* Category Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-3 bg-[#f472b6] border-4 border-black text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {currentWordData.category}
          </div>
        </div>

        {/* Desktop: Side by Side | Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* LEFT PANEL - Hangman & Word */}
          <div className="lg:w-1/2">
            <div className="bg-white border-8 border-black p-6 lg:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full">
              <HangmanFigure wrongGuesses={wrongGuessesCount} />
              <WordDisplay
                word={currentWordData.word}
                guessedLetters={guessedLetters}
                reveal={status === 'lost'}
              />
            </div>
          </div>

          {/* RIGHT PANEL - Keyboard & Hints */}
          <div className="lg:w-1/2 flex flex-col gap-6">

            {/* Keyboard */}
            <div className="bg-white border-8 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-black uppercase tracking-wider mb-4 text-center lg:text-left">
                SELECT A LETTER
              </div>
              <Keyboard
                onGuess={handleGuess}
                guessedLetters={guessedLetters}
                disabled={status !== 'playing'}
                currentWord={currentWordData.word}
              />
            </div>

            {/* Hints */}
            <div className="bg-white border-8 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <HintPanel
                word={currentWordData.word}
                hintsUsed={hintsUsed}
                onUseHint={handleHint}
                guessedLetters={guessedLetters}
                disabled={status !== 'playing'}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Win/Loss Modal */}
      {status !== 'playing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={`${status === 'won' ? 'bg-[#a3e635]' : 'bg-[#f87171]'} border-8 border-black p-8 max-w-md w-full text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in`}>

            <div className="flex justify-center mb-6">
              {status === 'won' ? (
                <div className="p-4 bg-black rounded-none">
                  <Trophy className="w-16 h-16 text-[#facc15]" strokeWidth={2} />
                </div>
              ) : (
                <div className="p-4 bg-black rounded-none">
                  <Frown className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
              )}
            </div>

            <h2 className="text-4xl lg:text-5xl font-black mb-2 uppercase tracking-tighter">
              {status === 'won' ? 'YOU WON!' : 'GAME OVER'}
            </h2>

            <p className="text-xl font-black mb-6 border-b-4 border-black inline-block pb-2">
              {endMessage}
            </p>

            <div className="mb-6 p-4 bg-white border-4 border-black">
               <div className="text-xs font-black uppercase mb-2">THE MOVIE WAS</div>
               <div className="text-xl lg:text-2xl font-black">{currentWordData.word}</div>
            </div>

            <button
              onClick={startNewGame}
              className="w-full py-4 px-6 font-black text-xl border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] active:translate-y-1 active:shadow-none"
            >
              <RefreshCw className="w-6 h-6" strokeWidth={3} />
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}

      {/* Confirm New Game Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={startNewGame}
        onCancel={() => setShowConfirm(false)}
        title="START NEW GAME?"
        message="Your current progress will be lost. Are you sure you want to start a new game?"
      />

      <ConfettiCanvas isActive={status === 'won'} />
    </div>
  );
}
