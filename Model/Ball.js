class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.beatedPositionX = 0;
    this.beatedPositionY = 0;

    this.velocity = 0;
  }
}