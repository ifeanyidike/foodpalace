import { useEffect, useState } from "react";

const useCheckSliderLoaded = () => {
  const [loadingState, setLoadingState] = useState({
    isInitializing: true, // Initial loading state
    isLoaded: false, // SR7 fully loaded
    isTransitioning: false, // Handling transition between states
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoadingState({
        isInitializing: false,
        isLoaded: false,
        isTransitioning: false,
      });
      return;
    }

    // Initialize global objects
    window._tpt = window._tpt || {};
    window.SR7 = window.SR7 || {};

    // Check immediately first
    if (window.SR7?.initialised) {
      setLoadingState({
        isInitializing: false,
        isLoaded: true,
        isTransitioning: true,
      });

      // Reset transition state after animation
      setTimeout(() => {
        setLoadingState((prev) => ({
          ...prev,
          isTransitioning: false,
        }));
      }, 500); // Match this with your CSS transition duration
      return;
    }

    const checkInitialization = setInterval(() => {
      if (window.SR7?.initialised) {
        clearInterval(checkInitialization);

        // First set transitioning state
        setLoadingState({
          isInitializing: false,
          isLoaded: true,
          isTransitioning: true,
        });

        // Reset transition state after animation
        setTimeout(() => {
          setLoadingState((prev) => ({
            ...prev,
            isTransitioning: false,
          }));
        }, 500); // Match this with your CSS transition duration
      }
    }, 100);

    return () => {
      clearInterval(checkInitialization);
    };
  }, []);

  return loadingState;
};

export default useCheckSliderLoaded;

