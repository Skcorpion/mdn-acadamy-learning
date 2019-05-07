let context = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

 function Shape(x, y, velX, velY) {
     this.x = x;
     this.y = y;
     this.velX = velX;
     this.velY = velY;
 }

 function Ball(x, y, velX, velY, color, size) {
     Shape.call(this, x, y, velX, velY);

     this.color = color;
     this.size = size;
 }

 Ball.prototype = Object.create(Shape.prototype);
 Ball.prototype.constructor = Ball;

 Ball.prototype.draw = function() {
     ctx.beginPath();
     ctx.fillStyle = this.color;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.fill(); 
 }

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
