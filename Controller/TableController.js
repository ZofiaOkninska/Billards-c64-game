class TableController {
  constructor(contextPool, contextBalls, initContoller) {
    this.contextPool = contextPool;
    this.contextBalls = contextBalls;
    this.initContoller = initContoller;

    //game utils
    this.balls = [];
    this.whiteBall = null;
    this.pointer = null;

    //collisions
    this.pockets = [];
    this.edges = [];
    //this.pointerTable = null;

    //controls
    this.roundCount = 0;
    this.shots = 0;
    this.score = 0;

    //gameplay
    this.isTableStable = true;
    this.detectedPointerCollision = false;
    this.shot = false;

    /* methods */
    this._fillContextPool(this.contextPool);
    this.roundController = this._createNewRound();

    this.keyHandler = new KeyHandlerController();
    this.keyHandler.registerAction("keydown", 32, () => this._setEventOnSpaceDown());
    this.keyHandler.registerAction("keyup", 32, () => this._setEventOnSpaceUp());

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
      this.contextPool.stroke(this.edges[0]);
      path.arc(middleX, topY, 20, Math.PI, Math.PI * 2);
      this.edges[1].moveTo(420, 50);
      this.edges[1].lineTo(720, 50);
      this.contextPool.stroke(this.edges[1]);
      path.arc(rightX, topY, 20, Math.PI, Math.PI / 2);
      this.edges[2].moveTo(740, 70);
      this.edges[2].lineTo(740, 330);
      this.contextPool.stroke(this.edges[2]);
      path.arc(rightX, bottomY, 20, Math.PI * 1.5, Math.PI);
      this.edges[3].moveTo(720, 350);
      this.edges[3].lineTo(420, 350);
      this.contextPool.stroke(this.edges[3]);
      path.arc(middleX, bottomY, 20, 0, Math.PI);
      this.edges[4].moveTo(380, 350);
      this.edges[4].lineTo(80, 350);
      this.contextPool.stroke(this.edges[4]);
      path.arc(leftX, bottomY, 20, 0, Math.PI * 1.5);
      this.edges[5].moveTo(60, 330);
      this.edges[5].lineTo(60, 70);
      this.contextPool.stroke(this.edges[5]);
    };

    let setPocketsCollisionEdges = () => {
      this.pockets[0].moveTo(60, 70);
      this.pockets[0].lineTo(60, 50);
      this.pockets[0].lineTo(80, 50);
      this.contextPool.stroke(this.pockets[0]); //to comment
      this.pockets[1].moveTo(380, 50);
      this.pockets[1].lineTo(400, 40);
      this.pockets[1].lineTo(420, 50);
      this.contextPool.stroke(this.pockets[1]);
      this.pockets[2].moveTo(720, 50);
      this.pockets[2].lineTo(740, 50);
      this.pockets[2].lineTo(740, 70);
      this.contextPool.stroke(this.pockets[2]);
      this.pockets[3].moveTo(740, 330);
      this.pockets[3].lineTo(740, 350);
      this.pockets[3].lineTo(720, 350);
      this.contextPool.stroke(this.pockets[3]);
      this.pockets[4].moveTo(420, 350);
      this.pockets[4].lineTo(400, 360);
      this.pockets[4].lineTo(380, 350);
      this.contextPool.stroke(this.pockets[4]);
      this.pockets[5].moveTo(80, 350);
      this.pockets[5].lineTo(60, 350);
      this.pockets[5].lineTo(60, 330);
      this.contextPool.stroke(this.pockets[5]);
    };

    // let setPointerTableCollision = () => {
    //   this.pointerTable = new Path2D();
    //   //this.pointerTable.rect(60, 50, 740, 350);
    //   this.pointerTable.moveTo(60, 50);
    //   this.pointerTable.lineTo(740, 50);
    //   this.pointerTable.lineTo(740, 350);
    //   this.pointerTable.lineTo(60, 350);
    //   this.pointerTable.lineTo(60, 50);
    // };

    /* draw pool */
    this.contextPool.rect(0, 0, this.contextPool.canvas.width, this.contextPool.canvas.height);
    this.contextPool.fillStyle = "#8d7803";
    this.contextPool.fill();

    for (var i = 0; i < 6; i++) {
      this.pockets[i] = new Path2D();
      this.edges[i] = new Path2D();
    }

    drawTableEdges();
    //this.contextPool.stroke(path);

    this.contextPool.fillStyle = "#000000";
    this.contextPool.fill(path);
    //this.contextPool.fillRect(60, 50, this.contextPool.canvas.width - 120, this.contextPool.canvas.height - 100);

    setPocketsCollisionEdges();
    //setPointerTableCollision();

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
    var round = new RoundController();
    this.balls = round.createBalls(this.contextBalls);
    this.whiteBall = round.createWhiteBall(this.contextBalls);
    this.pointer = round.createPointer(this.contextBalls);
    this.roundCount++;
    return round;
  }

  _setEventOnSpaceDown() {
    if (!this.shot) this.shot = new Shot();
    this.isTableStable = false; //!!!!!!!!!!!
    var cueDiv = document.getElementById('cue');

    if (this.shot.strenght <= 5) {
      this.shot.strenght += 1;
      var marginLeft = window.getComputedStyle(cueDiv).marginLeft;
      cueDiv.style.marginLeft = (this.shot.strenght * 15) + "px";
    }
  }

  _setEventOnSpaceUp() {
    if (this.shot) {
      let deltaX = this.pointer.x - this.whiteBall.x; //distance between vector pos x
      let deltaY = this.pointer.y - this.whiteBall.y; //distance between vector pos y
      let angle = Math.atan2(deltaX, deltaY); //angle of point to the axes
      let directionVector = new Vector(Math.sin(Math.atan2(deltaX, deltaY)), Math.cos(Math.atan2(deltaX, deltaY)));

      directionVector.multiplyByScalar(this.shot.strenght);
      console.log(directionVector);
      //this.pointer.isStopped = true;  //for time of shot


      //var cueDiv = document.getElementById('cue');
      //cueDiv.style.marginLeft = "0px";
      //this.shot = null;
      //this.isTableStable = true;
    }
  }

  //collisions
  _checkBallsCollisionWithEdges() {
    for (let ball of this.balls) {
      for (let edge of this.edges) {
        if (this.contextPool.isPointInStroke(edge, ball.x - ball.radius, ball.y - ball.radius)) { //radius +- (do a vectors! => distance <= 0) //or do a funct!!
          //odbij kulkę (kąt padania == kąt odbicia)
        }
      }
    }
  }

  _checkBallsCollisionWithPockets() {
    for (let ball of this.balls) {
      for (let pocket of this.pockets) {
        if (this.contextPool.isPointInStroke(pocket, ball.x, ball.y)) {
          //zatrzymaj kulke
          //set kulka stała position (ball.beatedPositionX)
        }

        if (this.contextPool.isPointInStroke(pocket, 60, 75)) {
          console.log("mmmm");
        }
      }
    }
  }

  _checkPointerCollisionWithTable() {
    var collisionPoints = this.pointer.setCollisionPoints();

    for (let point of collisionPoints) {
      for (let edge of this.edges) {
        if (this.contextPool.isPointInStroke(edge, point.x, point.y)) {
          //console.log("hahahaha");
          this._checkPointerCollisionDirection(point);
        }
      }

      for (let pocket of this.pockets) {
        if (this.contextPool.isPointInStroke(pocket, point.x, point.y)) {
          //console.log("hahahaha");
          this._checkPointerCollisionDirection(point);
        }
      }
    }
  }

  _checkPointerCollisionDirection(point) {
    switch (point.type) {
      case "top":
        this.pointer.updateUp = false;
        break;
      case "bottom":
        this.pointer.updateDown = false;
        break;
      case "left":
        this.pointer.updateLeft = false;
        break;
      case "right":
        this.pointer.updateRight = false;
        break;
    }
  }

  render() {
    setInterval(() => {
      this.contextBalls.clearRect(0, 0, this.contextBalls.canvas.width, this.contextBalls.canvas.height);

      this._checkBallsCollisionWithEdges();
      this._checkBallsCollisionWithPockets(); //if its white ball -> give it on table
      this._checkPointerCollisionWithTable();

      if (this.roundController) {
        this.roundController.drawBalls(this.contextBalls, this.balls); //if (!this.detectedPointerCollision) useful!!! (not!)
        this.roundController.drawBall(this.contextBalls, this.whiteBall);
        this.roundController.drawPointer(this.contextBalls, this.pointer);
      }

      this.initContoller.updateControls(this.roundCount, this.shots, this.score);
      //console.log("does");
    }, 1000 / 60);
  }

}