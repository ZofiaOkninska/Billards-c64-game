class RoundController {
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
      this.drawBall(ctx, ball);
      ballsArray.push(ball);
    }

    return ballsArray;
  }

  createWhiteBall(ctx) {
    var whiteBall = new Ball(680 * 0.75 + 60, ctx.canvas.height / 2, this.ballRaius, "#ffffff");
    this.drawBall(ctx, whiteBall);
    return whiteBall;
  }

  createPointer(ctx) {
    var pointerX = 680 * 0.75 + 60 - this.ballRaius;
    var pointerY = ctx.canvas.height / 2 - this.ballRaius;
    var pointer = new PointerController(pointerX, pointerY);
    this.drawPointer(ctx, pointer);
    return pointer;
  }


  drawBalls(ctx, ballsArray) {
    for (let ball of ballsArray) {
      this.drawBall(ctx, ball);
    }
  }

  drawBall(ctx, ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = ball.color;
    ctx.stroke();
    ctx.fillStyle = ball.color;
    ctx.fill();
  }

  drawPointer(ctx, pointer) {
    let pointerImg = new Image();
    pointerImg.src = 'View/Assets/pointer.png';
    //pointerImg.onload = () => {
    ctx.drawImage(pointerImg, pointer.x, pointer.y, this.ballRaius * 2, this.ballRaius * 2);
    //};
  }
}