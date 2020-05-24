import Block from './background.js';
import aneObj from './aneObj.js';
import Fruit from './fruitObj.js';
import Fish from './Fish.js';
//获取canvas对象
// let cvs1 = document.querySelector('#canvas1');
// let cxt1 = cvs1.getContext('2d');
// cvs1.windt = document.documentElement.clientWidth;
// cvs1.height = document.documentElement.clientHeight;
// let cvs2 = document.querySelector('#canvas2');
// let cxt2 = cvs2.getContext('2d');
let cvs1 = document.createElement("canvas");
cvs1.setAttribute("width", screen.availWidth);
cvs1.setAttribute("height", screen.availHeight);
cvs1.setAttribute("id", "canvas1");
document.body.appendChild(cvs1);
let cxt1 = cvs1.getContext('2d');
let lastTime;
let deltaTime;
let my = 0;
let mx = 0;
let cvsW = cxt1.width;
let cvsH = cxt1.heigth;
cvs1.addEventListener('touchstart', onClickMove, false)


//对象实例化
let b = new Block();
let a = new aneObj();
let c = new Fruit();
let f = new Fish()

lastTime = Date.now();

function gameloop() {
    requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;
    b.rander(cxt1);
    a.draw(cxt1);
    c.draw(cxt1, deltaTime);
    c.fruitMonitor();
    c.fishCollisionFruit(mx, my)
    //清理畫布
    cxt1.clearRect(0, 0, cvsW, cvsH);
    f.draw(cxt1, mx, my);
}
gameloop();

function onClickMove(e) {
    e.preventDefault()
    my = e.changedTouches[0].clientY;
    mx = e.changedTouches[0].clientX;
 }
