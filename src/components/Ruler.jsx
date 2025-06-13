
export const Ruler = ({ orientation, length, zoom = 1, offset = 0, mousePosition = { x: 0, y: 0 } }) => {
  const scale = zoom;
  const unit = 10; // pixels per unit
  const majorTick = 50; // major tick every 50 pixels
  const minorTick = 10; // minor tick every 10 pixels

  const renderTicks = () => {
    const ticks = [];
    const maxLength = length * scale;

    for (let i = 0; i <= maxLength; i += minorTick * scale) {
      const isMajor = i % (majorTick * scale) === 0;
      const actualPosition = i / scale;
      
      if (orientation === 'horizontal') {
        ticks.push(
          <div
            key={i}
            className={`absolute bg-gray-400 ${
              isMajor ? 'h-4 w-px' : 'h-2 w-px'
            }`}
            style={{ 
              left: i + offset,
              top: isMajor ? 0 : 2
            }}
          />
        );

        if (isMajor && actualPosition > 0) {
          ticks.push(
            <div
              key={`label-${i}`}
              className="absolute text-xs text-gray-600 font-mono"
              style={{ 
                left: i + offset - 8,
                top: 16,
                fontSize: '10px'
              }}
            >
              {Math.round(actualPosition)}
            </div>
          );
        }
      } else {
        ticks.push(
          <div
            key={i}
            className={`absolute bg-gray-400 ${
              isMajor ? 'w-4 h-px' : 'w-2 h-px'
            }`}
            style={{ 
              top: i + offset,
              left: isMajor ? 0 : 2
            }}
          />
        );

        if (isMajor && actualPosition > 0) {
          ticks.push(
            <div
              key={`label-${i}`}
              className="absolute text-xs text-gray-600 font-mono"
              style={{ 
                top: i + offset - 6,
                left: 16,
                fontSize: '10px',
                transform: 'rotate(-90deg)',
                transformOrigin: 'center'
              }}
            >
              {Math.round(actualPosition)}
            </div>
          );
        }
      }
    }

    return ticks;
  };

  const renderMouseIndicator = () => {
    if (orientation === 'horizontal') {
      return (
        <div
          className="absolute w-px h-8 bg-red-500 opacity-80 z-10"
          style={{
            left: mousePosition.x * scale + offset,
            top: 0,
          }}
        />
      );
    } else {
      return (
        <div
          className="absolute w-8 h-px bg-red-500 opacity-80 z-10"
          style={{
            top: mousePosition.y * scale + offset,
            left: 0,
          }}
        />
      );
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      {renderTicks()}
      {renderMouseIndicator()}
    </div>
  );
};
