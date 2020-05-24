import Config from "./Config.js";
export default class aneObj {
    constructor(num = Config.num, height = Config.bgSizeHeight) {
        //this.x代表海藻的X轴坐标
        //this.y代表海藻的高度；
        this.height = height;
        this.num = num;
        this.x = [];
        this.y = []
        this.init();
    }
    init() {
        for (let i = 0; i < this.num; i++) {
            this.x[i] = i * 20 + Math.ceil(Math.random() * 50) ;
            this.y[i] = 180 + Math.ceil(Math.random() * 80);
        }
    }
    draw(cxt) {
        let height = this.height;
        
        cxt.save();
        cxt.globalAlpha = 0.3;
        cxt.lineWidth = 20;
        cxt.lineCap = 'round';
        cxt.strokeStyle = 'rgb(204, 2, 255)';
        for (let i = 0; i < this.num; i++) {
            cxt.beginPath();
            cxt.moveTo(this.x[i], height);
            cxt.lineTo(this.x[i], height - this.y[i]);           
            cxt.stroke();
        }
        cxt.restore();
    }
} 