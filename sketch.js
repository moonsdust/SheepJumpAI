const TOTAL = 10; // Population Size 
let sheeps = [];
let sheepImg;
let bgImg; 
let fenceImg;
let fences = [];
// let slider;
let highestScore = 0;
let time = 0;
let generationCount = 1;

let x1 = 0 
let x2; 
let scrollSpeed = 2;

// load images
function preload() {
    sheepImg = createImg('images/sheep.gif'); // use createImg() to load in gifs
    bgImg = loadImage('images/bg.png');
    fenceImg = loadImage('images/fence.png');
}

// sets up canvas and creates sheep
function setup() {
    var canvas = createCanvas(600, 400);
    // slider = createSlider(1, 100, 1);
    for (let i = 0; i < TOTAL; i++){
        sheeps[i] = new Sheep();
    }
    x2 = width;
    // Place canvas inside #game div
    canvas.parent('game');
    // Timer
    function timeIt(){
        time++;
        select('#timer').html("Time: " + time);
    }
    setInterval(timeIt, 1000);
}

// // sheep jumps when space is pressed
// function keyPressed() {
//     if (key == ' ') {
//         sheep.jump();
//      }
// }

// draw function 
function draw() {
    if (random(1) < 0.01) {
        fences.push(new Fence());
    }
    // scrolling bg 
    image(bgImg, x1, 0, width, height);
    image(bgImg, x2, 0, width, height);

    x1 -= scrollSpeed;
    x2 -= scrollSpeed;
        
    if (x1 < -width){
        x1 = width;
    }
    if (x2 < -width){
        x2 = width;
    }

    // creates parent sheep
    for (let sheep of sheeps) {
        sheep.show();
    }

    // creates new generation of sheep
    if (sheeps.length == 2) {
        // update counts
        generationCount++;
        highestScore = max(highestScore, time);
        // reset time to 0
        time = 0;
        // Update counts in index.html
        select("#highestscore").html("Highest Score: " + highestScore);
        select("#generation").html("Generations: " +  generationCount);
        nextGeneration();
    }

    // creates & moves fences and sheep thinks & moves 
    for (let f of fences) {
        f.move();
        f.show();
        for (let sheep of sheeps) {
            sheep.move();
            sheep.think(f);
            // if fence hits sheep
            if (f.hits(sheep)) {
                textSize(30);
                text('Hit!', 100, 200);
                textAlign(CENTER, CENTER);
                sheeps.splice(sheep, 1);
                select("#remaining").html("Sheep Remaining: " + sheeps.length);
                // check if there is 0 sheep left
                if (sheeps.length == 0) {
                    highestScore = max(highestScore, time);
                    time = 0;
                    select("#highestscore").html("Highest Score: " + highestScore);
                    textSize(30);
                    text('Game Over!', 290, 200);
                    textAlign(CENTER, CENTER);
                    noLoop();
                }
            }
        }
    }
    // // Resets number of sheeps 
    // resetButton(number) {
    //     total = number;
    //     for (let i = 0; i < total; i++){
    //         sheeps[i] = new Sheep();
    //     }
    // }
}
