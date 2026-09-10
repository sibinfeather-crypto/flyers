import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', withTagline = true }) => {
  const scaleConfig = {
    sm: {
      text: 'text-2xl',
      theSize: 'text-2xl',
      flyersSize: 'text-2xl',
      badgeText: 'text-[9px] tracking-[0.25em]',
      badgePadding: 'px-2 py-0.5',
      skew: '-skew-x-12',
    },
    md: {
      text: 'text-3xl sm:text-4xl',
      theSize: 'text-3xl sm:text-4xl',
      flyersSize: 'text-3xl sm:text-4xl',
      badgeText: 'text-[10px] sm:text-xs tracking-[0.28em]',
      badgePadding: 'px-3 py-0.5',
      skew: '-skew-x-12',
    },
    lg: {
      text: 'text-4xl sm:text-5xl md:text-6xl',
      theSize: 'text-4xl sm:text-5xl md:text-6xl',
      flyersSize: 'text-4xl sm:text-5xl md:text-6xl',
      badgeText: 'text-xs sm:text-sm tracking-[0.32em]',
      badgePadding: 'px-4 py-1',
      skew: '-skew-x-12',
    },
    xl: {
      text: 'text-5xl sm:text-6xl md:text-7xl',
      theSize: 'text-5xl sm:text-6xl md:text-7xl',
      flyersSize: 'text-5xl sm:text-6xl md:text-7xl',
      badgeText: 'text-sm sm:text-base tracking-[0.35em]',
      badgePadding: 'px-5 py-1.5',
      skew: '-skew-x-12',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none font-racing ${className}`}>
      {/* Brand Name with Racing Slant & Dual Color Outline */}
      <div className={`flex items-baseline font-black tracking-tighter uppercase italic transform ${scaleConfig.skew} leading-none`}>
        {/* 'THE' in High-Octane Red */}
        <span
          className={`${scaleConfig.theSize} text-[#E8302B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pr-1.5`}
          style={{
            WebkitTextStroke: '1.5px #000',
            textShadow: '0 0 12px rgba(232, 48, 43, 0.45)',
          }}
        >
          THE
        </span>

        {/* 'FLYER\'S' in Crisp White with Black Stroke */}
        <span
          className={`${scaleConfig.flyersSize} text-white drop-shadow-[0_3px_5px_rgba(0,0,0,0.95)]`}
          style={{
            WebkitTextStroke: '1.5px #000',
            paintOrder: 'stroke fill',
          }}
        >
          FLYER'S
        </span>
      </div>

      {/* Underline Tagline Badge: "ACCESSORIES & SPARES" */}
      {withTagline && (
        <div
          className={`mt-1 bg-black/90 border-t-2 border-b border-[#E8302B] ${scaleConfig.badgePadding} ${scaleConfig.badgeText} text-[#E8302B] font-extrabold uppercase font-tech transform ${scaleConfig.skew} flex items-center justify-center shadow-lg shadow-[#E8302B]/20`}
        >
          <span className="tracking-[0.28em] whitespace-nowrap">
            ACCESSORIES & SPARES
          </span>
        </div>
      )}
    </div>
  );
};
