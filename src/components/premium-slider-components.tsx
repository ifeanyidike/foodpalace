import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { Theme } from "./premium-slider-data";

// Shockwave effect for transitions
export const ShockwaveEffect = ({
  isActive,
  theme,
}: {
  isActive: boolean;
  theme: Theme;
}) => {
  return (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      animate={
        isActive
          ? {
              boxShadow: [
                `0 0 0 0px ${theme.secondaryColor}00, 0 0 0 0px ${theme.color}00`,
                `0 0 0 20px ${theme.secondaryColor}40, 0 0 0 40px ${theme.color}20`,
                `0 0 0 50px ${theme.secondaryColor}00, 0 0 0 70px ${theme.color}00`,
              ],
              scale: [0.8, 1.2, 1],
            }
          : {
              boxShadow: `0 0 0 0px ${theme.secondaryColor}00, 0 0 0 0px ${theme.color}00`,
              scale: 1,
            }
      }
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
    />
  );
};

// Particle effect for the main slide
export const Particles = ({ theme }: { theme: Theme }) => {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-1 md:h-1 rounded-full"
          style={{
            backgroundColor: theme.secondaryColor,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.4, 0.8, 0.4],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 6,
          }}
        />
      ))}
    </>
  );
};

// Orbital rings for main image
export const OrbitalRings = ({ theme }: { theme: Theme }) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    controls1.start({
      rotate: 360,
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
    controls2.start({
      rotate: -360,
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    });
  }, [controls1, controls2]);

  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full border border-gray-400/10"
        style={{ borderColor: theme.secondaryColor + "30" }}
        animate={controls1}
      >
        <motion.div
          className="absolute w-3 h-3 bg-white rounded-full"
          style={{
            top: "10%",
            left: "50%",
            backgroundColor: theme.secondaryColor,
            boxShadow: `0 0 10px 2px ${theme.secondaryColor}`,
          }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-4 rounded-full border border-gray-400/15"
        style={{ borderColor: theme.color + "40" }}
        animate={controls2}
      >
        <motion.div
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            top: "80%",
            left: "50%",
            backgroundColor: theme.color,
            boxShadow: `0 0 8px 2px ${theme.color}`,
          }}
        />
      </motion.div>
    </>
  );
};
