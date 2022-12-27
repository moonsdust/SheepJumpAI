class Sheep {
    constructor() {
        // Size
        this.r = 54

        // Position
        this.x = 45;
        this.y = (height - this.r) + 100; // Max y position

        // Velocity 
        this.vy = 0; 

        // Gravity - higher number = stronger gravitational force 
        this.gravity = 1.5;

        // Setting up neural network for sheep - makes decision if sheep should jump or not
        // NeuralNetwork(Number of input nodes, Number of nodes in hidden layer, Number of output nodes)
        this.brain = new NeuralNetwork(4, 40, 2);
    }

    // jump function 
    jump() {
        // sheep can only jump if it's on the ground
        if (this.y == (height - this.r) + 100) {
            this.vy = -27 - random(1.5); // Moves sheep up 
        }
    }

    // move function
    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, (height - this.r) + 100);
    }

    // think function 
    think(fence) {
        let inputs = [];
        inputs[0] = abs(this.x - fence.x) / width; 
        inputs[1] = abs(this.y - fence.y) / height;
        inputs[2] = width / abs(this.x - fence.x);
        inputs[3] = height / abs(this.y - fence.y);
        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    // show function - draws sheep
    show() {
        sheepImg.position(this.x + 400, this.y);
        sheepImg.size(this.r + 10, this.r);
    }
}
