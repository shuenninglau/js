class gameTask extends Phaser.Scene {
  constructor() {
    super({key: "gameTask",});

    // Put global variable here
  }

  preload() {
    this.load.image("gameTask","assets/gameTask.png");

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
