export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* 樱花装饰 */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, hsl(345, 60%, 75%))' }} />
          <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(20,20)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx={Math.cos((angle * Math.PI) / 180) * 9}
                  cy={Math.sin((angle * Math.PI) / 180) * 9}
                  rx="5"
                  ry="8"
                  transform={`rotate(${angle + 90} ${Math.cos((angle * Math.PI) / 180) * 9} ${Math.sin((angle * Math.PI) / 180) * 9})`}
                  fill="hsl(345, 65%, 75%)"
                  fillOpacity="0.7"
                />
              ))}
              <circle cx="0" cy="0" r="2.5" fill="hsl(350, 70%, 85%)" />
            </g>
          </svg>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, hsl(345, 60%, 75%))' }} />
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} 樱花博客 · 花开花落，文字长存
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Built with React + TypeScript
        </p>
      </div>
    </footer>
  );
}
