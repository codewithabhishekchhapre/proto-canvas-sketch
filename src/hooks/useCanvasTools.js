
import { useCallback } from "react";
import { createRectangle, createCircle, createText } from "../utils/canvasObjects";

export const useCanvasTools = (fabricCanvas, activeColor, setActiveTool) => {
  const handleMouseDown = useCallback((e, activeTool) => {
    if (!fabricCanvas) return;
    
    if (activeTool === "rectangle") {
      const pointer = fabricCanvas.getPointer(e.e);
      const rect = createRectangle(pointer, activeColor);
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
      setActiveTool("select");
    } else if (activeTool === "circle") {
      const pointer = fabricCanvas.getPointer(e.e);
      const circle = createCircle(pointer, activeColor);
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
      setActiveTool("select");
    } else if (activeTool === "text") {
      const pointer = fabricCanvas.getPointer(e.e);
      const text = createText(pointer, activeColor);
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      setActiveTool("select");
    }
  }, [fabricCanvas, activeColor, setActiveTool]);

  return {
    handleMouseDown
  };
};
