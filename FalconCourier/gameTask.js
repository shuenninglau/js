class gameTask extends Phaser.Scene {
  constructor() {
    super({key: "gameTask",});

    // Put global variable here
  }

  preload() {
    this.load.image("gameTask","assets/gameTask.png");
    this.load.atlas('library','assets/library.png', "assets/library.json")
    this.load.atlas('boynpc','assets/boynpc.png', "assets/boynpc.json")
    this.load.atlas('friend','assets/friend.png', "assets/friend.json")
    this.load.atlas("ene3", "assets/ene3.png", "assets/ene3.json");   
    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");   
    this.load.atlas("ene1", "assets/ene1.png", "assets/ene1.json");  
  }

  create() {
    console.log("*** gameTask scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music


    // Add image and detect spacebar keypress
    this.add.image(-20, -1, 'gameTask').setOrigin(0);
   
    this.anims.create({
      key: 'library',
      frames: [
        { key: 'library', frame: 'library1'},
        { key: 'library', frame: 'library2'},
      ],
      frameRate: 3,
      repeat: -1
    })

    this.library = this.add.sprite(350,225,'library').play('library').setScale(2.5);

    this.anims.create({
      key: 'boynpc',
      frames: [
        { key: 'boynpc', frame: 'boy1'},
        { key: 'boynpc', frame: 'boy2'},
      ],
      frameRate: 3,
      repeat: -1
    })

    this.boynpc = this.add.sprite(350,315,'boynpc').play('boynpc').setScale(2.5);

    this.anims.create({
      key: 'friend',
      frames: [
        { key: 'friend', frame: 'friend1'},
        { key: 'friend', frame: 'friend2'},
      ],
      frameRate: 3,
      repeat: -1
    })

    this.friend = this.add.sprite(350,415,'friend').play('friend').setScale(2.5);

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
    this.ene1 = this.add.sprite(645,260,'ene1').play('ene1').setScale(0.5);

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
    this.ene2 = this.add.sprite(645,370,'ene2').play('ene2').setScale(0.4);
 
    this.anims.create({
      key: 'ene3',
      frames: [
        { key: 'ene3', frame: 'ene3-01'},
        { key: 'ene3', frame: 'ene3-02'},

      ],
      frameRate: 3,
      repeat: -1
    }) 
    this.ene3 = this.add.sprite(645,470,'ene3').play('ene3').setScale(0.5);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");


    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to gameDirection");

        this.scene.start(
          "gameDirection",
          // Optional parameters
          {}
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
