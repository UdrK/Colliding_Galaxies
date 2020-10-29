// ------------------------------------------------------------------------
// PHYSICS CONSTANTS                                                      |
// ------------------------------------------------------------------------ 

// influences strenght of gravity (higher values result in faster dynamics)
var bigG = 3;

// influences initial velocity for masslessMover
var smallG = 1;

// influences strenght of drag
var bigD = 1;

// limits strength of gravity, particularly when objects are close
var attractionLowerConstrain = 5.0;
var attractionUpperConstrain = 200.0;

// limits strength of drag, particularly when objects are close
var dragLowerConstrain = 5.0;
var dragUpperConstrain = 20.0;

// range of masses (determine size too) for masslessMovers, radius of masslessMovers, display massless history flag
var masslessLowerMass = 0.1;
var masslessUpperMass = 0.2;
var masslessRadius = 4;
var masslessHistory = false;

// range of distance on the x AND y axis for masslessMovers to galaxy core
var masslessLowerXY = 3;
var masslessUpperXY = 40;

// range of distance on the z axis for masslessMovers to galaxy core
var masslessLowerZ = 0;
var masslessUpperZ = 0;

// galaxy core mass, radius, display core history flag
var coreMass = 10;
var coreRadius = 0;
var coreHistory = false;

// ------------------------------------------------------------------------
// SKETCH CONSTANTS                                                       |
// ------------------------------------------------------------------------ 

// how many milliseconds before recording ends
var maxMillis = 12000;
var eventMillis = 4000;

// camera position in the Y and Z axis
var cameraDistance = 175;

// sketch size, color
var canvasWidth = 1920;
var canvasHeight = 1013;
var backgroundColor = 12;

// how many masslessMovers will be in the galaxies and colors
var masslessNumber = 750;
var g1Color = [255, 204, 0]
var g2Color = [0, 204, 255]

// galaxy cores color
var coreColor = 12;

// galaxies positions
var g1Position = [0, 0, 0]; // [0, 0, 0];  //  [-100, 0, 0]; 
var g2Position = [50, -50, 0];

// galaxies initial velocity
var g1Velocity = [0, 0, 0];  // [0.05, 0, 0];
var g2Velocity = [0, 0, 0];

var hueChangeConstant = 1;
var hueChangeMultiplicator = 1;
