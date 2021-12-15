class cafeteria extends Phaser.Scene {

    constructor() {
        super({ key: 'cafeteria' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("cafeteriatile","assets/cafeteria1.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("interior","assets/interior32x32.png")
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");
    this.load.spritesheet('boynpc','assets/boynpc.png', {frameWidth:20, frameHeight:31});

    this.load.atlas("ene3", "assets/ene3.png", "assets/ene3.json");  

    this.load.image("mask","assets/mask.png");
    this.load.image("board","assets/board.png");

    }

    create() {
        console.log('*** cafeteria scene');

        this.collect = this.sound.add("collect");
        this.shake = this.sound.add("shake");
        this.taskCollect = this.sound.add("taskCollect");
        this.drop = this.sound.add("drop");

        let map = this.make.tilemap({key: "cafeteriatile"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let interiorTiles = map.addTilesetImage("interior32x32","interior");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");
        let parcelTiles = map.addTilesetImage("parcel", "parcel");

        let tilesArray = [ atlasTiles, mordernTiles, interiorTiles, parcelTiles]

        this.bgLayer = map.createLayer("groundLayer",tilesArray, 0, 0);
        this.wallLayer = map.createLayer("wallLayer",tilesArray, 0, 0);
        this.tableLayer = map.createLayer("tableLayer",tilesArray, 0, 0);
        this.decorLayer = map.createLayer("decorLayer",tilesArray, 0, 0);       
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
       
    /// ene2 animation////////////////////////////
    this.anims.create({
      key: 'ene3',
      frames: [
        { key: 'ene3', frame: 'ene3-01'},
        { key: 'ene3', frame: 'ene3-02'},

      ],
      frameRate: 3,
      repeat: -1
    }) 
    /// end of ene2 animation////////////////////////////    

    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(94.8, 244.6, "right").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene3=this.physics.add.sprite( 1089,221, 'ene3').play('ene3').setScale(0.8);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.wallLayer.setCollisionByExclusion(-1, true)
    this.tableLayer.setCollisionByExclusion(-1, true)
    this.decorLayer.setCollisionByExclusion(-1, true) 
    this.itemLayer.setCollisionByExclusion(-1, true) 

    this.itemLayer.setTileIndexCallback(2537, this.removeItem, this);

    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.tableLayer);
    this.physics.add.collider(this.player, this.decorLayer); 
    this.physics.add.collider(this.player, this.itemLayer);    
    
    this.physics.add.collider(this.player, this.itemLayer);

    this.physics.add.overlap(this.player,this.ene3,this.deductLife,null,this);

    this.parcel2 = this.physics.add.sprite(83.83,588.5, 'parcel2').setScale(0.3);
    window.chicken = this.parcel2

    this.physics.add.overlap(this.player,this.parcel2,this.collectParcel,null,this)  

    this.guard = this.physics.add.sprite(303,300, 'guard');
    this.boynpc = this.physics.add.sprite(945,150, 'boynpc');
    this.physics.add.overlap(this.player,this.boynpc,this.dropParcel,null,this);  

    var endPoint = map.findObject(
      "objectLayer1",
      (obj) => obj.name === "endPoint"
    );

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
    this.physics.moveToObject(this.ene3, this.player, 30, 5000)
    this.physics.moveToObject(this.guard, this.player, 30, 10000)
    
      
    //go back to blockD classroom
    if ( this.player.x < 56.3 && this.player.y > 211.35 && this.player.y < 300.5 ) {
          this.blockD();
        }

    //go back to worldmap, check for cafeteria exit
    if ( this.player.x > 1234 && this.player.y > 147.35 && this.player.y < 300.65 ) {
      this.gameComplete();
    }

    // && window.parcel1>=1 
    // && window.parcel2>=1 
    // && window.parcel3>=1 
    // && window.injection>=1

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
    window.life=window.life-3
    console.log("life=", window.life)
    enemy.setVisible(false)
    enemy.body.setEnable(false)
    scoreText.setText( window.life )
    if(window.life == 0){console.log("you are dead")};
    return false;
  }
     
  // Function of collectParcel
  collectParcel(player, item) {
    this.taskCollect.play();
    console.log("collectParcel");
    window.parcel2 = window.parcel2 +1
    console.log("parcel2", window.parcel2)
    item.setVisible(false)
    item.body.setEnable(false)
    return false;
    }
      
  // Function of dropParcel
  dropParcel(player, item) {
    this.drop.play();
    console.log("dropParcel");
    if(window.parcel2 > 0){
    this.parcel2.setVisible(true)
    this.parcel2.x = item.x - 35
    this.parcel2.y = item.y
    }
    return false;
    } 

  // Function to jump to blockD
  room1(player, tile) {
    console.log("blockD function");
  let playerPos = {};
  playerPos.x = 1090;
  playerPos.y = 448;
  playerPos.dir = "left";

  this.scene.start("blockD", { playerPos: playerPos }); 
  }
  
    // Function to jump to gameComplete
    gameComplete(player, tile) {
    console.log("gameComplete function");
    let playerPos = {};
    playerPos.x = 1770;
    playerPos.y = 407;
    playerPos.dir = "Down";

    this.scene.start("gameComplete", { playerPos: playerPos });
  }

}
