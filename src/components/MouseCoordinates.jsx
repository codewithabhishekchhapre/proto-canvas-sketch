export const MouseCoordinates = ({ show, x, y, label }) => {
  if (!show) return null;
  return (
    <div
      className="fixed bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-50"
      style={{
        left: x - 60,
        top: y - 10,
        fontSize: '11px',
        minWidth: 40,
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  );
};
