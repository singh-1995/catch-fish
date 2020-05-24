import Config from "./Config.js";
export default class Fruit {
    constructor(num = 20, orangeSrc = Config.imgSrc.orange, blueSrc = Config.imgSrc.blue,mx,my) {
        this.num = num;
        this.orangeSrc = orangeSrc;
        this.blueSrc = blueSrc;
        this.orange = new Image();
        this.blue = new Image();
        //this.alive用来表示果实当前的状态
        this.alive = [];//boll
        //this.x用来存放果实出生的x轴坐标
        this.x = [];
        //this.y用来存放果实出生的y轴坐标
        this.y = [];
        //this.l表示果实的大小
        this.l = [];
        //this.r表示果实上浮的速率
        this.r = []
        //出生果实的类型
        this.fruitType = [];
        this.init();

    }

    init() {
        this.orange.src = this.orangeSrc;
        this.blue.src = this.blueSrc;
        for (let i = 0; i < this.num; i++) {
            this.alive[i] = true;
            this.l[i] = 0;
            this.r[i] = Math.random() * 0.01 + 0.005;
            this.fruitType[i] = " ";
            this.born(i);
        }
    }

    draw(cxt, time) {
        let pic = null;
        for (let i = 0; i < this.num; i++) {

            if (this.alive[i]) {
                if (this.l[i] <= 20) {
                    this.l[i] += this.r[i] * time;
                } else {
                    this.y[i] -= this.r[i] * 5 * time;
                }
                if (this.fruitType[i] === 'orange') {
                    pic = this.orange
                } else {
                    pic = this.blue;
                }
                cxt.drawImage(pic, this.x[i], this.y[i], this.l[i], this.l[i]);
                if (this.y[i] < 0) {
                    this.alive[i] = false;
                }
            }
        }
    }
    //生产果实的随机位置
    born(i) {
        this.x[i] = i * 40 + Math.ceil(Math.random() * 50);
        this.y[i] = 350 + Math.ceil(Math.random() * 80);
        this.l[i] = 0;
        this.alive[i] = true;
        let ran = Math.random();
        this.fruitType[i] = ran > 0.2 ? 'orange' : 'blue';
    }
    //当果实少于15的时候生产一个果实
    fruitMonitor() {

        let n = 0;
        for (let i = 0; i < this.num; i++) {
            if (!this.alive[i]) n++;
        }
        if (n > 5) {
            this.sendFruit();
        }
    }
    //派发一个果实
    sendFruit() {
        for (let i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.born(i);
                return;
            }
        }
    }
    //吃了一个果实
    dade(i) {
        this.alive[i] = false;
    }
    //x,y当前鼠标点击位置
    fishCollisionFruit(x, y) {
        let mx = x;
        let my = y;
        for(let i=0;i<this.num;i++){
            if(this.alive[i]){
                //L为鱼和果实的距离
                var L = calLength2(this.x[i],this.y[i],mx,my);
                if(L<900){
                    setTimeout(()=>{
                        this.dade(i);
                    },500) 
                }
            }
        }
        //计算坐标距离  return numb
        function calLength2(x1, y1, x2, y2) {
            return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
        }
    }
}