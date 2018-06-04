class Table {
  constructor(contextPool, contextBalls, initContoller) {
    this.contextPool = contextPool;
    this.contextBalls = contextBalls;
    this.initContoller = initContoller;

    this.balls = [];
    this.whiteBall = null;
    this.pointer = null;

    this.pockets = [];
    this.edges = [];

    this.roundCount = 0;
    this.shots = 0;
    this.score = 0;

    this._fillContextPool(this.contextPool);

    this.round = this._createNewRound();

    this.render();
  }

  _fillContextPool() {
    var topY = 50;
    var bottomY = 350;
    var leftX = 60;
    var middleX = 400;
    var rightX = 740;

    let path = new Path2D();

    let drawTableEdges = () => {
      path.arc(leftX, topY, 20, Math.PI / 2, Math.PI * 2);
      this.edges[0].moveTo(80, 50);
      this.edges[0].lineTo(380, 50);
      path.addPath(this.edges[0]);
      path.arc(middleX, topY, 20, Math.PI, Math.PI * 2);
      this.edges[1].moveTo(420, 50);
      this.edges[1].lineTo(720, 50);
      path.addPath(this.edges[1]);
      path.arc(rightX, topY, 20, Math.PI, Math.PI / 2);
      this.edges[2].moveTo(740, 70);
      this.edges[2].lineTo(740, 330);
      path.addPath(this.edges[2]);
      path.arc(rightX, bottomY, 20, Math.PI * 1.5, Math.PI);
      this.edges[3].moveTo(720, 350);
      this.edges[3].lineTo(420, 350);
      path.addPath(this.edges[3]);
      path.arc(middleX, bottomY, 20, 0, Math.PI);
      this.edges[4].moveTo(380, 350);
      this.edges[4].lineTo(80, 350);
      path.addPath(this.edges[4]);
      path.arc(leftX, bottomY, 20, 0, Math.PI * 1.5);
      this.edges[5].moveTo(60, 330);
      this.edges[5].lineTo(60, 70);
      path.addPath(this.edges[5]);
    };
    let setPocketsCollisionEdges = () => {
      this.pockets[0].moveTo(60, 70);
      this.pockets[0].lineTo(60, 50);
      this.pockets[0].lineTo(80, 50);

      this.pockets[1].moveTo(380, 50);
      this.pockets[1].lineTo(400, 40);
      this.pockets[1].lineTo(420, 50);

      this.pockets[2].moveTo(720, 50);
      this.pockets[2].lineTo(740, 50);
      this.pockets[2].lineTo(740, 70);

      this.pockets[3].moveTo(740, 330);
      this.pockets[3].lineTo(740, 350);
      this.pockets[3].lineTo(720, 350);

      this.pockets[4].moveTo(420, 350);
      this.pockets[4].lineTo(400, 360);
      this.pockets[4].lineTo(380, 350);

      this.pockets[5].moveTo(80, 350);
      this.pockets[5].lineTo(60, 350);
      this.pockets[5].lineTo(60, 330);
    };

    /* draw pool */
    this.contextPool.rect(0, 0, this.contextPool.canvas.width, this.contextPool.canvas.height);
    this.contextPool.fillStyle = "#8d7803";
    this.contextPool.fill();

    for (var i = 0; i < 6; i++) {
      this.pockets[i] = new Path2D();
      this.edges[i] = new Path2D();
    }

    drawTableEdges();
    this.contextPool.stroke(path);

    this.contextPool.fillStyle = "#000000";
    this.contextPool.fill(path);
    this.contextPool.fillRect(60, 50, this.contextPool.canvas.width - 120, this.contextPool.canvas.height - 100);

    setPocketsCollisionEdges();
    //this.contextPool.stroke(this.pockets[5]);

    /* draw helpful points */
    var r1 = new Path2D(),
      r2 = new Path2D();
    r1.rect(226.5, 196.5, 7, 7);
    r2.rect(566.5, 196.5, 7, 7);
    this.contextPool.fillStyle = "#ffffff";
    this.contextPool.fill(r1);
    this.contextPool.fill(r2);
  }

  _createNewRound() {
    var round = new Round();
    this.balls = round.createBalls(this.contextBalls);
    this.whiteBall = round.createWhiteBall(this.contextBalls);
    this.pointer = round.createPointer(this.contextBalls);
    return round;
  }

  render() {
    setInterval(() => {
      this.initContoller.updateControls(this.roundCount, this.shots, this.score);
      //this.contextBalls.clearRect(0, 0, this.contextBalls.canvas.width, this.contextBalls.canvas.height);

      //checkCollisionWithEdges();
      //checkCollisionWithPockets();

      if (this.round) {
        // round.updateBalls();
        // round.updateWhiteBall();
        // round.updatePointer();
      }

      //console.log("does");
    }, 1000 / 60);
  }

}