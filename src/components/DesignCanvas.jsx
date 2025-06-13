
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Text, Line } from "fabric";
import { Toolbar } from "./Toolbar";
import { Ruler } from "./Ruler";
import { ScreenSizeSelector } from "./ScreenSizeSelector";
import { toast } from "sonner";

export const DesignCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState("select");
  const [activeColor, setActiveColor] = useState("#3b82f6");
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Screen size presets
  const screenSizes = {
    desktop: { width: 1200, height: 800, label: "Desktop" },
    tablet: { width: 768, height: 1024, label: "Tablet" },
    mobile: { width: 375, height: 667, label: "Mobile" },
    custom: { width: 1200, height: 800, label: "Custom" }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

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
      if (activeTool === "rectangle") {
        addRectangle(canvas, e);
      } else if (activeTool === "circle") {
        addCircle(canvas, e);
      } else if (activeTool === "text") {
        addText(canvas, e);
      }
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canvasSize, showGrid, activeTool, activeColor]);

  const addGridToCanvas = (canvas) => {
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

    gridLines.forEach(line => canvas.add(line));
    canvas.sendToBack(...gridLines);
  };

  const addRectangle = (canvas, e) => {
    const pointer = canvas.getPointer(e.e);
    const rect = new Rect({
      left: pointer.x - 50,
      top: pointer.y - 25,
      width: 100,
      height: 50,
      fill: activeColor,
      stroke: '#374151',
      strokeWidth: 1,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    setActiveTool("select");
  };

  const addCircle = (canvas, e) => {
    const pointer = canvas.getPointer(e.e);
    const circle = new Circle({
      left: pointer.x - 30,
      top: pointer.y - 30,
      radius: 30,
      fill: activeColor,
      stroke: '#374151',
      strokeWidth: 1,
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    setActiveTool("select");
  };

  const addText = (canvas, e) => {
    const pointer = canvas.getPointer(e.e);
    const text = new Text('Text', {
      left: pointer.x,
      top: pointer.y,
      fill: activeColor,
      fontSize: 16,
      fontFamily: 'Arial',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setActiveTool("select");
  };

  const handleZoom = (newZoom) => {
    if (fabricCanvas) {
      fabricCanvas.setZoom(newZoom);
      setZoom(newZoom);
    }
  };

  const handleClear = () => {
    if (fabricCanvas) {
      const objects = fabricCanvas.getObjects().filter(obj => !obj.excludeFromExport);
      objects.forEach(obj => fabricCanvas.remove(obj));
      toast("Canvas cleared!");
    }
  };

  const handleScreenSizeChange = (sizeKey) => {
    const size = screenSizes[sizeKey];
    setCanvasSize(size);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <Toolbar 
          activeTool={activeTool}
          onToolChange={setActiveTool}
          activeColor={activeColor}
          onColorChange={setActiveColor}
          showGrid={showGrid}
          onGridToggle={setShowGrid}
          zoom={zoom}
          onZoomChange={handleZoom}
          onClear={handleClear}
        />
        <ScreenSizeSelector 
          sizes={screenSizes}
          onSizeChange={handleScreenSizeChange}
        />
      </div>

      {/* Canvas area with rulers */}
      <div className="flex-1 flex">
        {/* Vertical ruler */}
        <div className="w-8 bg-gray-100 border-r border-gray-200">
          <Ruler 
            orientation="vertical" 
            length={canvasSize.height} 
            zoom={zoom}
            offset={30}
          />
        </div>

        {/* Main canvas area */}
        <div className="flex-1 flex flex-col">
          {/* Horizontal ruler */}
          <div className="h-8 bg-gray-100 border-b border-gray-200">
            <Ruler 
              orientation="horizontal" 
              length={canvasSize.width} 
              zoom={zoom}
              offset={8}
            />
          </div>

          {/* Canvas container */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-auto bg-gray-200 p-8"
          >
            <div 
              className="bg-white shadow-lg mx-auto"
              style={{ 
                width: canvasSize.width * zoom, 
                height: canvasSize.height * zoom 
              }}
            >
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Mouse: {mousePosition.x}, {mousePosition.y}</span>
          <span>Canvas: {canvasSize.width} × {canvasSize.height}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Zoom: {Math.round(zoom * 100)}%</span>
          <span>Objects: {fabricCanvas?.getObjects().filter(obj => !obj.excludeFromExport).length || 0}</span>
        </div>
      </div>
    </div>
  );
};
