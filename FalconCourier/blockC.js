class blockC extends Phaser.Scene {

    constructor() {
        super({ key: 'blockC' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("jewelry","assets/BlockC-jewelry.json");

    //load image
    this.load.image("atlas","assets/atlas32x32.png");
    this.load.image("modern","assets/mordern32x32.png");
    this.load.image("parcel","assets/parcel.png");
    this.load.image("parcel3","assets/parcel-03.png");

    }

    create() {
        console.log('*** blockC scene');

        this.collect = this.sound.add("collect");
        this.shake = this.sound.add("shake");
        this.taskCollect = this.sound.add("taskCollect");
        this.drop = this.sound.add("drop");

        let map = this.make.tilemap({key: "jewelry"});

        let atlasTiles = map.addTilesetImage("atlas32x32","atlas");
        let mordernTiles = map.addTilesetImage("mordern32x32","modern");
        let parcelTiles = map.addTilesetImage("parcel", "parcel");

        let tilesArray = [ atlasTiles, mordernTiles, parcelTiles ]

        this.bgLayer = map.createLayer("backgroundLayer",tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer",tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray, 0, 0);
        this.decorLayer = map.createLayer("decorLayer",tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0, 0);
        this.frameLayer = map.createLayer("frameLayer",tilesArray, 0, 0);     

    this.physics.world.bounds.width = this.bgLayer.width;   
    this.physics.world.bounds.height = this.bgLayer.height;                                                                                    

    this.player = this.physics.add.sprite(639, 1122, "up").setScale(0.3);

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);

    this.furnitureLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true) 
    this.decorLayer.setCollisionByExclusion(-1, true);
    this.frameLayer.setCollisionByExclusion(-1, true)
 
    this.itemLayer.setTileIndexCallback(2281, this.removeItem, this);

    this.physics.add.collider(this.player, this.furnitureLayer);
    this.physics.add.collider(this.player, this.itemLayer); 
    this.physics.add.collider(this.player, this.frameLayer);
    
    this.physics.add.overlap(this.player,this.ene1,this.deductLife,null,this)

    this.parcel3 = this.physics.add.sprite(1082,1063, 'parcel3').setScale(0.3);
    window.chicken = this.parcel3
    this.physics.add.overlap(this.player,this.parcel3,this.collectParcel,null,this);  

    this.sas = this.physics.add.sprite(212,969, 'sas');
    this.guard = this.physics.add.sprite(949,782, 'guard');
    this.friend = this.physics.add.sprite(289,392, 'friend');
    this.physics.add.overlap(this.player,this.friend,this.dropParcel,null,this); 

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
      this.physics.moveToObject(this.guard, this.player, 30, 10000)    
      this.physics.moveToObject(this.sas, this.player, 50, 40000)  

    //go back to worldmap, check for blockC exit
    if ( this.player.x > 563.35 && this.player.x < 716.5 && this.player.y > 1165.3) {
            this.world();
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
    this.collect.play();
    console.log("remove item", tile.index);
    window.life=window.life+1
    console.log("life=", window.life)
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    scoreText.setText(window.life )
    return false;
  }

  // Function of collectParcel
  collectParcel(player, item) {
    this.taskCollect.play();
    console.log("collectParce3");
    window.parcel3 = window.parcel3 +1
    console.log("parcel3", window.parcel3)
    item.setVisible(false)
    item.body.setEnable(false)
    return false;
    }
      
  // Function of dropParcel
  dropParcel(player, item) {
    this.drop.play();
    console.log("dropParcel");
    if(window.parcel3 > 0){
    this.parcel3.setVisible(true)
    this.parcel3.x = item.x - 35
    this.parcel3.y = item.y
    }
    return false;
    } 

    // Exit room ///////////////////////////////
    // Function to jump to word
    world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 1472;
    playerPos.y = 608.6;
    playerPos.dir = "down";

    this.scene.start("world", { playerPos: playerPos });
  }

}