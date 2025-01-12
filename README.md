# @spithacode/input-manager

A lightweight and efficient input management system for handling keyboard and mouse inputs for any HTML element in web applications.

## Features

- ⌨️ Keyboard input handling
- 🖱️ Mouse input management with position tracking
- 🎯 Event-based architecture
- 🔄 Real-time input state updates
- 📦 Modular and reusable design
- 🧹 Automatic cleanup and resource management
- 🎨 Works with any HTML element

## Installation

Using pnpm:

```bash
pnpm add @spithacode/input-manager
```

## Usage

### Basic Example

```typescript
import { InputManager } from "@spithacode/input-manager";

// Initialize the input manager with any HTML element
const targetElement = document.getElementById("your-element");
const inputManager = new InputManager(targetElement);

// Check if a key is pressed
if (inputManager.isKeyPressed("ArrowRight")) {
  // Handle right arrow key press
}

// Get mouse position relative to the element
const mousePos = inputManager.getMousePosition();
console.log(`Mouse position: x=${mousePos.x}, y=${mousePos.y}`);

// Check mouse button state
if (inputManager.isMouseButtonPressed(0)) {
  // Left mouse button
  // Handle left click
}

// Clean up when done
inputManager.destroy();
```

## API Reference

### InputManager Class

The main class that handles all input management. Can be used with any HTML element such as div, canvas, section, or any other valid HTML element.

#### Constructor

```typescript
constructor(element: HTMLElement)
```

- `element`: Any HTML element to attach input listeners to (div, canvas, section, etc.)

#### Methods

- `isKeyPressed(key: Key): boolean`

  - Check if a specific key is currently pressed
  - Returns `true` if the key is pressed, `false` otherwise

- `isMouseButtonPressed(button: MouseButton): boolean`

  - Check if a mouse button is pressed
  - Button values: 0 (left), 1 (middle), 2 (right)
  - Returns `true` if the button is pressed, `false` otherwise

- `getMousePosition(): MousePosition`

  - Get current mouse coordinates relative to the target element
  - Returns `{ x: number, y: number }`

- `reset(): void`

  - Reset all input states

- `destroy(): void`
  - Clean up event listeners and resources

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Spithacode](https://github.com/spithacode)

## Author

- [Spithacode](https://github.com/spithacode)
- Website: [https://spithacode.com](https://spithacode.com)
