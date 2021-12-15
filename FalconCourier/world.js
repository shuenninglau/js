class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    
    this.playerPos = data.playerPos;

  };

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap","assets/RafflesklMap.json");

    // // Step 2 : Preload any images here, nickname, filename 

    this.load.image("kenny","assets/kenny.png");
    this.load.image("parcel","assets/parcel.png");
    this.load.image("Village32x32","assets/Village32x32.png");

    this.load.image("parcel1","assets/parcel-01.png");
    this.load.image("parcel2","assets/parcel-02.png");
    this.load.image("parcel3","assets/parcel-03.png");

  }

  create() {
    console.log("*** world scene");
    this.collect = this.sound.add("collect");
    this.shake = this.sound.add("shake");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'worldmap'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = map.addTilesetImage("kenny03", "kenny"); 
    let parcelTiles = map.addTilesetImage("parcel", "parcel");
    let treeTiles = map.addTilesetImage("Village32x32","Village32x32");
     
    let tilesArray = [ kennyTiles,parcelTiles,treeTiles ] 

    // Step 5  Load in layers by layers 
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0); 
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);  

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    var startPoint = map.findObject(
      "objectLayer",
      (obj) => obj.name === "startPoint"
    );

    this.player = this.physics.add.sprite( this.playerPos.x, this.playerPos.y, 'up').setScale(0.3);
  
    //enable debug (track the player position)
    window.player = this.player.setScale(0.3);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // enemy 1 position
        // behind block a
        // in front of block b
        // between carpark, block b
        // between block b, block c carpark
        // between block c carpark, block c
        // near block c
        // between block c,d
        // behind block d
    this.ene1=this.physics.add.sprite( 230,798, 'ene1').play('ene1').setScale(0.3);// leftright
    // this.ene4=this.physics.add.sprite( 340,581, 'ene1').play('ene1').setScale(0.3);// updown
    this.ene5=this.physics.add.sprite( 460,227, 'ene1').play('ene1').setScale(0.3);// updown
    this.ene6=this.physics.add.sprite( 840,351, 'ene1').play('ene1').setScale(0.3);// leftright  
    // this.ene7=this.physics.add.sprite( 1230,144, 'ene1').play('ene1').setScale(0.3);// updown               
    this.ene8=this.physics.add.sprite( 1160,461, 'ene1').play('ene1').setScale(0.3);// updown     
    this.ene9=this.physics.add.sprite( 1670,591, 'ene1').play('ene1').setScale(0.3);// updown     
    // this.ene10=this.physics.add.sprite( 1590,141, 'ene1').play('ene1').setScale(0.3);//leftright

    // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player 
    this.cameras.main.startFollow(this.player);

    // setTileIndexCallback
    this.decorLayer.setCollisionByExclusion(-1, true);
    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.itemLayer.setTileIndexCallback(575, this.removeItem, this);

    // layer collisons
    this.physics.add.collider(this.player, this.decorLayer); 
    // this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.itemLayer);


    this.physics.add.overlap(this.player,this.ene1,this.deductLife,null,this)
    // this.physics.add.overlap(this.player,this.ene4,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene5,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene6,this.deductLife,null,this)
    // this.physics.add.overlap(this.player,this.ene7,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene8,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene9,this.deductLife,null,this)
    // this.physics.add.overlap(this.player,this.ene10,this.deductLife,null,this)

    // receipient position
    this.guard = this.physics.add.sprite(571,829, 'guard');
    this.girlnpc = this.physics.add.sprite(353,404, 'girlnpc');
    this.lecturer = this.physics.add.sprite(1128,137, 'lecturer');
    this.cafeteria = this.physics.add.sprite(1963,601, 'cafeteria');
    this.npcg = this.physics.add.sprite(1908,424, 'npcg');
    this.sas = this.physics.add.sprite(656,120, 'sas');
  
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
  /////////////////// end of create //////////////////////////////

  update() {
    this.physics.moveToObject(this.ene1, this.player, 30, 220000)
    // this.physics.moveToObject(this.ene4, this.player, 30, 40000)
    this.physics.moveToObject(this.ene5, this.player, 30, 70000)
    this.physics.moveToObject(this.ene6, this.player, 30, 100000)
    // this.physics.moveToObject(this.ene7, this.player, 30, 130000)
    this.physics.moveToObject(this.ene8, this.player, 30, 16000)
    this.physics.moveToObject(this.ene9, this.player, 30, 19000)
    // this.physics.moveToObject(this.ene10, this.player, 30, 220000)

///////// Beginning of Enter room ////////////////////////////////
    // check for BlockA door1
    if ( this.player.x > 509 && this.player.x < 529 && this.player.y > 1075.35 && this.player.y < 1092 ) {
        this.room1()
      }
    
    // check for BlockB door
    if ( this.player.x > 683 && this.player.x < 736 && this.player.y > 574 && this.player.y < 580 ) {
        this.blockB()
      }
    
    // check for BlockC door
      if ( this.player.x > 1397 && this.player.x < 1453 && this.player.y > 578 && this.player.y < 621 ) {
          this.blockC()
        }

    //check for BlockD entrance
      if ( this.player.x > 1770 && this.player.x < 1806 && this.player.y > 400 && this.player.y < 417 ) {
          this.blockD()
        }

    // //check for gameOver entrance
    // if ( this.player.x > 1770 && this.player.x < 1806 && this.player.y > 400 && this.player.y < 417 && window.life == 0 ) {
    //   this.gameOver()
    // }


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
  } /////////////////// end of update //////////////////////////////

  // Function of removeItem
  removeItem(player, tile) {
    this.collect.play();
    console.log("remove item", tile.index);
    window.life = window.life+1
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
    window.life = window.life-1;
    console.log("life=", window.life);
    enemy.setVisible(false);
    enemy.body.setEnable(false);
    scoreText.setText( window.life );
    if(window.life == 0){console.log("you are dead")};
    return false;
  }
 
/////// Beginning of Enter room position ///////////////////////////////////
  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    let playerPos = {};
    playerPos.x = 642;
    playerPos.y = 1076;
    playerPos.dir = "up";

    this.scene.start("room1", { playerPos: playerPos });
  }

  //function to jump to blockB
  blockB(player, tile) {
    console.log("blockB function");
    let playerPos = {};
    playerPos.x = 713;
    playerPos.y = 500; 
    playerPos.dir = "up";

    this.scene.start("blockB", { playerPos: playerPos });
  }

  //function to jump to blockC
  blockC(player, tile) {
    console.log("blockC function");
    let playerPos = {};
    playerPos.x = 1409;
    playerPos.y = 588.9;
    playerPos.dir = "up";

    this.scene.start("blockC", { playerPos: playerPos });
  }

  //function to jump to blockD
  blockD(player, tile) {
    console.log("blockD function");
    let playerPos = {};
    playerPos.x = 1770;
    playerPos.y = 407;
    playerPos.dir = "up";

    this.scene.start("blockD", { playerPos: playerPos });
  }


   //function to jump to blockD
   gameOver(player, tile) {
    console.log("gameComplete function");
    let playerPos = {};

    playerPos.dir = "up";

    this.scene.start("gameOver");
  }   
/////// End of Enter room position //////////////////////////////////////////////////////

}