import { InputManager } from '../input-manager';
import { MouseButton } from '../types/mouse';

describe('InputManager', () => {
  let inputManager: InputManager;
  let element: HTMLElement;
  
  beforeEach(() => {
    // Create a real DOM element using jsdom
    element = document.createElement('div');
    
    // Set element size and position via style
    element.style.position = 'absolute';
    element.style.left = '10px';
    element.style.top = '20px';
    element.style.width = '100px';
    element.style.height = '100px';
    
    // Add to document body to properly handle events
    document.body.appendChild(element);
    
    // Create input manager with real element
    inputManager = new InputManager(element);
  });
  
  afterEach(() => {
    // Clean up
    inputManager.destroy();
    document.body.removeChild(element);
  });
  
  test('constructor should initialize with default values', () => {
    // Verify default state
    expect(inputManager.isKeyPressed('A')).toBe(false);
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(false);
    expect(inputManager.getMousePosition()).toEqual({ x: 0, y: 0 });
  });
  
  test('mouse events should update position and button state', () => {
    // Simulate mouse move
    const mouseMoveEvent = new MouseEvent('mousemove', { 
      clientX: 50, 
      clientY: 60,
      bubbles: true 
    });
    element.dispatchEvent(mouseMoveEvent);
    
    // Position will be relative to element bounds
    const position = inputManager.getMousePosition();
    expect(position.x).toBeGreaterThan(0);
    expect(position.y).toBeGreaterThan(0);
    
    // Simulate mouse down
    const mouseDownEvent = new MouseEvent('mousedown', { 
      button: MouseButton.Left,
      bubbles: true
    });
    element.dispatchEvent(mouseDownEvent);
    
    // Button should be pressed
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(true);
    
    // Simulate mouse up
    const mouseUpEvent = new MouseEvent('mouseup', { 
      button: MouseButton.Left,
      bubbles: true
    });
    element.dispatchEvent(mouseUpEvent);
    
    // Button should be released
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(false);
  });
  
  test('multiple mouse buttons can be tracked simultaneously', () => {
    // Press left mouse button
    element.dispatchEvent(new MouseEvent('mousedown', { 
      button: MouseButton.Left,
      bubbles: true
    }));
    
    // Press right mouse button
    element.dispatchEvent(new MouseEvent('mousedown', { 
      button: MouseButton.Right,
      bubbles: true
    }));
    
    // Both buttons should be pressed
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(true);
    expect(inputManager.isMouseButtonPressed(MouseButton.Right)).toBe(true);
    
    // Release left button
    element.dispatchEvent(new MouseEvent('mouseup', { 
      button: MouseButton.Left,
      bubbles: true
    }));
    
    // Left should be released, right still pressed
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(false);
    expect(inputManager.isMouseButtonPressed(MouseButton.Right)).toBe(true);
  });
  
  test('key events should update key state for valid keys', () => {
    // Simulate key down for a valid key
    const keyDownEvent = new KeyboardEvent('keydown', { key: 'A' });
    window.dispatchEvent(keyDownEvent);
    
    // Key should be pressed
    expect(inputManager.isKeyPressed('A')).toBe(true);
    
    // Simulate key up
    const keyUpEvent = new KeyboardEvent('keyup', { key: 'A' });
    window.dispatchEvent(keyUpEvent);
    
    // Key should be released
    expect(inputManager.isKeyPressed('A')).toBe(false);
  });
  
  test('multiple keys can be tracked simultaneously', () => {
    // Press A key
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    
    // Press B key
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'B' }));
    
    // Both keys should be pressed
    expect(inputManager.isKeyPressed('A')).toBe(true);
    expect(inputManager.isKeyPressed('B')).toBe(true);
    
    // Release A key
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'A' }));
    
    // A should be released, B still pressed
    expect(inputManager.isKeyPressed('A')).toBe(false);
    expect(inputManager.isKeyPressed('B')).toBe(true);
  });
  
  test('key events should ignore invalid keys', () => {
    // Simulate key down for an invalid key
    const keyDownEvent = new KeyboardEvent('keydown', { key: 'InvalidKey' });
    window.dispatchEvent(keyDownEvent);
    
    // Check that the invalid key did not affect any valid keys
    expect(inputManager.isKeyPressed('A')).toBe(false);
  });
  
  test('reset should clear all mouse buttons but not keys', () => {
    // Press mouse button
    element.dispatchEvent(new MouseEvent('mousedown', { 
      button: MouseButton.Left,
      bubbles: true
    }));
    
    // Press key
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    
    // Verify they're pressed
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(true);
    expect(inputManager.isKeyPressed('A')).toBe(true);
    
    // Reset
    inputManager.reset();
    
    // Mouse button should be reset, but key should still be pressed
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(false);
    expect(inputManager.isKeyPressed('A')).toBe(true);
  });
  
  test('destroy should clean up the input manager', () => {
    // Set up initial state
    element.dispatchEvent(new MouseEvent('mousedown', { 
      button: MouseButton.Left,
      bubbles: true
    }));
    
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    
    // Verify they're tracked
    expect(inputManager.isMouseButtonPressed(MouseButton.Left)).toBe(true);
    expect(inputManager.isKeyPressed('A')).toBe(true);
    
    // Destroy
    inputManager.destroy();
    
    // Create a new input manager (events should be removed from previous one)
    const newInputManager = new InputManager(element);
    
    // New manager should start fresh
    expect(newInputManager.isMouseButtonPressed(MouseButton.Left)).toBe(false);
    expect(newInputManager.isKeyPressed('A')).toBe(false);
    
    // Clean up the new manager too
    newInputManager.destroy();
  });
  
  test('Space key should be properly tracked', () => {
    // Simulate Space key down with correct browser event.key value (a space character)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    
    // Space should be pressed (using the string "Space")
    expect(inputManager.isKeyPressed(' ')).toBe(true);
    
    // Simulate Space key up
    window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
    
    // Space should be released
    expect(inputManager.isKeyPressed(' ')).toBe(false);
  });
}); 