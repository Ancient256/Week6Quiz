class creditScene extends Phaser.Scene{
    constructor(){
        super("credits");
        
    }
    preload(){
   
        this.load.image('return','assets/misc/return.png');
        this.load.image('cred','assets/background/credbg.png');
        
    }
    create(){

        this.add.image(400, 300, 'cred');
        const returnButton = this.add.image(100,100,'return').setScale(.2);
        returnButton.setInteractive();
        returnButton.on('pointerdown', () => {this.scene.start('MainMenu')});
        
    }
    update(){

    }
}