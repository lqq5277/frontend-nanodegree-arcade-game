// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = (Math.floor(Math.random() * 2) + 1) * 83 - 40;
    this.speed = Math.random() * 500 + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
      var index = allEnemies.indexOf(this);
      if (index > -1) {
        allEnemies.splice(index, 1);
        allEnemies.push(new Enemy());
      }
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
  this.sprite = 'images/char-boy.png';
  this.x = 2 * 101;
  this.y = 5 * 83-40;
}

Player.prototype.update = function() {
  if (this.y < 83-40) {
    console.log("Win!");
    this.x = 2 * 101;
    this.y = 5 * 83-40;
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(dir) {
  if (dir == 'left') {
    if (this.x >= 101) {
      this.x -= 101;
    }
  } else if (dir == 'up') {
    if (this.y >= 0) {
      this.y -= 83;
    }
  } else if (dir == 'right') {
    if (this.x < 4 * 101) {
      this.x += 101;
    }
  } else if (dir == 'down') {
    if (this.y < (5 * 83 - 40)) {
      this.y += 83;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
}

player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
