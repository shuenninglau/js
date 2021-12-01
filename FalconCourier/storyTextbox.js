class storyTextbox extends Phaser.Scene {
  constructor() {
    super("storyTextbox");
  }

  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {

    this.load.image("intoPage","assets/intoPage.png");

    // load rexUI plugins
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "./rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  create() {
    console.log("sceneDialog1 ", this);

    // Add image and detect spacebar keypress
    this.add.image(-1, -1, 'intoPage').setOrigin(0);

    createTextBox(this, 98, 100, {
      wrapWidth: 550,
    }).start(content1, 50);

    // Detect spacebar pressed
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto gameTask&Rules");
        // let playerPos = {};
        // playerPos.x = 850;
        // playerPos.y = 1241;
        // playerPos.dir = "up";
    
        this.scene.start("gameTask" 
        );
      },
      this
    );
  }
// { playerPos: playerPos }
  update() {}
}

/////////////////////////////////////////////////////////////////////////////////

var content1 = `Welcome to the 2D world of Raffles College Kuala Lumpur. 

You are an employee of Falcon Courier company. During the pandemics, there are 3 parcel orders are missing around the Raffles College Kuala Lumpur. You may enter different buildings to collect the parcel and send it back to the original recipient. At the same time, you also need to collect the mask to protect yourself to avoid the virus enemies.

You may also interact with non-player characters in the game.

Press spacebar to continue`;



//const COLOR_PRIMARY = 0x3574dc;
// const COLOR_PRIMARY = 361504;
const COLOR_PRIMARY = 063106;
const COLOR_LIGHT = 0xffffff;
const COLOR_DARK = 0xff00ff;

const GetValue = Phaser.Utils.Objects.GetValue;

var createTextBox = function (scene, x, y, config) {
  var wrapWidth = GetValue(config, "wrapWidth", 0);
  var fixedWidth = GetValue(config, "fixedWidth", 0);
  var fixedHeight = GetValue(config, "fixedHeight", 0);
  var textBox = scene.rexUI.add
    .textBox({
      x: x,
      y: y,

      background: scene.rexUI.add
        .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
        .setStrokeStyle(2, COLOR_LIGHT),

      text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      action: scene.add
        .image(0, 0, "nextPage")
        .setTint(COLOR_LIGHT)
        .setVisible(false),

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        icon: 10,
        text: 10,
      },
    })
    .setOrigin(0)
    .layout();

  textBox
    .setInteractive()
    .on(
      "pointerdown",
      function () {
        var icon = this.getElement("action").setVisible(false);
        this.resetChildVisibleState(icon);
        if (this.isTyping) {
          this.stop(true);
        } else {
          this.typeNextPage();
        }
      },
      textBox
    )
    .on(
      "pageend",
      function () {
        if (this.isLastPage) {
          return;
        }

        var icon = this.getElement("action").setVisible(true);
        this.resetChildVisibleState(icon);
        icon.y -= 30;
        var tween = scene.tweens.add({
          targets: icon,
          y: "+=30", // '+=100'
          ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 500,
          repeat: 0, // -1: infinity
          yoyo: false,
        });
      },
      textBox
    );
  //.on('type', function () {
  //})

  return textBox;
};

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.add
    .text(0, 0, "", {
      fontSize: "20px",
      wordWrap: {
        width: wrapWidth,
      },
      maxLines: 20,
    })
    .setFixedSize(fixedWidth, fixedHeight);
};

/////////////////////////////////////////////////////////////////////////////////
