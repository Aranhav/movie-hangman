import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { RefreshCw, Trophy, Frown, HelpCircle, Heart, Keyboard as KeyboardIcon, Film } from 'lucide-react';

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

// --- Confetti Canvas (Classic Style) ---
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
      size: Math.random() * 10 + 5, // Bigger, blockier confetti
      speedY: Math.random() * 5 + 2,
      speedX: (Math.random() - 0.5) * 4,
      color: ['#000000', '#ffffff', '#ef4444', '#3b82f6'][Math.floor(Math.random() * 4)], // Black, White, Red, Blue
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      if (!isActive && particles.current.length === 0) {
        cancelAnimationFrame(animationFrameId.current);
        return;
      }
      if (isActive && particles.current.length < 80) particles.current.push(createParticle());

      particles.current.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > height) isActive ? Object.assign(p, createParticle()) : particles.current.splice(index, 1);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Draw Squares instead of circles for classic look
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        // Add border to white particles so they show up
        if (p.color === '#ffffff') {
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
          ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

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
  const strokeWidth = 6; // Ultra thick

  return (
    <div className="relative flex justify-center items-center h-48 sm:h-64 w-full mb-4">
      <svg viewBox="0 0 200 250" className="h-full w-auto overflow-visible">
        {/* Gallows - Sharp Corners */}
        <line x1="20" y1="240" x2="180" y2="240" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />
        <line x1="100" y1="240" x2="100" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />
        <line x1="100" y1="20" x2="150" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />
        <line x1="150" y1="20" x2="150" y2="50" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="square" />

        {/* Head - Filled White with Black Border */}
        <g className={`${wrongGuesses >= 1 ? 'opacity-100' : 'opacity-0'}`}>
           <circle cx="150" cy="80" r="25" stroke={strokeColor} strokeWidth={strokeWidth} fill="white" />
        </g>

        {/* Body - Simple Line */}
        <g className={`${wrongGuesses >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="105" x2="150" y2="170" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>

        {/* Arms - Straight Lines */}
        <g className={`${wrongGuesses >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="120" x2="110" y2="120" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
        <g className={`${wrongGuesses >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="120" x2="190" y2="120" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>

        {/* Legs - Straight Lines */}
        <g className={`${wrongGuesses >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="170" x2="120" y2="220" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
        <g className={`${wrongGuesses >= 6 ? 'opacity-100' : 'opacity-0'}`}>
          <line x1="150" y1="170" x2="180" y2="220" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  );
};

const Keyboard = ({ onGuess, guessedLetters, disabled }) => {
  return (
    <div className="grid grid-cols-7 gap-2 max-w-2xl mx-auto px-1">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isGuessed}
            className={`
              h-12 rounded-none text-xl font-mono font-bold border-4 transition-transform touch-manipulation
              active:translate-y-1
              ${isGuessed
                ? 'bg-black text-white border-black opacity-100' // Inverted when guessed
                : 'bg-white text-black border-black hover:bg-yellow-300 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
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

const WordDisplay = ({ word, guessedLetters, gameOver, reveal }) => {
  const words = word.split(" ");

  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 my-8 px-2">
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
                  flex items-center justify-center w-10 h-14 sm:w-12 sm:h-16
                  border-b-8 font-mono text-3xl sm:text-4xl font-bold
                  ${isMissed
                    ? 'border-red-500 text-red-500'
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

// --- Main App ---

export default function App() {
  const [currentWordData, setCurrentWordData] = useState({ word: "", category: "" });
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [status, setStatus] = useState("playing");
  const [hintUsed, setHintUsed] = useState(false);
  const [endMessage, setEndMessage] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = useCallback(() => {
    const randomData = MOVIE_DATA[Math.floor(Math.random() * MOVIE_DATA.length)];
    setCurrentWordData(randomData);
    setGuessedLetters([]);
    setStatus("playing");
    setHintUsed(false);
    setEndMessage("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== 'playing') return;
      const char = e.key.toUpperCase();
      if (ALPHABET.includes(char)) handleGuess(char);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, guessedLetters, currentWordData]);

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
      }, 1500);
    } else if (isLoss) {
      setStatus("lost");
      setEndMessage(LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)]);
    }
  };

  const handleHint = () => {
    if (status !== 'playing' || hintUsed) return;
    setHintUsed(true);
  };

  const wordNoSpaces = currentWordData.word ? currentWordData.word.replace(/ /g, "") : "";
  const wrongGuessesCount = useMemo(() =>
    guessedLetters.filter(l => !wordNoSpaces.includes(l)).length,
    [guessedLetters, currentWordData.word]
  );

  const livesLeft = MAX_LIVES - wrongGuessesCount;

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-mono text-black flex flex-col overflow-hidden relative selection:bg-black selection:text-white">

      {/* Retro Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

      {/* Navbar */}
      <header className="p-4 sm:p-6 flex justify-between items-center max-w-4xl mx-auto w-full z-20 border-b-4 border-black bg-white">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-black text-white border-2 border-black">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">HANGMAN</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 border-4 border-black bg-white text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <Heart className={`w-5 h-5 ${livesLeft <= 2 ? 'fill-black animate-pulse' : 'fill-none'}`} strokeWidth={3} />
             <span className="text-lg">{livesLeft}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 flex flex-col items-center z-10">

        {/* Game Card */}
        <div className="w-full bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative mt-4">

            <div className="flex flex-col items-center">
              <HangmanFigure wrongGuesses={wrongGuessesCount} />

              {/* Category & Hint */}
              <div className="w-full flex flex-col items-center gap-4 mb-6">
                 <div className="px-4 py-2 border-2 border-black bg-gray-100 text-xs font-bold uppercase tracking-widest">
                    {currentWordData.category}
                 </div>

                 {!hintUsed ? (
                   <button
                     onClick={handleHint}
                     disabled={status !== 'playing'}
                     className="group flex items-center gap-2 px-6 py-2 text-sm font-bold border-2 border-black bg-white hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                   >
                     <HelpCircle className="w-4 h-4" />
                     REVEAL HINT
                   </button>
                 ) : (
                    <div className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-yellow-300">
                       <span className="font-black text-sm">HINT:</span>
                       <span className="font-bold text-sm">
                         STARTS WITH "{currentWordData.word[0]}"
                       </span>
                    </div>
                 )}
              </div>

              <WordDisplay
                word={currentWordData.word}
                guessedLetters={guessedLetters}
                gameOver={status !== 'playing'}
                reveal={status === 'lost'}
              />
            </div>
        </div>

        {/* Keyboard Area */}
        <div className="w-full mt-8 pb-6">
          <Keyboard
            onGuess={handleGuess}
            guessedLetters={guessedLetters}
            disabled={status !== 'playing'}
          />

          <div className="text-center mt-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
             <KeyboardIcon className="w-4 h-4" />
             <span>Classic Mode | Keyboard Supported</span>
          </div>
        </div>
      </main>

      {/* Overlay: Win/Loss Modal */}
      {status !== 'playing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border-8 border-black p-8 max-w-md w-full text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-200">

            <div className="flex justify-center mb-6">
              {status === 'won' ? (
                <Trophy className="w-20 h-20 stroke-[1.5] text-black" />
              ) : (
                <Frown className="w-20 h-20 stroke-[1.5] text-black" />
              )}
            </div>

            <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">
              {status === 'won' ? 'YOU WON!' : 'GAME OVER'}
            </h2>

            <p className="text-xl font-bold mb-8 border-b-4 border-black inline-block pb-2">
              {endMessage}
            </p>

            {/* Always show movie name */}
            <div className="mb-8 p-4 border-4 border-black bg-gray-100">
               <div className="text-xs font-bold uppercase mb-2">The Movie Was:</div>
               <div className="text-2xl font-black">{currentWordData.word}</div>
            </div>

            <button
              onClick={startNewGame}
              className="w-full py-4 px-6 font-black text-xl border-4 border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] active:translate-y-1 active:shadow-none"
            >
              <RefreshCw className="w-6 h-6 stroke-[3]" />
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}

      <ConfettiCanvas isActive={status === 'won'} />
    </div>
  );
}
