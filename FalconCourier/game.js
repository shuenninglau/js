var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 25,
    height: 23.8 * 25,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true, //这个最后最后的时候要关掉，所以那个红色的格子会没有掉
        }
    },
    scale: { //这个是responsive跟着你的screen的大小，会自动scale
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preload, storyTextbox, gameTask, gameDirection, world, room1, blockB, blockC, blockD, cafeteria, computerlab, library, gameComplete]
};


var game = new Phaser.Game(config);
window.life=10
window.parcel1=0
window.parcel2=0
window.parcel3=0
window.injection=0