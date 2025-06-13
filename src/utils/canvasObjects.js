
import { Rect, Circle, Text } from "fabric";

export const createRectangle = (pointer, color) => {
  return new Rect({
    left: pointer.x - 50,
    top: pointer.y - 25,
    width: 100,
    height: 50,
    fill: color,
    stroke: '#374151',
    strokeWidth: 1,
  });
};

export const createCircle = (pointer, color) => {
  return new Circle({
    left: pointer.x - 30,
    top: pointer.y - 30,
    radius: 30,
    fill: color,
    stroke: '#374151',
    strokeWidth: 1,
  });
};

export const createText = (pointer, color) => {
  return new Text('Text', {
    left: pointer.x,
    top: pointer.y,
    fill: color,
    fontSize: 16,
    fontFamily: 'Arial',
  });
};
