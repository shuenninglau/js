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
    this.load.spritesheet('boynpc','assets/boynpc.png', {frameWidth:20, frameHeight:31})
    this.load.atlas("ene3", "assets/ene3.png", "assets/ene3.json");  

    }

    create() {
        console.log('*** cafeteria scene');

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
       
    

    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(94.8, 244.6, "right").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene3=this.physics.add.sprite( 290,248.5, 'ene3').setScale(0.3);

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

    this.boynpc = this.physics.add.sprite(944.8,113.35, 'boynpc');
    this.physics.add.overlap(this.player,this.boynpc,this.dropParcel,null,this);  

    var endPoint = map.findObject(
      "objectLayer1",
      (obj) => obj.name === "endPoint"
    );
        
    }

    update() {

    //go back to blockD classroom
    if ( this.player.x < 59.3 && this.player.y > 493 && this.player.y < 590 ) {
          this.blockD();
        }

    //go back to worldmap, check for cafeteria exit
    if ( this.player.x > 1234 && this.player.y > 147.35 && this.player.y < 300.65 ) {
            this.gameComplete();
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
      collectParcel(player, item) {
        console.log("collectParcel");
        window.parcel2 = window.parcel2 +1
        console.log("parcel2", window.parcel2)
        item.setVisible(false)
        item.body.setEnable(false)
        return false;
      }
      
      // Function of dropParcel
      dropParcel(player, item) {
        console.log("dropParcel");
        if(window.parcel2 > 0){
          this.parcel2.setVisible(true)
          this.parcel2.x = item.x - 35
          this.parcel2.y = item.y
        }
        return false;
      } 
 
//     // Function to jump to room1
//     world(player, tile) {
//     console.log("world function");
//     let playerPos = {};
//     playerPos.x = 1770;
//     playerPos.y = 407;
//     playerPos.dir = "Down";

//     this.scene.start("world", { playerPos: playerPos });
//   }

    // Function to jump to room1
    gameComplete(player, tile) {
    console.log("gameComplete function");
    let playerPos = {};
    playerPos.x = 1770;
    playerPos.y = 407;
    playerPos.dir = "Down";

    this.scene.start("gameComplete", { playerPos: playerPos });
  }

    // // Function to gameComplete
    // function() {
    //     console.log("Jump to storyTextbox");
    //     this.scene.start("gameComplete");
    //   }
    //   this  

}
