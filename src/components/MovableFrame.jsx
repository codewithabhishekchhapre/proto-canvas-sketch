import { useState, useRef } from "react";

export const MovableFrame = ({ frameSize, zoom, label }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });
  const frameRef = useRef(null);

  // Calculate initial center position
  const frameWidth = frameSize.width * zoom;
  const frameHeight = frameSize.height * zoom;
  const canvasWidth = frameSize.width * zoom;
  const canvasHeight = frameSize.height * zoom;

  // Center the frame if not moved
  const defaultX = (canvasWidth - frameWidth) / 2;
  const defaultY = (canvasHeight - frameHeight) / 2;
  const x = position.dragging || position.x !== 0 ? position.x : defaultX;
  const y = position.dragging || position.y !== 0 ? position.y : defaultY;

  const onMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    setPosition((pos) => ({
      ...pos,
      dragging: true,
      offsetX: startX - x,
      offsetY: startY - y,
    }));
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!position.dragging) return;
    let newX = e.clientX - position.offsetX;
    let newY = e.clientY - position.offsetY;
    // Clamp within canvas
    newX = Math.max(0, Math.min(newX, canvasWidth - frameWidth));
    newY = Math.max(0, Math.min(newY, canvasHeight - frameHeight));
    setPosition((pos) => ({ ...pos, x: newX, y: newY }));
  };

  const onMouseUp = () => {
    setPosition((pos) => ({ ...pos, dragging: false }));
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={frameRef}
      className="absolute border-2 border-blue-500 rounded bg-white/10 shadow pointer-events-auto select-none"
      style={{
        left: x,
        top: y,
        width: frameWidth,
        height: frameHeight,
        zIndex: 20,
        cursor: position.dragging ? "grabbing" : "grab",
        boxSizing: "border-box",
      }}
      onMouseDown={onMouseDown}
    >
      <div className="absolute left-0 top-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br font-semibold" style={{zIndex: 21}}>
        {label} {frameSize.width}×{frameSize.height}
      </div>
    </div>
  );
}; 