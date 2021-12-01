class gameDirection extends Phaser.Scene {
  constructor() {
    super({key: "gameDirection",});

    // Put global variable here
  }

  preload() {
    this.load.image("gameDirection","assets/gameDirection.png");
    this.load.atlas("up", "assets/ch-up.png", "assets/ch-up.json");
    this.load.atlas("down", "assets/ch-down.png", "assets/ch-down.json");
    this.load.atlas("left", "assets/ch-left.png", "assets/ch-left.json");
    this.load.atlas("right", "assets/ch-right.png", "assets/ch-right.json");  
  }

  create() {
    console.log("*** gameDirection scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music


    // Add image and detect spacebar keypress
    this.add.image(-20, -1, 'gameDirection').setOrigin(0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
    this.anims.create({ 
      key: 'left',
      frames: [
        { key: 'left', frame: 'left-01'}, 
        { key: 'left', frame: 'left-02'},
        { key: 'left', frame: 'left-03'},
        { key: 'left', frame: 'left-04'},

      ],
      frameRate: 6, 
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'right-01'},
        { key: 'right', frame: 'right-02'},
        { key: 'right', frame: 'right-03'},
        { key: 'right', frame: 'right-04'},

      ],
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'up-01'},
        { key: 'up', frame: 'up-02'},
        { key: 'up', frame: 'up-03'},
        { key: 'up', frame: 'up-04'},
      ],
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'down-01'},
        { key: 'down', frame: 'down-02'},
        { key: 'down', frame: 'down-03'},
        { key: 'down', frame: 'down-04'},
      ],
      frameRate: 3,
      repeat: -1
    })

    this.up = this.add.sprite(110,390,'ch-up').play('up').setScale(0.8);
    this.down = this.add.sprite(208,390,'ch-down').play('down').setScale(0.8);
    this.left = this.add.sprite(290,390,'ch-left').play('left').setScale(0.8);
    this.right = this.add.sprite(380,390,'ch-right').play('right').setScale(0.8);

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, Jump to world");
        let playerPos = {};
        playerPos.x = 850;
        playerPos.y = 1241;
        playerPos.dir = "up";
    
        this.scene.start(
          "world",
          // Optional parameters
          {playerPos: playerPos}
        );
      },
      this
    );
  


// Add any text in the main page
    // this.add.text(300, 550, "Press spacebar to continue", {
    //   font: "20px Open Sans",
    //   fill: "#000000",
    // });

    // Create all the game animations here
  }  

}
