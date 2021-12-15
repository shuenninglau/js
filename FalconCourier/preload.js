class preload extends Phaser.Scene {
  constructor() {
    super({key: "preload",});

    // Put global variable here
  }

  preload() {
    this.load.image("intoPage","assets/intoPage.png");
    this.load.atlas("cloud", "assets/cloud.png", "assets/cloud.json");  
    this.load.atlas("logo", "assets/logo.png", "assets/logo.json");  
    this.load.atlas("down", "assets/ch-down.png", "assets/ch-down.json");
    this.load.atlas("ene3", "assets/ene3.png", "assets/ene3.json");   
    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");   
    this.load.atlas("ene1", "assets/ene1.png", "assets/ene1.json");   

    this.load.audio("collect","assets/collect.wav");  
    this.load.audio("drop","assets/drop.wav"); 
    this.load.audio("gameComplete","assets/gameComplete.wav"); 
    this.load.audio("gameOver","assets/gameOver.wav");  
    this.load.audio("taskCollect","assets/taskCollect.mp3");  
    this.load.audio("shake","assets/shake.mp3");  
    this.load.audio("bg","assets/bg.mp3");  
       
  }

  create() {
    console.log("*** preload scene");

    // Add any sound and music 
    // ( 0 = mute to 1 is loudest )
    this.music = this.sound.add('bg', {loop: true}).setVolume(0.2) // 10% volume

    this.music.play()
    //window.music = this.music


    // Add image and detect spacebar keypress
    this.add.image(-1, -1, 'intoPage').setOrigin(0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    this.anims.create({
      key: 'cloud',
      frames: [
        { key: 'cloud', frame: 'cloud-01'},
        { key: 'cloud', frame: 'cloud-02'},
      ],
      frameRate: 0.5,
      repeat: -1
    })

    this.cloud = this.add.sprite(390,225,'cloud').play('cloud').setScale(0.9);

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

    this.down = this.add.sprite(405,410,'ch-down').play('down').setScale(2);

    this.anims.create({
      key: 'logo',
      frames: [
        { key: 'logo', frame: 'logo-01'},
        { key: 'logo', frame: 'logo-02'},
      ],
      frameRate: 1,
      repeat: -1
    })

    this.logo = this.add.sprite(405,150,'logo').play('logo').setOrigin(0);

    this.anims.create({
      key: 'ene2',
      frames: [
        { key: 'ene2', frame: 'ene2-01'},
        { key: 'ene2', frame: 'ene2-02'},
        { key: 'ene2', frame: 'ene2-03'},
        { key: 'ene2', frame: 'ene2-04'},
      ],
      frameRate: 2.5,
      repeat: -1
    })

  this.ch = this.add.sprite(105,130,'ene2').play('ene2').setScale(0.6);

   this.time.addEvent({
    delay: 0,
    callback: moveRightLeft,
    callbackScope: this,
    loop: false,
  });

    this.anims.create({
      key: 'ene1',
      frames: [
        { key: 'ene1', frame: 'ene1-01'},
        { key: 'ene1', frame: 'ene1-02'},
        { key: 'ene1', frame: 'ene1-03'},
      ],
      frameRate: 3,
      repeat: -1
    })

  this.ene1 = this.add.sprite(205,530,'ene1').play('ene1').setScale(0.8);

    // On spacebar event, call the world scene
    spaceDown.on(      "down",
      function () {
        console.log("Jump to storyTextbox");
        this.scene.start(
          "storyTextbox",{});
      }, this );
 
    function update() {}
    /////////////////// Tween function/////////////////////////////
    function moveRightLeft() {
      console.log("moveDownUp");
      this.tweens.timeline({
        targets: this.ene1,
        loop: -1, // loop forever
        ease: "Linear",
        duration: 5000,
        tweens: [
          {
            x: 600,
          },
          {
            x: 205,
          },
        ],
      });
    }
    ////////////////////// end of tween function////////////////////////

// Add any text in the main page
    this.add.text(300, 550, "Press spacebar to continue", {
      font: "20px Open Sans",
      fill: "#000000",
    });

  
  }  

}
