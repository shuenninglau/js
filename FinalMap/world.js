class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    
    this.playerPos = data.playerPos;

  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap","assets/RafflesklMap.json");

    // // Step 2 : Preload any images here, nickname, filename 

    this.load.image("kenny","assets/kenny.png");
    this.load.image("parcel","assets/parcel.png");
    this.load.image("village","assets/village32x32.png");

    this.load.image("parcel1","assets/parcel-01.png");
    this.load.image("parcel2","assets/parcel-02.png");
    this.load.image("parcel3","assets/parcel-03.png");

    this.load.spritesheet('girlnpc','assets/girlnpc.png', {frameWidth:23, frameHeight:32})
    this.load.spritesheet('guard','assets/guard.png', {frameWidth:23, frameHeight:32})
    this.load.spritesheet('boynpc','assets/boynpc.png', {frameWidth:20, frameHeight:31})
    this.load.spritesheet('library','assets/library.png', {frameWidth:23, frameHeight:32})

    this.load.atlas( 'left', 'assets/ch-left.png', 'assets/ch-left.json'); 
    this.load.atlas( 'right', 'assets/ch-right.png', 'assets/ch-right.json');
    this.load.atlas( 'up', 'assets/ch-up.png', 'assets/ch-up.json');
    this.load.atlas( 'down', 'assets/ch-down.png', 'assets/ch-down.json');

    // this.load.atlas("ene3", "assets/ene3.png", "assets/ene3.json");   
    // this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");   
    this.load.atlas("ene1", "assets/ene1.png", "assets/ene1.json");  

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'worldmap'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = map.addTilesetImage("kenny03", "kenny"); 
    let parcelTiles = map.addTilesetImage("parcel", "parcel");
    let treeTiles = map.addTilesetImage("village32x32","village");
     
    let tilesArray = [ kennyTiles,parcelTiles,treeTiles ] 

    // Step 5  Load in layers by layers 
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0); 
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);  

    ///////////// player animation //////////////////////////////////////////
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
      frameRate: 6,
      repeat: -1
    })
  ///////////// end of player animation //////////////////////////////////////////

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    var startPoint = map.findObject(
      "objectLayer",
      (obj) => obj.name === "startPoint"
    );

    this.player = this.physics.add.sprite( this.playerPos.x, this.playerPos.y, 'up').setScale(0.3);

    /// ene1 animation////////////////////////////
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
    /// end of ene1 animation////////////////////////////

    // this.time.addEvent({
    //   delay: 6000,
    //   callback: moveRightLeft,
    //   callbackScope: this,
    //   loop: false,
    // });
  
    //enable debug
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
    this.ene1=this.physics.add.sprite( 227,798, 'ene1').play('ene1').setScale(0.3);// leftright
    this.ene4=this.physics.add.sprite( 346,581, 'ene1').play('ene1').setScale(0.3);// updown
    this.ene5=this.physics.add.sprite( 460,227, 'ene1').play('ene1').setScale(0.3);// updown
    this.ene6=this.physics.add.sprite( 843,351, 'ene1').play('ene1').setScale(0.3);// leftright  
    this.ene7=this.physics.add.sprite( 1233,144, 'ene1').play('ene1').setScale(0.3);// updown               
    this.ene8=this.physics.add.sprite( 1166,461, 'ene1').play('ene1').setScale(0.3);// updown     
    this.ene9=this.physics.add.sprite( 1676,591, 'ene1').play('ene1').setScale(0.3);// updown     
    this.ene10=this.physics.add.sprite( 1590,141, 'ene1').play('ene1').setScale(0.3);//leftright

    // this.ene2=this.physics.add.sprite( 1590,141, 'ene2').setScale(0.3);
    // this.ene3=this.physics.add.sprite( 1590,141, 'ene3').setScale(0.3);    

    // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player 
    this.cameras.main.startFollow(this.player);

    // setTileIndexCallback
    this.decorLayer.setCollisionByExclusion(-1, true);
    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.itemLayer.setTileIndexCallback(575, this.removeItem, this);

    this.physics.add.collider(this.player, this.decorLayer); 
    this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.player, this.itemLayer);

    this.physics.add.overlap(this.player,this.ene1,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene4,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene5,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene6,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene7,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene8,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene9,this.deductLife,null,this)
    this.physics.add.overlap(this.player,this.ene10,this.deductLife,null,this)

    // this.parcel1 = this.physics.add.sprite(647,941, 'parcel1').setScale(0.3);
    // window.chicken = this.parcel1
    this.physics.add.overlap(this.player,this.parcel1,this.collectParcel,null,this);  
    window.chicken = this.parcel1

    this.physics.add.overlap(this.player,this.parcel2,this.collectParcel,null,this);  
    window.chicken = this.parcel2

    this.physics.add.overlap(this.player,this.parcel3,this.collectParcel,null,this);  
    window.chicken = this.parcel3

    // receipient position
    this.guard = this.physics.add.sprite(579,761, 'guard');
    this.girlnpc = this.physics.add.sprite(550,761, 'girlnpc');
    this.boynpc = this.physics.add.sprite(1126.6,137.6, 'boynpc');
    this.library = this.physics.add.sprite(1963.3,601, 'library');

    this.physics.add.overlap(this.player,this.girlnpc,this.dropParcel,null,this); 
    this.physics.add.overlap(this.player,this.boynpc,this.dropParce2,null,this); 
    this.physics.add.overlap(this.player,this.ibrary,this.dropParce3,null,this);     

    // this.add.text(10,10, "Mask " + window.life + window.life-1 + window.life+1 , { font: '20px Open Sans', fill: '#ffffff' }).setScrollFactor(0);

    // this.add.text(10,28, "Pink Parcel " + window.parcel1, { font: '20px Open Sans', fill: '#ffffff' }).setScrollFactor(0);

    // this.add.text(10,46, "Blue Parcel " + window.parcel3, { font: '20px Open Sans', fill: '#ffffff' }).setScrollFactor(0);

    // this.add.text(10,64, "Green Parcel " + window.parcel2, { font: '20px Open Sans', fill: '#ffffff' }).setScrollFactor(0);

    // this.add.text(10,82, "injection " + window.injection, { font: '20px Open Sans', fill: '#ffffff' }).setScrollFactor(0);
  } 
  /////////////////// end of create //////////////////////////////

  update(time, delta) {
///////// Beginning of Enter room ////////////////////////////////
    // check for BlockA door1
    if ( this.player.x > 496 && this.player.x < 540 && this.player.y > 1054 && this.player.y < 1074 ) {
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

  delayOneSec() {
    console.log("1 sec later...");
    //this.player.body.setSize(this.player.width*1, this.player.height*1, true);
    this.player.body.setSize(this.player.width * 1, this.player.height * 1);
  }

  overlap1() {
    console.log("ene1");
  }    

  overlap6() {
    console.log("ene1");
  }    

  overlap10() {
    console.log("ene1");
  }    

  moveRightLeft() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.ene1,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 5000,
      tweens: [
        {
          x: 227,
        },
        {
          x: 794,
        },
      ],
    });
  }

  moveRightLeft() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.ene6,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 5000,
      tweens: [
        {
          x: 700,
        },
        {
          x: 100,
        },
      ],
    });
  }
  moveRightLeft() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.ene10,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 5000,
      tweens: [
        {
          x: 700,
        },
        {
          x: 100,
        },
      ],
    });
  }
  
  // Function of removeItem
  removeItem(player, tile) {
    console.log("remove item", tile.index);
    window.life = window.life+1
    console.log("life=", window.life)
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    return false;
  }

  // Function of deductLife
  deductLife(player, enemy) {
    console.log("deductLife");
    this.cameras.main.shake(500);
    window.life = window.life-1
    console.log("life=", window.life)
    enemy.setVisible(false)
    enemy.body.setEnable(false)
    return false;
  }
 
/////// Beginning of Enter room position ///////////////////////////////////
  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    let playerPos = {};
    playerPos.x = 643;
    playerPos.y = 1084;
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
    gameComplete(player, tile) {
      console.log("gameComplete function");
      let playerPos = {};
      playerPos.x = 1236;
      playerPos.y = 207;
      playerPos.dir = "up";
  
      this.scene.start("gameComplete");
    }
/////// End of Enter room position //////////////////////////////////////////////////////

}