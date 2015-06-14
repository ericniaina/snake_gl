var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, update: update, render: render});

function preload() {

    game.load.image('background', 'assets/debug-grid-1920x1920.png');
    game.load.image('player', 'assets/arrow.png');

}

var player;
var cursors;

function create() {

    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5, 0.5);

    game.physics.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

}

function update() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 200;
    }

//    if (cursors.up.isDown)
//    {
        game.physics.arcade.velocityFromAngle(player.angle, 300, player.body.velocity);
//    }

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}