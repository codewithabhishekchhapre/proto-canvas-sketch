import { useEffect, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { addGridToCanvas } from "../utils/gridUtils";

export const useCanvas = (canvasRef, canvasSize, showGrid, activeTool, setMousePosition, onMouseDown, zoom = 1, gridSize = 20) => {
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#ffffff",
      selection: activeTool === "select",
    });

    // Add grid background
    if (showGrid) {
      addGridToCanvas(canvas, gridSize, zoom);
    }

    // Enhanced mouse tracking with screen coordinates
    canvas.on('mouse:move', (e) => {
      const pointer = canvas.getPointer(e.e);
      const canvasElement = canvas.getElement();
      const rect = canvasElement.getBoundingClientRect();
      
      setMousePosition({ 
        x: Math.round(pointer.x), 
        y: Math.round(pointer.y),
        canvasX: Math.round(pointer.x),
        canvasY: Math.round(pointer.y),
        screenX: e.e.clientX,
        screenY: e.e.clientY
      });
    });

    // Tool interactions
    canvas.on('mouse:down', (e) => {
      onMouseDown(e, activeTool);
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canvasRef, canvasSize, showGrid, activeTool, setMousePosition, onMouseDown, zoom, gridSize]);

  // Re-add grid on zoom or size change
  useEffect(() => {
    if (fabricCanvas && showGrid) {
      addGridToCanvas(fabricCanvas, gridSize, zoom);
    }
  }, [fabricCanvas, showGrid, zoom, canvasSize.width, canvasSize.height, gridSize]);

  return fabricCanvas;
};
