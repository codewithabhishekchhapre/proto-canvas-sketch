
import { useEffect, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { addGridToCanvas } from "../utils/gridUtils";

export const useCanvas = (canvasRef, canvasSize, showGrid, activeTool, setMousePosition, onMouseDown) => {
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
      addGridToCanvas(canvas);
    }

    // Mouse tracking
    canvas.on('mouse:move', (e) => {
      const pointer = canvas.getPointer(e.e);
      setMousePosition({ x: Math.round(pointer.x), y: Math.round(pointer.y) });
    });

    // Tool interactions
    canvas.on('mouse:down', (e) => {
      onMouseDown(e, activeTool);
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canvasRef, canvasSize, showGrid, activeTool, setMousePosition, onMouseDown]);

  return fabricCanvas;
};
