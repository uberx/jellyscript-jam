export default class PowerUp {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.width / 2;
    }


    update(gameSpeed, frameTimeDelta) {
        this.x -= this.speed * frameTimeDelta;
        if (this.x < -this.width) {
            this.x = this.ctx.canvas.width;
        }
    }


    draw() {
        this.ctxFillStyle = "red"; //think about the color gradient
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collideWith(player) {
        return this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y;
    }
}