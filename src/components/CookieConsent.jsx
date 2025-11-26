import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('kaiross_cookie_consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('kaiross_cookie_consent', 'true');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 text-white p-4 z-50 border-t-2 border-blue-500 shadow-lg animate-in slide-in-from-bottom duration-500">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm sm:text-base text-center sm:text-left font-hand tracking-wide">
                    <p>
                        We use local storage to save your game progress and preferences.
                        By playing <strong>Movie Hangman by Kaiross</strong>, you agree to our data usage.
                    </p>
                </div>
                <button
                    onClick={handleAccept}
                    className="whitespace-nowrap px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-sm transition-colors scribble-border text-sm tracking-widest uppercase"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
