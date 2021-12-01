class blockD extends Phaser.Scene {

    constructor() {
        super({ key: 'blockD' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("bDclassroom","assets/BlockD-class.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("interior","assets/interior32x32.png")
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");
    this.load.image("injection","assets/injection.png");

    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");  

    }

    create() {
        console.log('*** blockD scene');

        let map = this.make.tilemap({key: "bDclassroom"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let interiorTiles = map.addTilesetImage("interior32x32","interior");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");
        let parcelTiles = map.addTilesetImage("parcel", "parcel");

        let tilesArray = [ atlasTiles, mordernTiles, interiorTiles, parcelTiles ]

        this.bgLayer = map.createLayer("groundLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);       
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.decorLayer = map.createLayer("decorLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
       
    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(123, 543, "right").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene2=this.physics.add.sprite( 637.8,507.8, 'ene2').setScale(0.3);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.frameLayer.setCollisionByExclusion(-1, true)
    this.furnitureLayer.setCollisionByExclusion(-1, true)
    // this.decorLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true) 

    this.itemLayer.setTileIndexCallback(575, this.removeItem, this);

    this.physics.add.collider(this.player, this.frameLayer);
    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.decorLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    
    this.physics.add.collider(this.player, this.itemLayer);

    this.physics.add.overlap(this.player,this.ene2,this.deductLife,null,this);

    // this.parcel2 = this.physics.add.sprite(182,684.5, 'parcel2').setScale(0.3);
    // window.chicken = this.parcel2

    this.physics.add.overlap(this.player,this.parcel2,this.collectParcel,null,this)  
    window.chicken = this.parcel2
  
    this.injection = this.physics.add.sprite(985.4,542.6, 'injection').setScale(0.3);
    window.injection = this.injection
    this.physics.add.overlap(this.player,this.injection,this.collectInjection,null,this);        
    }

    update() {

    //go back to worldmap, check for blockB exit
    if ( this.player.x < 55
        && this.player.y > 493 && this.player.y < 590 ) {
            this.world();
        }

    //entrance for cafeteria
    if ( this.player.x > 1220
        && this.player.y > 496 && this.player.y < 591 ) {
  
          this.cafeteria();
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
  // Function of collectParcel
  collectInjection(player, item) {
    console.log("collectInjection");
    window.injection = window.injection +1
    console.log("injection", window.injection)
    item.setVisible(false)
    item.body.setEnable(false)
    return false;
    }
      

    // Function to jump to room1
    world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 1770;
    playerPos.y = 407;
    playerPos.dir = "Down";
    this.scene.start("world", { playerPos: playerPos });
  }

    //function to jump to blockD
    cafeteria(player, tile) {
        console.log("cafeteria function");
        this.scene.start("cafeteria");
    }

    

}