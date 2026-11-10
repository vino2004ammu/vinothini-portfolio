import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, select, [role="button"]');
      setIsHovered(!!interactive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    const followCursor = () => {
      setTrailingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.24,
          y: prev.y + dy * 0.24,
        };
      });
      animId = requestAnimationFrame(followCursor);
    };
    animId = requestAnimationFrame(followCursor);

    return () => cancelAnimationFrame(animId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      {/* Center precision dot in Warm Mustard */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eab308] transition-opacity duration-150"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isClicked ? '4px' : '6px',
          height: isClicked ? '4px' : '6px',
          boxShadow: '0 0 10px rgba(234, 179, 8, 0.8)',
        }}
      />

      {/* Trailing follower circle in Warm Mustard */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '42px' : '26px',
          height: isHovered ? '42px' : '26px',
          borderColor: isHovered ? 'rgba(234, 179, 8, 0.7)' : 'rgba(234, 179, 8, 0.3)',
          backgroundColor: isHovered ? 'rgba(234, 179, 8, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 15px rgba(234, 179, 8, 0.25)' : 'none',
        }}
      />
    </div>
  );
}
