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
    this.load.image("parcel2","assets/parcel-02.png");

    this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");  
    }

    create() {
        console.log('*** blockB scene');

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


    this.physics.world.bounds.width = this.bgLayer.width; 
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(639, 650, "up").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.ene2=this.physics.add.sprite( 637.8,507.8, 'ene2').setScale(0.3);

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

    this.physics.add.overlap(this.player,this.ene2,this.deductLife2,null,this);

    this.parcel2 = this.physics.add.sprite(182,684.5, 'parcel2').setScale(0.3);
    window.chicken = this.parcel2

    this.physics.add.overlap(this.player,this.parcel2,this.collectParcel,null,this)  
    
    // this.girlnpc = this.physics.add.sprite(500,332.5, 'girlnpc');
    // this.physics.add.overlap(this.player,this.girlnpc,this.dropParcel,null,this) 
    }

    update() {
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
        console.log("remove item", tile.index);
        window.life=window.life+1
        console.log("life=", window.life)
        this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
        return false;
      }    

      // Function of deductLife
      deductLife2(player, enemy) {
        console.log("deductLife2");
        this.cameras.main.shake(500);
        window.life = window.life-2
        console.log("life=", window.life)
        enemy.setVisible(false)
        enemy.body.setEnable(false, false)
        return false;
      }
     
      // Function of collectParcel
      collectParcel(player, item) {
        console.log("collectParcel");
        window.parcel1 = window.parcel2 +1
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

      // Function /////////////////////////////
      world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 639;
        playerPos.y = 663;
        playerPos.dir = "down";
    
        this.scene.start("world", { playerPos: playerPos });
      }
}