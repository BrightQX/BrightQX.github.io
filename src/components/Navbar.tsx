import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '标签', path: '/tags' },
  { label: '关于', path: '/about' },
];

// 樱花 Logo SVG
function SakuraLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 -mt-0.5">
      <g transform="translate(20,20)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 9}
            cy={Math.sin((angle * Math.PI) / 180) * 9}
            rx="6"
            ry="9"
            transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`}
            fill="hsl(345, 65%, 68%)"
            fillOpacity="0.9"
          />
        ))}
        <circle cx="0" cy="0" r="3" fill="hsl(350, 70%, 85%)" />
      </g>
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-md"
      style={{ background: 'hsl(350 30% 98% / 0.85)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-lg transition-colors flex items-center"
          style={{ color: 'hsl(345, 55%, 50%)' }}
        >
          <SakuraLogo />
          <span>樱花博客</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={
                location.pathname === link.path
                  ? { background: 'hsl(345, 65%, 65%)' }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border/50 px-4 py-3 space-y-1"
          style={{ background: 'hsl(350 30% 98% / 0.95)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              style={
                location.pathname === link.path
                  ? { background: 'hsl(345, 65%, 65%)' }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
