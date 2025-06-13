
import { Line } from "fabric";

export const addGridToCanvas = (canvas) => {
  const gridSize = 20;
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  // Create grid lines
  const gridLines = [];

  // Vertical lines
  for (let i = 0; i <= width; i += gridSize) {
    const line = new Line([i, 0, i, height], {
      stroke: '#e5e7eb',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    gridLines.push(line);
  }

  // Horizontal lines
  for (let i = 0; i <= height; i += gridSize) {
    const line = new Line([0, i, width, i], {
      stroke: '#e5e7eb',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    gridLines.push(line);
  }

  // Add all grid lines to canvas
  gridLines.forEach(line => {
    canvas.add(line);
    canvas.sendToBack(line); // Send each line to back individually
  });
};
