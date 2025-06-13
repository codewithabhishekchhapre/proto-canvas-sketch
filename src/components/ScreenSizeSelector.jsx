
import { Monitor, Tablet, Smartphone, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ScreenSizeSelector = ({ sizes, onSizeChange }) => {
  const getIcon = (sizeKey) => {
    switch (sizeKey) {
      case 'desktop':
        return <Monitor size={16} />;
      case 'tablet':
        return <Tablet size={16} />;
      case 'mobile':
        return <Smartphone size={16} />;
      default:
        return <Settings size={16} />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Screen Size:</span>
      <Select onValueChange={onSizeChange} defaultValue="desktop">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sizes).map(([key, size]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                {getIcon(key)}
                <span>{size.label}</span>
                <span className="text-gray-500 text-xs">
                  {size.width} × {size.height}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
