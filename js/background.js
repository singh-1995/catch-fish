import Config from "./Config.js";

export default class block {
    constructor(x = 0, y = 0, width = Config.bgSizeWidth, heigth = Config.bgSizeHeight, imgSrc = './src/background.jpg') {
        this.x = x;
        this.y = 0;
        this.width = width;
        this.heigth = heigth;
        this.imgSrc = imgSrc;
        //定义画布对象
        this.img = new Image();
        //定义一个状态表示图片加载完成
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
        };
        this.img.src = this.imgSrc;
    }
    //给对象添加一个渲染的方法
    //context是一个canvas画笔对象
    rander(context) {
        //drawImage(图片对象，X,Y为左上角坐标，图片宽高)
        if(this.isReady){
            context.drawImage(this.img, this.x, this.y, this.width, this.heigth);
        }
    }
}