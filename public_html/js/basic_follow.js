var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, update: update, render: render});

function preload() {

    game.load.image('background', 'assets/debug-grid-1920x1920.png');
    game.load.image('arrow', 'assets/arrow.png');

}

var player;
var cursors;

function create() {

    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();

    player = new SnakePlayer(game, cursors);
    player.create();
}

function update() {
    player.update();
}

function render() {
    player.debug();
}