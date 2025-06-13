
import { 
  MousePointer, 
  Square, 
  Circle, 
  Type, 
  Grid3X3, 
  ZoomIn, 
  ZoomOut, 
  Trash2,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Toolbar = ({ 
  activeTool, 
  onToolChange, 
  activeColor, 
  onColorChange,
  showGrid,
  onGridToggle,
  zoom,
  onZoomChange,
  onClear
}) => {
  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "text", icon: Type, label: "Text" },
  ];

  const colors = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", 
    "#8b5cf6", "#ec4899", "#6b7280", "#000000"
  ];

  return (
    <div className="flex items-center gap-4">
      {/* Drawing tools */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onToolChange(tool.id)}
              className="w-9 h-9"
              title={tool.label}
            >
              <Icon size={16} />
            </Button>
          );
        })}
      </div>

      {/* Color picker */}
      <div className="flex items-center gap-2">
        <Palette size={16} className="text-gray-600" />
        <div className="flex items-center gap-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-6 h-6 rounded border-2 ${
                activeColor === color ? "border-gray-800" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* View controls */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={showGrid ? "default" : "ghost"}
          size="sm"
          onClick={() => onGridToggle(!showGrid)}
          className="w-9 h-9"
          title="Toggle Grid"
        >
          <Grid3X3 size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onZoomChange(Math.max(0.25, zoom - 0.25))}
          className="w-9 h-9"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </Button>
        
        <span className="px-2 text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onZoomChange(Math.min(4, zoom + 0.25))}
          className="w-9 h-9"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </Button>
      </div>

      {/* Clear button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        className="flex items-center gap-2"
      >
        <Trash2 size={16} />
        Clear
      </Button>
    </div>
  );
};
