import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSkillBarProps {
  name: string;
  level: number; // 0-100
  color?: string;
}

export default function AnimatedSkillBar({ 
  name, 
  level, 
  color = "bg-blue-500" 
}: AnimatedSkillBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs font-medium">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div
          className={`h-2.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
