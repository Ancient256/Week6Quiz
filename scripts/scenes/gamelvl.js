var player;
var enemy;
var cursors;
var shoot;
var score = 0;
var scoreText;
var playerTime = 0;
var minutes = 0;
var seconds = 0;
var playerTimeText;
var bullets;
var lastFired = 0;
var clickSoundEffect;
var bulletCooldown = 200;
var bulletSound;
var enemies;
var spaceKey;
var enemyHitSFX;
var gameBGM;
class gamelvl extends Phaser.Scene{
    constructor(){
        super('gamelvl');
    }


preload ()
{
    this.load.image('bg', 'assets/background/bg2.png');
    this.load.image('host', 'assets/enemy/face.png');
    this.load.image('bullet', 'assets/misc/laserv.png')
    
    this.load.image('ship', 'assets/sprite/ship.png', { frameWidth: 32, frameHeight: 32 });
    this.load.audio('blast', 'assets/sounds/laserShoot.wav');
    this.load.audio('music', 'assets/sounds/gamemusic.wav');
    this.load.audio('boom', 'assets/sounds/explosion.wav');
}

create ()
{

    
  
    bulletSound = this.sound.add('blast');

    gameBGM = this.sound.add('music');
    gameBGM.loop = true;
    gameBGM.play();

    enemyHitSFX = this.sound.add('boom');

  
    this.add.image(400, 300, 'bg');

    
  
    player = this.physics.add.sprite(400, 680, 'ship');
    player.setCollideWorldBounds(true);
    player.setGravity(0,0);

    this.anims.create({
        key: 'stable',
        frames: [ { key: 'ship', frame: 0 } ],
        frameRate: 10,
        repeat: -1
    });
  
    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    scoreText = this.add.text(30, 50, 'Score: 0', { fontSize: '32px', fill: '#fff' }); 
    
    
    playerTimeText = this.add.text(550, 50, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }); 

    
  
    bullets = this.physics.add.group({
        defaultKey: {key: 'bullet'},
        maxSize: 2000,
        allowGravity: false,
        worldBounds: true
      
      });
   
      enemy = this.physics.add.group({
        defaultKey: {key: 'host'},
        maxSize: 2000,
        allowGravity: true,
        runChildUpdate: true,
        worldBounds: true,
        debug: true  
    });

    enemy.createMultiple({
        key: 'host',
        repeat: 5,
        setXY: {
            x: 100,
            y: 0,
            stepX: 100
        },
        
    })

    enemy.children.iterate(function(child) {
        child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(200, 400)).setScale(0.5);;
    });

   
    this.physics.add.overlap(bullets, enemy, onHit, null, this);
    this.physics.add.overlap(player, enemy, collideEnemyAndBullet, null, this);
    this.physics.add.overlap(player, bullets, collideEnemyAndBullet, null, this);
}



update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-320);
        
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(320);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('stable', true);
    }
    if (spaceKey.isDown && this.time.now > lastFired + bulletCooldown) {
        firedBullet();
        lastFired = this.time.now;
        player.anims.play('stable', true);
    }
   timer();
   enemy.getChildren().forEach(function(enemy) {
    if (enemy.y > game.config.height) {
        enemy.destroy();
        createEnemy();
    }
});
}
}