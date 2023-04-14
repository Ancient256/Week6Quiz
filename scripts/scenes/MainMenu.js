class MainMenu extends Phaser.Scene{
    constructor(){
        super('MainMenu');
    }

    preload(){
        
        this.load.image('play','assets/misc/play.png');
        this.load.image('credbtn','assets/misc/Credit.png');
        this.load.image('menuBackground', 'assets/background/bg2.png');
        this.load.image('exit', 'assets/misc/Exit.png');
      

    }

    create(){
    
        this.add.image(400, 300, 'menuBackground').setScale(1);
        const playButton = this.add.image(400,250,'play').setScale(0.7);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {this.scene.start('gamelvl');
        score = 0;
        playerTime = 0 ;
        });
        
        const creditButton = this.add.image(400,350,'credbtn').setScale(0.7);
        creditButton.setInteractive();
        creditButton.on('pointerdown', () => {this.scene.start('credits')});
        
        const exitGame = this.add.image(400,450,'exit').setScale(.7);
        exitGame.setInteractive();
        exitGame.on('pointerdown', () => {alert('Game Exited')});

       
    }

    update(){
    }
}