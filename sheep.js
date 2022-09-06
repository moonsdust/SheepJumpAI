class Sheep {
    constructor() {
        // Size
        this.r = 54

        // Position
        this.x = 40;
        this.y = (height - this.r) - 40; // Max y position

        // Velocity 
        this.vy = 0; 

        // Gravity - higher number = stronger gravitational force 
        this.gravity = 1.5;

        // Setting up neural network for sheep - makes decision if sheep should jump or not
        // NeuralNetwork(Number of input nodes, Number of nodes in hidden layer, Number of output nodes)
        this.brain = new NeuralNetwork(5, 10, 2);
    }

    // jump function 
    jump() {
        // sheep can only jump if its on the ground
        if (this.y == (height - this.r) - 40) {
            this.vy = -27; // Moves sheep up 
        }
    }

    // move function
    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, (height - this.r) - 40);
    }

    // think function 
    think(fence) {
        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = abs(this.x - fence.x) / width; 
        inputs[2] = abs(this.y - fence.y) / height;
        inputs[3] = width / abs(this.x - fence.x);
        inputs[4] = height / abs(this.y - fence.y);

        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    // show function - draws sheep
    show() {
        sheepImg.position(this.x + 10, this.y);
        sheepImg.size(this.r + 10, this.r);
    }
}