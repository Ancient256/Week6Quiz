class gameOverScene extends Phaser.Scene{
    constructor(){
        super("endScene");

    }
    preload(){
     
        this.load.image('retry','assets/misc/retryButton.png');
        this.load.image('return','assets/misc/return.png');
        this.load.image('goBg', 'assets/background/bg2.png');
        
    }
    create() {

       
        const playerScore = score;
        const playerMinutes = minutes;
        const playerSeconds = seconds.toString().padStart(2, '0');

        this.add.image(400, 300, 'goBg');
        const gameOverText = this.add.text(400, 300, 'Game Over!\nScore: '+ playerScore + '\nTime Survived: '+
         playerMinutes +':'+ playerSeconds , {
            fontFamily: 'Arial',
            fontSize: '32px',
            fill: '#fff'
        });
        gameOverText.setOrigin(0.5);
        
    


        const resetButton = this.add.image(300,500,'retry').setScale(.1);
        resetButton.setInteractive();
        resetButton.on('pointerdown', () => {this.scene.start('gamelvl');
        score = 0;
        playerTime = 0;
        });




        const returnMainMenu = this.add.image(500,500,'return').setScale(.25);
        returnMainMenu.setInteractive();
        returnMainMenu.on('pointerdown', () => {this.scene.start('MainMenu')});
    }
    update(){
        
    }
}
