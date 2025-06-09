import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  dates?: string;
  tags?: string[];
  image?: string;
  video?: string;
  href?: string;
  links?: { name: string; url: string }[];
}

export function EnhancedProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  video,
  href,
  links,
}: EnhancedProjectCardProps) {
  const cardContent = (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-card p-5 transition-all hover:shadow-lg"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {image && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      )}
      {video && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          {dates && <span className="text-xs text-muted-foreground">{dates}</span>}
        </div>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <motion.div
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="outline" className="text-xs">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex gap-2">
            {links.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <motion.div 
        className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
