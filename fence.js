class Fence {
    constructor() {
        // Size
        this.r = 14;
        // Position 
        this.x = 600; // Set as canvas's width
        this.y = 294; 
    }
    // move function 
    move() {
        this.x -= 5;
    }

    // hits function 
    hits(sheep) {
        return collideRectRect(this.x, this.y, this.r - 20, this.r - 20, sheep.x - 10, sheep.y - 20, sheep.r, sheep.r - 20);
    }

    // show function 
    show() {
        // image(image, x position, y position, width, height)
        image(fenceImg, this.x, this.y, this.r, this.r + 40);
    }
}