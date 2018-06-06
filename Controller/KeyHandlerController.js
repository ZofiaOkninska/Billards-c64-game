class KeyHandlerController {
  constructor() {
    //KeyHandlerController.instance = false;
    if (!KeyHandlerController.instance) {
      this.instance = null;
      this.keyHandlerMap = {};
      this.registeredActions = [];
      this._initialize();
      KeyHandlerController.instance = this;
      //console.log("el", KeyHandlerController.instance);
    } else {
      //console.log("ret");
      return this.instance;
    }
  }

  registerAction(type, keyCode, method) {
    this.registeredActions.push({
      "type": type,
      "keyCode": keyCode,
      "method": method
    });
  }

  _initialize() {
    onkeydown = onkeyup = (e) => {
      let keyCode = e.keyCode;
      //up : 38
      //down : 40
      //lft : 37
      //right : 39
      //space : 32
      this.keyHandlerMap[keyCode] = e.type == 'keydown';

      for (let action of this.registeredActions) {
        if (action.type === "keydown") {
          if (this.keyHandlerMap[action.keyCode]) action.method(); //if key pressed execute registered method
        } else if (action.type === "keyup") {
          if (!this.keyHandlerMap[action.keyCode]) action.method(); //if key not pressed execute registered method
        }
      }

    };
  }

}