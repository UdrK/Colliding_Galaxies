// CAPTURE STUFF ----------------------------------------------------------------------
var capturer = new CCapture( { format: 'webm' } );
var capturing = false;

function startCapturing() {
    if (!capturing) {
        capturer.start();
        console.log("Capture started");
        capturing = true;
    }
}

function stopCapturing(condition) {
    if (condition) {
        console.log("Capture ended");
        noLoop();
        capturer.stop();
        capturer.save();
    }
}

function capture() {
    console.log("capturing frame");
    capturer.capture(document.getElementById('defaultCanvas0'));
}
// \CAPTURE STUFF ----------------------------------------------------------------------

// draw including capturing stuff
function draw() {
    //startCapturing();
    //stopCapturing(millis() > maxMillis);
    actualDraw();
    //capture();
}

// updating objects in here
function updateDisplay(galaxies) {
    for (i=0; i<galaxies.length; i+=1) {
        galaxies[i].update();
        galaxies[i].display();
    }
}

const g1P = g1Position;
const g2P = g2Position;
const g1V = g1Velocity;
const g2V = g2Velocity;
const g1C = g1Color;
const g2C = g2Color;
var galaxies = [];

// CONSTANTS OVERRIDING FOR SPECIFIC SKETCH -----------------------------
masslessNumber = 250
masslessLowerMass = 0.01;
masslessUpperMass = 0.02;
coreMass = 10;
bigD = 3;
bigG = 2.5;
g1Velocity = [0.05, 0, 0];
g2Velocity = [-0.05, 0, 0];

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    const col1 = color(g1C[0], g1C[1], g1C[2]);
    const col2 = color(g2C[0], g2C[1], g2C[2]);
    
    background(backgroundColor);

    // make 2 galaxy, set their direction towards each other
    var galaxy1 = galaxyBuilder(createVector(g1P[0], g1P[1], g1P[2]), masslessNumber, createVector(g1V[0], g1V[1], g1V[2]), coreColor, col1);
    var galaxy2 = galaxyBuilder(createVector(g2P[0], g2P[1], g2P[2]), masslessNumber, createVector(g2V[0], g2V[1], g2V[2]), coreColor, col2);
    galaxies = [galaxy1, galaxy2];
}

function actualDraw() {
    camera(0, cameraDistance, cameraDistance, 0, 0, 0, 0, 1, 0);
    background(backgroundColor);
    gravitationalEnvironment(galaxies);
    updateDisplay(galaxies);
}
