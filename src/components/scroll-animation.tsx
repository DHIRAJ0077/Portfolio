import React from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  once = true,
  className = '',
}: ScrollAnimationProps) {
  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide-up' ? 50 : animation === 'slide-down' ? -50 : 0,
      x: animation === 'slide-left' ? 50 : animation === 'slide-right' ? -50 : 0,
      scale: animation === 'scale' ? 0.9 : 1,
      rotate: animation === 'rotate' ? -5 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
