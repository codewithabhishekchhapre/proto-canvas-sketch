import { useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { Ruler } from "./Ruler";
import { ScreenSizeSelector } from "./ScreenSizeSelector";
import { MouseCoordinates } from "./MouseCoordinates";
import { AxisGuides } from "./AxisGuides";
import { toast } from "sonner";
import { useCanvas } from "../hooks/useCanvas";
import { useCanvasTools } from "../hooks/useCanvasTools";

export const DesignCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTool, setActiveTool] = useState("select");
  const [activeColor, setActiveColor] = useState("#3b82f6");
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [mousePosition, setMousePosition] = useState({ 
    x: 0, 
    y: 0, 
    canvasX: 0, 
    canvasY: 0, 
    screenX: 0, 
    screenY: 0 
  });
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [hasObjects, setHasObjects] = useState(false);

  // Screen size presets
  const screenSizes = {
    desktop: { width: 1200, height: 800, label: "Desktop" },
    tablet: { width: 768, height: 1024, label: "Tablet" },
    mobile: { width: 375, height: 667, label: "Mobile" },
    custom: { width: 1200, height: 800, label: "Custom" }
  };

  // Initialize canvas with placeholder mouse down handler
  const fabricCanvas = useCanvas(
    canvasRef,
    canvasSize,
    showGrid,
    activeTool,
    setMousePosition,
    () => {} // Placeholder that will be replaced
  );

  // Initialize canvas tools hook
  const { handleMouseDown } = useCanvasTools(fabricCanvas, activeColor, setActiveTool);

  // Update the canvas mouse down handler when fabricCanvas and tools are ready
  if (fabricCanvas && fabricCanvas.off) {
    fabricCanvas.off('mouse:down');
    fabricCanvas.on('mouse:down', (e) => {
      handleMouseDown(e, activeTool);
      // Check if we have objects to show guides
      const objects = fabricCanvas.getObjects().filter(obj => !obj.excludeFromExport);
      setHasObjects(objects.length > 0);
    });

    // Track mouse enter/leave for coordinates display
    fabricCanvas.on('mouse:over', () => {
      setShowCoordinates(true);
      if (hasObjects) setShowGuides(true);
    });

    fabricCanvas.on('mouse:out', () => {
      setShowCoordinates(false);
      setShowGuides(false);
    });

    // Update object count when objects are added/removed
    fabricCanvas.on('object:added', () => {
      const objects = fabricCanvas.getObjects().filter(obj => !obj.excludeFromExport);
      setHasObjects(objects.length > 0);
    });

    fabricCanvas.on('object:removed', () => {
      const objects = fabricCanvas.getObjects().filter(obj => !obj.excludeFromExport);
      setHasObjects(objects.length > 0);
    });
  }

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
      setHasObjects(false);
      setShowGuides(false);
      toast("Canvas cleared!");
    }
  };

  const handleScreenSizeChange = (sizeKey) => {
    const size = screenSizes[sizeKey];
    setCanvasSize(size);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Mouse coordinates display */}
      <MouseCoordinates 
        mousePosition={mousePosition}
        zoom={zoom}
        showCoordinates={showCoordinates}
      />

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
            mousePosition={mousePosition}
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
              mousePosition={mousePosition}
            />
          </div>

          {/* Canvas container */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-auto bg-gray-200 p-8 relative"
          >
            <div 
              className="bg-white shadow-lg mx-auto relative"
              style={{ 
                width: canvasSize.width * zoom, 
                height: canvasSize.height * zoom 
              }}
            >
              {/* Axis guides overlay */}
              <AxisGuides 
                mousePosition={mousePosition}
                canvasSize={canvasSize}
                zoom={zoom}
                showGuides={showGuides && hasObjects}
              />
              
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
          <span>Center: {Math.round(canvasSize.width / 2)}, {Math.round(canvasSize.height / 2)}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Zoom: {Math.round(zoom * 100)}%</span>
          <span>Objects: {fabricCanvas?.getObjects().filter(obj => !obj.excludeFromExport).length || 0}</span>
        </div>
      </div>
    </div>
  );
};
