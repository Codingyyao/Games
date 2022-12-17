// 设置画布

const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
const ballCounts = document.createElement('p');
body.appendChild(ballCounts);

const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const para = document.querySelector('p');
let count = 0;
// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色

function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

// 小球构造器

class Shape {
    x;
    y;
    velX;
    velY;
    exists;

    constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}
}

class Ball extends Shape {
  color;
  size;

  constructor(x, y, velX, velY, color,size,exists){
    super();
    this.color = color;
    this.size = size;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;

  }

  draw(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  }

  update(){
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
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
    const dx = this.x - balls[j].x;
    const dy = this.y - balls[j].y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + balls[j].size) {
    balls[j].color = this.color = randomColor();
    }}}

}
}

// add 恶魔圈
class EvilCircle extends Shape {
  color;
  size;

  constructor(x, y, velX, velY, color,size,exists){
    super();
    this.color = 'whikte';
    this.size = 20;
    this.x = x;
    this.y = y;
    this.exists = exists;
    this.velX = 20;
    this.velY = 20;
    // Shape.call(this, x, y, 20, 20, exists);

  }

  draw(){
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.fillText('橡皮圈',this.x + this.size,this.y + this.size, 100)
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
  }

  update(){
    if ((this.x + this.size) >= width) {
    this.velX = this.velX - this.size;
    }

    if ((this.x - this.size) <= 0) {
    this.velX = this.velX + this.size;
    }

    if ((this.y + this.size) >= height) {
    this.velY = this.velY - this.size;
    }

    if ((this.y - this.size) <= 0) {
    this.velY = this.velY + - this.size;
    }
}

  setControls() {
    window.onkeydown = e => {
  switch(e.key) {
    case 'a':
      this.x -= this.velX;
      break;
    case 'd':
      this.x += this.velX;
      break;
    case 'w':
      this.y -= this.velY;
      break;
    case 's':
      this.y += this.velY;
      break;
  }
};
}

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
    const dx = this.x - balls[j].x;
    const dy = this.y - balls[j].y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + balls[j].size) {
    balls[j].exists = false;
    count--;
    para.textContent = '剩余小球数：' + count + ' 个！';
    }}}

}



}

// draw a ball in screen;
//Ball.prototype.draw = function() {
  //ctx.beginPath();
  //ctx.fillStyle = this.color;
  //ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
 // ctx.fill();
//}

// let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

// 检测小球是否靠近边缘，调整速度方向；

// 碰撞规则

// start loop

let balls = [];

while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size,
      'true'
    );
    balls.push(ball);
    count++;
    para.textContent = '剩余小球数：' + count + ' 个！';
  }


let evilCircle = new EvilCircle (200, 200, 20, 20, 'whikte',20,'ture');
evilCircle.setControls();

  function loop() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(0, 0, width, height);
  var bcount = 0;

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
    bcount++; }
  }
  evilCircle.draw();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();

