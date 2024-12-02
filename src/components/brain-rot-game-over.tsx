import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const brainRotPhrases = [
  "Oops! Brain.exe has stopped working 🧠💀",
  "Error 404: Braincells not found 🔍🤯",
  "Brain has left the chat ✌️😵",
  "Congrats! You've achieved maximum brain rot 🏆🧟",
  "Loading intelligence... Failed! 🔄❌",
  "Brain.zip is corrupted 🗂️💥",
  "You've unlocked: Ultimate Confusion 🔓🌀",
  "Brainwaves flatlined 📉😴",
  "Achievement unlocked: Peak Derp 🏅🥴",
  "Brain has yeet itself out 🚀🧠"
]

const glitchAnimation = {
  hidden: { skew: 0, opacity: 1 },
  visible: { 
    skew: [0, -5, 5, 0],
    opacity: [1, 0.8, 0.9, 1],
    transition: { 
      duration: 0.2,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
}

export default function BrainRotGameOver() {
  const [phrase, setPhrase] = useState(brainRotPhrases[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(brainRotPhrases[Math.floor(Math.random() * brainRotPhrases.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 overflow-hidden w-screen">
      <motion.h1 
        className="text-6xl md:text-8xl font-extrabold text-white mb-8 text-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
      >
        GAME OVER
      </motion.h1>
      
      <motion.div
        className="text-2xl md:text-4xl font-bold text-yellow-300 mb-12 text-center"
        variants={glitchAnimation}
        initial="hidden"
        animate="visible"
      >
        {phrase}
      </motion.div>

      <BrainRotParticles />
    </div>
  )
}

function BrainRotParticles() {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          {['🧠', '💀', '🤯', '🥴', '🧟'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </>
  )
}

