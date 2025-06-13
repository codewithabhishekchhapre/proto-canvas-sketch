export const AxisGuides = ({ mousePosition, canvasSize, zoom, showGuides }) => {
  if (!showGuides) return null;

  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;
  const scaledCenterX = centerX * zoom;
  const scaledCenterY = centerY * zoom;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Vertical axis line */}
      <div
        className="absolute bg-red-400 opacity-60"
        style={{
          left: mousePosition.canvasX * zoom + 8,
          top: 8,
          width: '1px',
          height: canvasSize.height * zoom,
        }}
      />
      
      {/* Horizontal axis line */}
      <div
        className="absolute bg-red-400 opacity-60"
        style={{
          left: 8,
          top: mousePosition.canvasY * zoom + 8,
          width: canvasSize.width * zoom,
          height: '1px',
        }}
      />

      {/* Center vertical guide */}
      <div
        className="absolute bg-blue-400 opacity-40"
        style={{
          left: scaledCenterX + 8,
          top: 8,
          width: '1px',
          height: canvasSize.height * zoom,
        }}
      />

      {/* Center horizontal guide */}
      <div
        className="absolute bg-blue-400 opacity-40"
        style={{
          left: 8,
          top: scaledCenterY + 8,
          width: canvasSize.width * zoom,
          height: '1px',
        }}
      />

      {/* Center point indicator */}
      <div
        className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-60"
        style={{
          left: scaledCenterX + 4,
          top: scaledCenterY + 4,
        }}
      />
    </div>
  );
};
