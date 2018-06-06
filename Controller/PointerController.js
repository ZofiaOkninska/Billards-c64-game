class PointerController {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isSpacePressed = false;
    this.keyHandler = new KeyHandlerController();
    console.log(this.keyHandler.registeredActions);

    this.keyHandler.registerAction("keyup", 32, () => this.isSpacePressed = false);
    this.keyHandler.registerAction("keydown", 32, () => this.isSpacePressed = true);
    this.keyHandler.registerAction("keydown", 38, () => this.onKeyUp());
    this.keyHandler.registerAction("keydown", 40, () => this.onKeyDown());
    this.keyHandler.registerAction("keydown", 37, () => this.onKeyLeft());
    this.keyHandler.registerAction("keydown", 39, () => this.onKeyRight());
  }

  onKeyUp() {
    if (!this.isSpacePressed) this.y -= 3;
  }

  onKeyDown() {
    if (!this.isSpacePressed) this.y += 3;
  }

  onKeyLeft() {
    if (!this.isSpacePressed) this.x -= 3;
  }

  onKeyRight() {
    if (!this.isSpacePressed) this.x += 3;
  }

}