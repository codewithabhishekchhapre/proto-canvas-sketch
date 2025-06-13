
export const MouseCoordinates = ({ mousePosition, zoom, showCoordinates }) => {
  if (!showCoordinates) return null;

  return (
    <div
      className="fixed bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-50"
      style={{
        left: mousePosition.screenX + 10,
        top: mousePosition.screenY - 30,
        fontSize: '11px'
      }}
    >
      {mousePosition.x}, {mousePosition.y}
    </div>
  );
};
