import { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if target is a clickable element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a, [role="button"], input[type="submit"], .interactive-click');
      if (clickable) {
        const newRipple: Ripple = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };

        setRipples((prev) => [...prev.slice(-6), newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="click-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  );
}
