class gameOver extends Phaser.Scene {
  constructor() {
    super({key: "gameOver",});

    // Put global variable here
  }

  preload() {
    this.load.image("gameOver","assets/gameOver.png"); 
  }

  create() {
    console.log("*** preload scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music


    // Add image and detect spacebar keypress
    this.add.image(-20, -1, 'gameOver').setOrigin(0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");



    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world");

        this.scene.start(
          "world",
          // Optional parameters
          {}
        );
      },
      this
    );
  
    /////////////////// Tween function/////////////////////////////
 

// Add any text in the main page
    this.add.text(280, 550, "Press spacebar to play again", {
      font: "20px Open Sans",
      fill: "#000000",
    });

    // Create all the game animations here
  }  

}
