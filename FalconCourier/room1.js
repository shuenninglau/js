class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
      
        this.playerPos = data.playerPos;
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("BAr1","assets/BlockA-counter.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");

    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");  
    this.load.image("parcel1","assets/parcel-01.png");

    this.load.spritesheet('library','assets/library.png', {frameWidth:23, frameHeight:32});
    this.load.spritesheet('lecturer','assets/lecturer.png', {frameWidth:20, frameHeight:31});
    this.load.spritesheet('guard','assets/guard.png', {frameWidth:23, frameHeight:32});


    this.load.image("mask","assets/mask.png");
    this.load.image("board","assets/board.png");
   
    }

    create() {
        console.log('*** room1 scene');

        this.collect = this.sound.add("collect");
        this.shake = this.sound.add("shake");
        this.taskCollect = this.sound.add("taskCollect");
        this.drop = this.sound.add("drop");
        
        let map = this.make.tilemap({key: "BAr1"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");
        let buildingTiles = map.addTilesetImage("parcel","parcel");

        let tilesArray = [ atlasTiles, mordernTiles, buildingTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.decorLayer = map.createLayer("decorLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);

    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, this.playerPos.dir).setScale(0.3);

    //enable debug
    window.player = this.player.setScale(0.3);
    
    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.frameLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.decorLayer.setCollisionByExclusion(-1, true) 
    this.itemLayer.setCollisionByExclusion(-1, true) 

    this.itemLayer.setTileIndexCallback(2281, this.removeItem, this);

    this.physics.add.collider(this.player, this.frameLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.decorLayer); 
    this.physics.add.collider(this.player, this.itemLayer); 

    this.physics.add.overlap(this.player,this.ene2,this.deductLife,null,this);

    this.parcel1 = this.physics.add.sprite(1068,863, 'parcel1').setScale(0.3);
    window.chicken = this.parcel1
    this.physics.add.overlap(this.player,this.parcel1,this.collectParcel,null,this);  

    this.guard = this.physics.add.sprite(603,800, 'guard');
    this.lecturer = this.physics.add.sprite(642,673, 'lecturer');
    this.library = this.physics.add.sprite(211.35,371.35, 'library');
    this.physics.add.overlap(this.player,this.library,this.dropParcel,null,this);  

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
      this.physics.moveToObject(this.lecturer, this.player, 30, 30000)
      this.physics.moveToObject(this.guard, this.player, 30, 80000)
      ///////// Beginning of Enter room ////////////////////////////////
        // check for BlockA 
        if (this.player.x > 589 && this.player.x < 696 && this.player.y > 1164) {
          this.world();
        }
    
        // goto computer lab
        if (this.player.x > 1170 && this.player.y > 409 && this.player.y < 500) {
          this.complab();
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
      }/////////////////// end of update //////////////////////////////
    
      // Function of removeItem
      removeItem(player, tile) {
        this.collect.play();
        console.log("remove item", tile.index);
        window.life=window.life+1
        console.log("life=", window.life)
        this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
        scoreText.setText( window.life )
        if(window.life == 0){console.log("you are dead")};
        return false;
      }    

      // Function of deductLife
      deductLife(player, enemy) {
        this.shake.play();
        console.log("deductLife");
        this.cameras.main.shake(500);
        window.life=window.life-2;
        console.log("life=", window.life);
        enemy.setVisible(false);
        enemy.body.setEnable(false);
        scoreText.setText( window.life );
  
        return false;
      }
     
      // Function of collectParcel
      collectParcel(player, item) {
        this.taskCollect.play();
        console.log("collectParcel");
        window.parcel1 = window.parcel1 +1;
        console.log("parcel1", window.parcel1);
        item.setVisible(false);
        item.body.setEnable(false);
        return false;
      }
      
      // Function of dropParcel
      dropParcel(player, item) {
        this.drop.play();
        console.log("dropParcel");
        if(window.parcel1 > 0){
          this.parcel1.setVisible(true);
          this.parcel1.x = item.x - 35;
          this.parcel1.y = item.y;
        }
        return false;
      } 

/////// Exit room position ///////////////////////////////////
      // Function jump to world
      world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 519;
        playerPos.y = 1075.35;
        playerPos.dir = "down";

        this.scene.start("world", { playerPos: playerPos });
      }
 
      ////// Exit from computer lab /////////////////////////////////////////////
      complab(player, tile) {
        console.log("complab function");
        let playerPos = {};
        playerPos.x = 187;
        playerPos.y = 450;
        playerPos.dir = "right";
    
        this.scene.start("computerlab", { playerPos: playerPos });
      }
/////// End of Exit room //////////////////////////////////////////////////////


}