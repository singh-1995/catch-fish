import Config from "./Config.js";

export default class Fish {
    constructor(fishEyeSrc = Config.imgSrc.fishEyeSrc, fishSwimSrc = Config.imgSrc.fishSwimSrc, fishTailSrc = Config.imgSrc.fishTailSrc, width = Config.bgSizeWidth, height = Config.bgSizeHeight, x, y) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.EyeSrc = fishEyeSrc;
        this.SwimSrc = fishSwimSrc;
        this.TailSrc = fishTailSrc;
        this.fishEye = new Image();
        this.fishSwim = new Image();
        this.fishTail = new Image();
        //鱼的旋转角度
        this.angle;
        this.init();
    }

    init() {
        this.x = this.width * 0.5;
        this.y = this.height * 0.5;
        this.angle = 0;
        this.fishEye.src = this.EyeSrc;
        this.fishSwim.src = this.SwimSrc;
        this.fishTail.src = this.TailSrc;
    }

    draw(ctx, x, y) {
        let mx = x;
        let my = y;
        let deltaY = my - this.y;
        let deltaX = mx - this.x;
        let beta = Math.atan2(deltaX, deltaY);

        this.angle = lerpAngle(beta, this.angle, 0.6)

        ctx.save();
        this.x = lerpDistance(mx, this.x, 0.95);
        this.y = lerpDistance(my, this.y, 0.95);

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.fishEye, -this.fishEye.width * 0.5, -this.fishEye.height * 0.5);
        ctx.drawImage(this.fishSwim, -this.fishSwim.width * 0.5, -this.fishSwim.height * 0.5);
        ctx.drawImage(this.fishTail, -this.fishTail.width * 0.5 + this.fishTail.width * 0.9, -this.fishTail.height * 0.5);
        ctx.restore();



        //aim目标坐标  cur当前坐标  ratio移动速率
        function lerpDistance(aim, cur, ratio) {
            var delta = cur - aim;
            return aim + delta * ratio;
        }
        //旋转角度
        function lerpAngle(a, b, t) {
            var d = b - a;
            if (d > Math.PI) d = d - 2 * Math.PI;
            if (d < -Math.PI) d = d + 2 * Math.PI;
            return a + d * t;
        }
    }



}