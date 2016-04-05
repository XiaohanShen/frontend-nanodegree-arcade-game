"use strict";
var MAP_WidthX = 83;
var MAP_WidthY = 101;
// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.speed = speed;
    this.x = 0;
    this.y = this.row * MAP_WidthX - 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x >= 400) {
        this.x = 0;
        this.row = randomNum();
        this.y = this.row * MAP_WidthX - 20;
    } else {
        this.x += this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.genius = 'images/char-boy.png';
    this.x = 2 * MAP_WidthY;
    this.y = 5 * MAP_WidthX - 10;
    this.tempX = 2 * MAP_WidthY;
    this.tempY = 5 * MAP_WidthX - 10;
    this.toHandleInput = true; // false when game over
};

Player.prototype.update = function() {
    this.x = this.tempX;
    this.y = this.tempY;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.genius), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (this.toHandleInput) {
        switch (keyCode) {
            case 'left':
                if (this.x !== 0) this.tempX -= MAP_WidthY;
                break;
            case 'up':
                if (this.y !== -10) this.tempY -= MAP_WidthX;
                break;
            case 'right':
                if (this.x !== 404) this.tempX += MAP_WidthY;
                break;
            case 'down':
                if (this.y !== 405) this.tempY += MAP_WidthX;
                break;
        }
    }
    if (!this.toHandleInput && keyCode == 'enter') this.toHandleInput = true;
};

var Hearts = function() {
    this.width = 50;
    this.height = 85;
    this.heart = 'images/Heart.png';
    this.num = 3;
    this.round = 2;
};

Hearts.prototype.handleInput = function(keyCode) {
    if (this.num === 0 && keyCode === 'enter') {
        this.num = 3;
        this.round = 2;
    }
};

Hearts.prototype.render = function() {
    for (var n = 0; n < this.num; n++) {
        ctx.drawImage(Resources.get(this.heart), 50 * n, 30, this.width, this.height);
    }

};

var Rock = function(row, col) {
    this.block = 'images/Rock.png';
    this.x = row * MAP_WidthY;
    this.y = col * 83 - 20;
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.block), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(randomNum(), randomNum() * 1.5),
    new Enemy(randomNum(), randomNum() * 2),
    new Enemy(randomNum(), randomNum() * 2.2),
    new Enemy(randomNum(), randomNum() * 2.5)
];
var player = new Player();
var hearts = new Hearts();
var rocks = [];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    hearts.handleInput(allowedKeys[e.keyCode]);
});

function randomNum() {
    var num = Math.round(Math.random() * 10); // get integer from 0 to 10

    if (num === 10 || num === 0 || num === 1 || num === 2) {
        return 1;
    } else if (num >= 3 && num <= 7) {
        return 2;
    } else {
        return 3;
    }
}