import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'wave' | 'typewriter' | 'bounce' | 'stagger';
  delay?: number;
  duration?: number;
}

export default function AnimatedText({
  text,
  className = '',
  animation = 'stagger',
  delay = 0,
  duration = 0.05,
}: AnimatedTextProps) {
  // Split text into words for word animations
  const words = text.split(' ');
  
  // Split text into characters for character animations
  const characters = text.split('');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const waveChild = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * duration,
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    }),
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const bounceChild = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 5,
        stiffness: 300,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 5,
        stiffness: 300,
      },
    },
  };

  if (animation === 'wave') {
    return (
      <motion.div
        className={`inline-block ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            variants={waveChild}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === 'typewriter') {
    return (
      <motion.div
        className={`inline-block ${className}`}
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ 
            duration: text.length * 0.06, 
            delay,
            ease: 'linear'
          }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          {text}
        </motion.div>
      </motion.div>
    );
  }

  if (animation === 'bounce') {
    return (
      <motion.div
        className={`inline-block ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={bounceChild}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Default stagger animation
  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
