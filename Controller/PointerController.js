class PointerController {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.isStopped = true;
    //this.collisionStop = false;

    this.updateUp = true;
    this.updateDown = true;
    this.updateLeft = true;
    this.updateRight = true;

    this.ballRaius = 10;

    this.keyHandler = new KeyHandlerController();

    this.keyHandler.registerAction("keyup", 32, () => this.isStopped = false);
    this.keyHandler.registerAction("keydown", 32, () => this.isStopped = true);
    this.keyHandler.registerAction("keydown", 38, () => this.onKeyUp());
    this.keyHandler.registerAction("keydown", 40, () => this.onKeyDown());
    this.keyHandler.registerAction("keydown", 37, () => this.onKeyLeft());
    this.keyHandler.registerAction("keydown", 39, () => this.onKeyRight());
  }

  onKeyUp() {
    if (!this.isStopped) {
      // console.log("U", this.updateUp);
      // console.log("D", this.updateDown);
      if (this.updateUp) {
        this.y -= 5;
        this.updateDown = true;
        this.updateLeft = true;
        this.updateRight = true;
      } else {

      }
    }
  }

  onKeyDown() {
    if (!this.isStopped) {
      // console.log("u", this.updateUp);
      // console.log("d", this.updateDown);
      if (this.updateDown) {
        this.y += 5;
        this.updateUp = true;
        this.updateLeft = true;
        this.updateRight = true;
      } else {

      }
    }
  }

  onKeyLeft() {
    if (!this.isStopped) {
      if (this.updateLeft) {
        this.x -= 5;
        this.updateUp = true;
        this.updateDown = true;
        this.updateRight = true;
      } else {

      }
    }
  }

  onKeyRight() {
    if (!this.isStopped) {
      if (this.updateRight) {
        this.x += 5;
        this.updateUp = true;
        this.updateDown = true;
        this.updateLeft = true;
      } else {

      }
    }
  }

  setCollisionPoints() {
    var array = [];

    array.push({
      x: this.x + this.ballRaius * 2,
      y: this.y + this.ballRaius,
      type: "right"
    });
    array.push({
      x: this.x + this.ballRaius,
      y: this.y,
      type: "top"
    });
    array.push({
      x: this.x + this.ballRaius,
      y: this.y + this.ballRaius * 2,
      type: "bottom"
    });
    array.push({
      x: this.x,
      y: this.y + this.ballRaius,
      type: "left"
    });

    return array;
  }

}