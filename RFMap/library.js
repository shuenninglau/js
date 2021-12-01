class library extends Phaser.Scene {

    constructor() {
        super({ key: 'library' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("libraryBA","assets/BlockA-library.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");

    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");  

    }

    create() {
        console.log('*** library scene');

        let map = this.make.tilemap({key: "libraryBA"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");
        let parcelTiles = map.addTilesetImage("parcel", "parcel");

        let tilesArray = [ atlasTiles, mordernTiles, parcelTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.chairLayer = map.createLayer("chairLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);
        
    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(1102, 460, "left").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene2=this.physics.add.sprite( 637.8,507.8, 'ene2').setScale(0.3);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.chairLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.frameLayer.setCollisionByExclusion(-1, true) 
    this.itemLayer.setCollisionByExclusion(-1, true) 

    this.itemLayer.setTileIndexCallback(2281, this.removeItem, this);

    this.physics.add.collider(this.player, this.chairLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.frameLayer); 
    this.physics.add.collider(this.player, this.itemLayer);     

    this.physics.add.collider(this.player, this.itemLayer);

    this.physics.add.overlap(this.player,this.ene2,this.deductLife,null,this);

    // this.parcel2 = this.physics.add.sprite(182,684.5, 'parcel2').setScale(0.3);
    // window.chicken = this.parcel2

    this.physics.add.overlap(this.player,this.parcel2,this.collectParcel,null,this)  
    window.chicken = this.parcel2
        
    }

    update() {

    //go back to blockA counter
    if ( this.player.x > 1163 && this.player.y > 400 && this.player.y < 495 ) {
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
    console.log("remove item", tile.index);
    window.life=window.life+1
    console.log("life=", window.life)
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    return false;
  }

  // Function of deductLife
  deductLife(player, enemy) {
    console.log("deductLife");
    this.cameras.main.shake(500);
    window.life=window.life-1
    console.log("life=", window.life)
    enemy.setVisible(false)
    enemy.body.setEnable(false)
    return false;
  }
 

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");

  let playerPos = {};
  playerPos.x = 139;
  playerPos.y = 813;
  playerPos.dir = "right";

  this.scene.start("room1", { playerPos: playerPos }); 

  }
}