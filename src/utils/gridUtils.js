import { Line } from "fabric";

export const addGridToCanvas = (canvas, gridSize = 20, zoom = 1) => {
  // Remove old grid lines
  const oldGridLines = canvas.getObjects().filter(obj => obj.excludeFromExport && obj.type === 'line');
  oldGridLines.forEach(line => canvas.remove(line));

  // Responsive grid size
  const scaledGridSize = gridSize * zoom;
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  // Create grid lines
  const gridLines = [];

  // Vertical lines
  for (let i = 0; i <= width; i += scaledGridSize) {
    const isMajor = Math.round(i / scaledGridSize) % 5 === 0;
    const line = new Line([i, 0, i, height], {
      stroke: isMajor ? '#d1d5db' : '#e5e7eb',
      strokeWidth: isMajor ? 1.5 : 1,
      opacity: isMajor ? 0.5 : 0.25,
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    gridLines.push(line);
  }

  // Horizontal lines
  for (let i = 0; i <= height; i += scaledGridSize) {
    const isMajor = Math.round(i / scaledGridSize) % 5 === 0;
    const line = new Line([0, i, width, i], {
      stroke: isMajor ? '#d1d5db' : '#e5e7eb',
      strokeWidth: isMajor ? 1.5 : 1,
      opacity: isMajor ? 0.5 : 0.25,
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    gridLines.push(line);
  }

  // Add all grid lines to canvas
  gridLines.forEach(line => {
    canvas.add(line);
    canvas.sendObjectToBack(line);
  });
};
