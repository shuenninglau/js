class blockB extends Phaser.Scene {

    constructor() {
        super({ key: 'blockB' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
    this.load.tilemapTiledJSON("office","assets/BlockB-office.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");

    this.load.image("mask","assets/mask.png");
    this.load.image("board","assets/board.png");

    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json"); 
    this.load.spritesheet('guard','assets/guard.png', {frameWidth:23, frameHeight:32});
    }

    create() {
        console.log('*** blockB scene');

        this.collect = this.sound.add("collect");
        this.shake = this.sound.add("shake");

        let map = this.make.tilemap({key: "office"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");
        let parcelTiles = map.addTilesetImage("parcel","parcel");

        let tilesArray = [ atlasTiles, mordernTiles, parcelTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.decorLayer = map.createLayer("decorLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
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

    this.player = this.physics.add.sprite(639, 650, "up").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene2=this.physics.add.sprite( 637.8,507.8, 'ene2').play('ene2').setScale(0.3);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    
    // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player 
    this.cameras.main.startFollow(this.player);

    // setTileIndexCallback
    this.frameLayer.setCollisionByExclusion(-1, true);
    this.furnitureLayer.setCollisionByExclusion(-1, true);
    this.itemLayer.setCollisionByExclusion(-1, true);
    this.decorLayer.setCollisionByExclusion(-1, true);

    this.itemLayer.setTileIndexCallback(2281, this.removeItem, this);
    
    this.physics.add.collider(this.player, this.frameLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    this.physics.add.collider(this.player, this.decorLayer); 

    
    this.physics.add.collider(this.player, this.itemLayer);

    this.guard = this.physics.add.sprite(603,400, 'guard');
    this.physics.add.overlap(this.player,this.ene2,this.deductLife2,null,this);
  
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
      this.physics.moveToObject(this.guard, this.player, 30, 10000)

  ///////// Beginning of Exit room ////////////////////////////////
        // check for BlockB 
        if (this.player.x > 563 && this.player.x < 716 && this.player.y > 717) {
          this.world();
        }
    
        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-200);
          this.player.anims.play("left", true); // walk left
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(200);
          this.player.anims.play("right", true);
        } else if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-200);
          this.player.anims.play("up", true);
          //console.log('up');
        } else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(200);
          this.player.anims.play("down", true);
          //console.log('down');
        } else {
          this.player.anims.stop();
          this.player.body.setVelocity(0, 0);
        }
      } //////////// end of update /////////////////////////////////
    
      // Function of removeItem
      removeItem(player, tile) {
        this.collect.play();
        console.log("remove item", tile.index);
        window.life=window.life+1
        console.log("life=", window.life)
        this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
        scoreText.setText(window.life )
        return false;
      }    

      // Function of deductLife
      deductLife2(player, enemy) {
        this.shake.play();
        console.log("deductLife2");
        this.cameras.main.shake(500);
        window.life = window.life-2
        console.log("life=", window.life)
        enemy.setVisible(false)
        enemy.body.setEnable(false, false)
        scoreText.setText(window.life )
        if(window.life == 0){console.log("you are dead")};
        return false;
      }

      // Function /////////////////////////////
      world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 639;
        playerPos.y = 586.6;
        playerPos.dir = "down";
    
        this.scene.start("world", { playerPos: playerPos });
      }
}