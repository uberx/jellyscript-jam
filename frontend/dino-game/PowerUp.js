export default class PowerUp {
    constructor(ctx, width, x ,y, height, speed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }


    update(frameTimeDelta) {
        this.x -= this.speed * frameTimeDelta;
        if (this.x < -this.width) {
        this.x = GAME_WIDTH * scaleRatio;
        this.y = Math.random() * (GAME_HEIGHT - this.height);
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