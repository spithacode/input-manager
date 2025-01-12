import { Key } from "./types/keys";
import { MouseButton, MousePosition } from "./types/mouse";
import { validKeys } from "./validKeys"; // Import valid keys

export class InputManager {
  private keys: Set<Key> = new Set();
  private mouseButtons: Set<MouseButton> = new Set();
  private mousePosition: MousePosition = { x: 0, y: 0 };
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    // Mouse event listeners
    this.element.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.element.addEventListener("mouseup", this.onMouseUp.bind(this));

    // Keyboard event listeners
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.element.getBoundingClientRect();
    this.mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private onMouseDown(event: MouseEvent): void {
    const button = event.button as MouseButton;

    this.mouseButtons.add(button);
  }

  private onMouseUp(event: MouseEvent): void {
    const button = event.button as MouseButton;

    this.mouseButtons.delete(button);
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (this.isValidKey(event.key)) {
      this.keys.add(event.key as Key);
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    if (this.isValidKey(event.key)) {
      this.keys.delete(event.key as Key);
    }
  }

  private isValidKey(key: string): key is Key {
    // Check if the key exists in the validKeys array
    return validKeys.includes(key as any);
  }

  public isKeyPressed(key: Key): boolean {
    return this.keys.has(key);
  }

  public isMouseButtonPressed(button: MouseButton): boolean {
    return this.mouseButtons.has(button);
  }

  public getMousePosition(): MousePosition {
    return this.mousePosition;
  }

  public reset(): void {
    this.mouseButtons.clear();
  }

  public destroy(): void {
    this.element.removeEventListener("mousemove", this.onMouseMove.bind(this));
    this.element.removeEventListener("mousedown", this.onMouseDown.bind(this));
    this.element.removeEventListener("mouseup", this.onMouseUp.bind(this));
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
    window.removeEventListener("keyup", this.onKeyUp.bind(this));
  }
}
