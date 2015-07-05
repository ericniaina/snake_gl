function SnakePlayer(game, cursors) {
    var snakeHead; //head of snake sprite
    var snakeSection = new Array(); //array of sprites that make the snake body sections
    var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
    var numSnakeSections = 30; //number of snake body sections
    var snakeSpacer = 6; //parameter that sets the spacing between sections

    var game = game;
    var cursors = cursors;
    this.create = function() {
        snakeHead = game.add.sprite(400, 300, 'arrow');
        snakeHead.anchor.setTo(0.5, 0.5);

        game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

        //  Init snakeSection array
        for (var i = 1; i <= numSnakeSections - 1; i++)
        {
            snakeSection[i] = game.add.sprite(400, 300, 'arrow');
            snakeSection[i].anchor.setTo(0.5, 0.5);
        }

        //  Init snakePath array
        for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
        {
            snakePath[i] = new Phaser.Point(400, 300);
        }

        game.camera.follow(snakeHead);

    }

    this.update = function() {

        snakeHead.body.velocity.setTo(0, 0);
        snakeHead.body.angularVelocity = 0;

        snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 300));

        // Everytime the snake head moves, insert the new location at the start of the array, 
        // and knock the last position off the end

        var part = snakePath.pop();

        part.setTo(snakeHead.x, snakeHead.y);

        snakePath.unshift(part);

        for (var i = 1; i <= numSnakeSections - 1; i++)
        {
            var pos1 = snakeSection[i].position;
            var pos2 = snakePath[i * snakeSpacer];
            var angle = Phaser.Point.angle(pos2,pos1);
            snakeSection[i].rotation = angle;
            snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
            snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
        }

        if (cursors.left.isDown)
        {
            snakeHead.body.angularVelocity = -300;
        }
        else if (cursors.right.isDown)
        {
            snakeHead.body.angularVelocity = 300;
        }

    }

    this.debug = function() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(snakeHead, 32, 500);
    }
}