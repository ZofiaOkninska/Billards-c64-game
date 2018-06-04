class Round {
  constructor() {
    this.ballsColors = ["#999f5a", "#7a72c1", "#5c8643", "#7d5290", "#628e9e", "#6d4b0c"];
    this.ballRaius = 10;
  }

  createBalls(ctx) {
    var ballsArray = [];
    var ballsInitPositions = setBallsInitPositions(this.ballRaius);

    function setBallsInitPositions(radius) {
      var width = ctx.canvas.width - 120;
      var height = ctx.canvas.height - 100;
      var positions = [
        [width / 4 - (4 * radius) + 60, height / 2 - (2 * radius + 2.5) + 50],
        [width / 4 - (4 * radius) + 60, height / 2 + 50],
        [width / 4 - (4 * radius) + 60, height / 2 + (2 * radius + 2.5) + 50],
        [width / 4 - (2 * radius) + 60, height / 2 - (radius + 1) + 50],
        [width / 4 - (2 * radius) + 60, height / 2 + (radius + 1) + 50],
        [width / 4 + 60, height / 2 + 50]
      ];
      return positions;
    }

    for (var i = 0; i < 6; i++) {
      var ball = new Ball(ballsInitPositions[i][0], ballsInitPositions[i][1], this.ballRaius, this.ballsColors[i]);
      ball.drawBall(ctx);
      ballsArray.push(ball);
    }

    return ballsArray;
  }

  createWhiteBall(ctx) {
    var whiteBall = new Ball(680 * 0.75 + 60, ctx.canvas.height / 2, this.ballRaius, "#ffffff");
    whiteBall.drawBall(ctx);
    return whiteBall;
  }

  createPointer(ctx) {
    var pointer = new Pointer(680 * 0.75 + 60, ctx.canvas.height / 2);
    pointer.drawPointer(ctx);
    return pointer;
  }
}