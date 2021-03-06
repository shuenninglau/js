class computerlab extends Phaser.Scene {

    constructor() {
        super({ key: 'computerlab' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("computerlabBA","assets/BlockA-computerLab.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");

    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");  

    this.load.image("mask","assets/mask.png");
    this.load.image("board","assets/board.png");
    this.load.spritesheet('npcg','assets/npcg.png', {frameWidth:20, frameHeight:32});

    }

    create() {
        console.log('*** computerlab scene');

        this.collect = this.sound.add("collect");
        this.shake = this.sound.add("shake");

        let map = this.make.tilemap({key: "computerlabBA"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");

        let tilesArray = [ atlasTiles, mordernTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.decorLayer = map.createLayer("decorLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
    
     /// ene2 animation////////////////////////////
     this.anims.create({
      key: 'ene2',
      frames: [
        { key: 'ene2', frame: 'ene2-01'},
        { key: 'ene2', frame: 'ene2-02'},
        { key: 'ene2', frame: 'ene2-03'},
        { key: 'ene2', frame: 'ene2-04'},

      ],
      frameRate: 3,
      repeat: -1
    }) 
    /// end of ene2 animation////////////////////////////   

    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(186, 441, "right").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene2=this.physics.add.sprite( 309,515, 'ene2').play('ene2').setScale(0.3);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.itemLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.frameLayer.setCollisionByExclusion(-1, true) 
    this.decorLayer.setCollisionByExclusion(-1, true) 

    this.itemLayer.setTileIndexCallback(2281, this.removeItem, this);

    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.frameLayer); 
    this.physics.add.collider(this.player, this.decorLayer);    
    this.physics.add.collider(this.player, this.npcg);  
    this.physics.add.collider(this.player, this.cafeteria);  

    this.physics.add.collider(this.player, this.itemLayer);

    this.physics.add.overlap(this.player,this.ene2,this.deductLife,null,this);

    this.npcg = this.physics.add.sprite(450,358, 'npcg');
    this.cafeteria = this.physics.add.sprite(596,644, 'cafeteria');
    this.physics.add.overlap(this.player,this.parcel2,this.collectParcel,null,this)  
    window.chicken = this.parcel2

    // scoreText /////////
    this.board = this.add.sprite(100,50, "board").setScale(1.8).setScrollFactor(0);
    this.mask = this.add.sprite(85,45, "mask").setScale(0.5).setScrollFactor(0);

    scoreText = this.add.text(135, 40, '10', {
      fontSize: '20px',
      fill: '#ffffff'
    });
    scoreText.setScrollFactor(0);
    // end of scoreText /////////
    }

    update() {
    this.physics.moveToObject(this.ene2, this.player, 30, 5000)   
    this.physics.moveToObject(this.cafeteria, this.player, 30, 10000) 
    this.physics.moveToObject(this.npcg, this.player, 30, 15000) 

    //go back to blockA counter
    if ( this.player.x < 116
        && this.player.y > 400 && this.player.y < 495 ) {
  
          this.room1();
        }

    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play("left", true); 
        } 
        else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play("right", true);
        } 
        else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-200);
        this.player.anims.play("up", true);
        //console.log('up');
        } 
        else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(200);
        this.player.anims.play("down", true);
        //console.log('down');
        } 
        else {
        this.player.anims.stop(); 
        this.player.body.setVelocity(0, 0);
        }
    }

  // Function of removeItem
  removeItem(player, tile) {
    this.collect.play();
    console.log("remove item", tile.index);
    window.life=window.life+1
    console.log("life=", window.life)
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    scoreText.setText( window.life )
    return false;
  }

  // Function of deductLife
  deductLife(player, enemy) {
    this.shake.play();
    console.log("deductLife");
    this.cameras.main.shake(500);
    window.life=window.life-2
    console.log("life=", window.life)
    enemy.setVisible(false)
    enemy.body.setEnable(false)
    scoreText.setText( window.life )
    if(window.life == 0){console.log("you are dead")};
    return false;
  }
 
  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
  let playerPos = {};
  playerPos.x = 1090;
  playerPos.y = 448;
  playerPos.dir = "left";

  this.scene.start("room1", { playerPos: playerPos }); 
  }   

}
