import React, { useState, useEffect } from "react";

const PremiumCulinaryLoader = () => {
  const [progress, setProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(phaseTimer);
  }, []);

  const loadingTexts = [
    "Preparing your culinary journey",
    "Selecting finest ingredients",
    "Perfecting the experience",
    "Setting the table",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="w-full max-w-md px-6">
        <div className="relative mb-16">
          {/* Animated knife icon */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 transform rotate-45 animate-pulse">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path
                    d="M8.5 14L3 8.5M3 8.5L8.5 3M3 8.5H15C18.866 8.5 22 11.634 22 15.5V15.5C22 19.366 18.866 22.5 15 22.5H10"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Logo placeholder */}
          <div className="text-center mb-8 mt-4">
            <h1 className="text-white text-3xl font-light tracking-widest">
              <span className="text-4xl font-medium text-yellow-400">C</span>
              UISINE
            </h1>
            <p className="text-white/70 text-xs tracking-widest mt-1">
              EXCEPTIONAL DINING EXPERIENCE
            </p>
          </div>

          {/* Loading animation */}
          <div className="relative h-px w-full bg-gray-800 overflow-hidden mb-6">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />

            {/* Animated dots on progress bar */}
            <div
              className="absolute top-0 h-2 w-2 rounded-full bg-yellow-300 shadow-glow transform -translate-y-1/2 transition-all duration-300"
              style={{
                left: `${progress}%`,
                boxShadow: "0 0 10px rgba(250, 204, 21, 0.8)",
              }}
            />
          </div>

          {/* Loading text */}
          <div className="h-8">
            <p className="text-white/90 text-center text-sm tracking-wider font-light transition-opacity duration-500">
              {loadingTexts[animationPhase]}
            </p>
          </div>

          {/* Progress percentage */}
          <div className="absolute -right-2 -bottom-12 text-white/70 font-light text-xs">
            {progress}%
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between items-center opacity-30 pointer-events-none">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
          </div>
        </div>

        {/* Animated food icons */}
        <div className="flex justify-center space-x-16 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-6 h-6 opacity-0"
              style={{
                animation: `fadeInOut 6s infinite ${i * 2}s`,
                opacity: animationPhase === i ? 0.7 : 0.2,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                {i === 0 && (
                  <path
                    d="M12 5C8.5 5 5 8.5 5 12C5 15.5 8.5 19 12 19C15.5 19 19 15.5 19 12C19 8.5 15.5 5 12 5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {i === 1 && (
                  <path
                    d="M5 15L19 15M12 3V6M8.5 4V7M15.5 4V7M19 10C19 8.89543 18.1046 8 17 8H7C5.89543 8 5 8.89543 5 10V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V10Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {i === 2 && (
                  <path
                    d="M6 7C6 5.89543 6.89543 5 8 5H16C17.1046 5 18 5.89543 18 7V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7Z M6 7H18 M9 3V5 M15 3V5 M9 11L11 13L15 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0%,
          20% {
            opacity: 0.2;
            transform: translateY(5px);
          }
          40%,
          60% {
            opacity: 0.7;
            transform: translateY(0);
          }
          80%,
          100% {
            opacity: 0.2;
            transform: translateY(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumCulinaryLoader;
