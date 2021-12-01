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

    // this.load.atlas("ene2", "assets/ene2.png", "assets/ene2.json");  
    this.load.image("parcel1","assets/parcel-01.png");
    this.load.spritesheet('library','assets/library.png', {frameWidth:23, frameHeight:32})
   
    }

    create() {
        console.log('*** room1 scene');

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

    // this.anims.create({
    //   key: 'ene2',
    //   frames: [
    //     { key: 'ene2', frame: 'ene2-01'},
    //     { key: 'ene2', frame: 'ene2-02'},
    //     { key: 'ene2', frame: 'ene2-03'},
    //     { key: 'ene2', frame: 'ene2-04'},
    //   ],
    //   frameRate: 2.5,
    //   repeat: -1
    // })
    // this.ene2 = this.add.sprite(464.5,947.3,'ene2').play('ene2').setScale(0.3);
    
  
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

    this.parcel1 = this.physics.add.sprite(647,941, 'parcel1').setScale(0.3);
    window.chicken = this.parcel1
    this.physics.add.overlap(this.player,this.parcel1,this.collectParcel,null,this);  
    
    this.library = this.physics.add.sprite(211.35,371.35, 'library');
    this.physics.add.overlap(this.player,this.library,this.dropParcel,null,this);  
    }

    update(time, delta) {
    // this.time.addEvent({
    //   delay: 3000,
    //   callback: moveRightLeft,
    //   callbackScope: this,
    //   loop: false,
    // });

      ///////// Beginning of Enter room ////////////////////////////////
        // check for BlockA 
        if (this.player.x > 589 && this.player.x < 696 && this.player.y > 1164) {
          this.world();
        }
    
        // goto library
        if (this.player.x < 110 && this.player.y > 787.35 && this.player.y < 876.5) {
          this.library();
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
        window.parcel1 = window.parcel1 +1
        console.log("parcel1", window.parcel1)
        item.setVisible(false)
        item.body.setEnable(false)
        return false;
      }
      
      // Function of dropParcel
      dropParcel(player, item) {
        console.log("dropParcel");
        if(window.parcel1 > 0){
          this.parcel1.setVisible(true)
          this.parcel1.x = item.x - 35
          this.parcel1.y = item.y
        }
        return false;
      } 

/////// Exit room position ///////////////////////////////////
      // Function jump to world
      world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 513;
        playerPos.y = 1097;
        playerPos.dir = "down";
    
        this.scene.start("world", { playerPos: playerPos });
      }
    
      library(player, tile) {
        console.log("library function");
        let playerPos = {};
        playerPos.x = 1100;
        playerPos.y = 440;
        playerPos.dir = "right";
    
        this.scene.start("library", { playerPos: playerPos });
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

   /////////////////// Tween function/////////////////////////////
  delayOneSec() {
     console.log("1 sec later...");
     //this.player.body.setSize(this.player.width*1, this.player.height*1, true);
     this.player.body.setSize(this.player.width * 1, this.player.height * 1);
   }

   overlap1() {
     console.log("ene2");
   }    

   moveRightLeft() {
     console.log("moveDownUp");
     this.tweens.timeline({
       targets: this.ene2,
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
   ////////////////////// end of tween function////////////////////////

}