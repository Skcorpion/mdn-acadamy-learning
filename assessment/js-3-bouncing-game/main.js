// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
/* You'll see here that we are chaining multiple assignments together, 
to get the variables all set quicker — this is perfectly OK. */

let para = document.querySelector('p');
let count = 0;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// Adding the constructor

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}

//!!set the Ball() constructor's prototype and constructor appropriately.
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// Adding methods

// Drawing the ball
Ball.prototype.draw = function() {
    ctx.beginPath(); // state: we want to draw a shape on the paper
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // arc 0 degree to 2*PI = 360 arc(cirlce)
    ctx.fill(); /* states "finish drawing the path we started with beginPath(), 
    and fill the area it takes up with the color we specified earlier in fillStyle." */
}


// Updating the ball's data
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

// Adding collision detection
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size && balls[j].exists) {
                balls[j].color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
}

// EvilCircle

function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);

    this.color = 'white';
    this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


EvilCircle.prototype.draw = function() {
    ctx.beginPath(); 
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
}


EvilCircle.prototype.setControls = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 65) {
        _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
        _this.x += _this.velX;
        } else if (e.keyCode === 87) {
        _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
        _this.y += _this.velY;
        }
    }
}


EvilCircle.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists ) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                para.textContent = 'Score: ' + count;
            }
        }
    }
}

let evil = new EvilCircle(random(0,width), random(0,height), true);
evil.setControls();

// Animating the ball

var balls = []; // store our balls

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) {
        let size = random(10, 20);
        let ball = new Ball(
            /* ball position always drawn at least one ball width
               away from the edge of the canvas, to avoid drawing errors */
               random(0 + size, width - size),
               random(0 + size, height - size),
               random(-7, 7),
               random(-7, 7),
               true,
               'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0,255) +')',
               size
        );
        balls.push(ball); // increment
        count++;
        para.textContent = 'Score: ' + count;
    }

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
        }
    }

    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();

    requestAnimationFrame(loop);
}

// Get animation started
loop();

