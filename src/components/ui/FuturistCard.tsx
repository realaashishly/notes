import Link from 'next/link';
import React from 'react';

interface FuturistCardProps {
  href: string;
  title: string;
  subtitle: string;
  index: number;
}

export const FuturistCard = ({ href, title, subtitle, index }: FuturistCardProps) => {
  return (
    <Link
      href={href}
      className="group relative block p-px overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
      
      <div className="relative h-full bg-[var(--card-bg)] backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-colors duration-300 group-hover:border-[var(--neon-cyan)]/30 group-hover:bg-[var(--card-bg-hover)]">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-[var(--neon-cyan)] rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        
        <div className="relative flex flex-col h-full z-10">
          <div className="flex items-center justify-between mb-4">
             <span className="text-xs font-mono text-[var(--neon-purple)] tracking-widest uppercase">
               0{index + 1}
             </span>
             <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)] animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2 group-hover:to-[var(--neon-cyan)] transition-all duration-300">
            {title}
          </h2>
          
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {subtitle}
          </p>

          <div className="mt-auto pt-4 flex items-center text-[var(--neon-cyan)] text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Explore <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
