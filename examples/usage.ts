// Example showing how to use the package with TypeScript
import { InputManager } from '../src';
import { MouseButton } from '../src/types/mouse';

// Create a function that shows how to use the package with proper type checking
function createInputManager(): void {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  
  // Initialize the input manager with the canvas element
  const inputManager = new InputManager(canvas);
  
  // Example of checking if a key is pressed - TypeScript will enforce valid key names
  const isAPressed = inputManager.isKeyPressed('A');
  const isArrowUpPressed = inputManager.isKeyPressed('ArrowUp');
  
  // Example of checking if a mouse button is pressed - TypeScript enforces the enum
  const isLeftButtonPressed = inputManager.isMouseButtonPressed(MouseButton.Left);
  const isRightButtonPressed = inputManager.isMouseButtonPressed(MouseButton.Right);
  
  // Example of getting the mouse position
  const mousePosition = inputManager.getMousePosition();
  const mouseX = mousePosition.x;
  const mouseY = mousePosition.y;
  
  // Log some info
  console.log('Key A pressed:', isAPressed);
  console.log('Mouse position:', mouseX, mouseY);
  
  // Clean up when done
  inputManager.reset();
  inputManager.destroy();
}

// This example doesn't actually run, it just demonstrates the types
// TypeScript would throw errors for invalid keys or mouse buttons
// The following lines would cause TypeScript errors if uncommented:
// 
// function invalidExample(): void {
//   const canvas = document.createElement('canvas');
//   const inputManager = new InputManager(canvas);
//   
//   // Error: 'InvalidKey' is not assignable to parameter of type 'Key'
//   inputManager.isKeyPressed('InvalidKey');
//   
//   // Error: Argument of type 'number' is not assignable to parameter of type 'MouseButton'
//   inputManager.isMouseButtonPressed(999);
// }

export { createInputManager }; 