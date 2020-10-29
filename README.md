# Colliding_Galaxies
This is a p5.js project that simulates a simple gravitational environment, puts galaxies in it and has them collide to produce some cool visuals.
[Here's](https://imgur.com/gallery/zhAAztE) some examples of what it can do.

## Project structure


### Dependencies
Dependencies can be derived from the file index.html. They are the scripts included in the head of the file. 
* The dependecies in the node_modules folder are needed to capture the rendered sketches and therefore aren't hard dependencies. You can remove them, but you won't be able to save as webms the sketches, you'll only see them in your browser.
* The dependencies in the libraries folder are p5.js libraries. They are required to run the sketches.

### Sketch
In a Sketch we define what p5.js will actually go and render for us, a sort of main. This is the place where i declare how many galaxies there are, where they are, what properties they have
and call the physics function that allow them to move interact and evolve. In order to be run a sketch needs to be included as a script in the body of the file index.html.

### Galaxy
A galaxy is a Mover called core and a collection of movers called masslessMovers. In my approximation a galaxy has a core which holds the entirety of the mass of the galaxy while the massless movers don't exert any forces, they only feel forces from the cores. All of the physics is defined in the physics.js file though, so the galaxy can be used in other ways. In a sketch, Sketch_AllForcesCollision i calculate forces between masslessMovers too.

### Mover
A mover is an object that moves. It has properties like position, velocity, acceleration, radius, mass, color, etc.

### Physics
In here i define forces and apply them how i see fit. In simpleGravitationalEnvironment galaxies' cores apply forces to each other, and masslessMovers feel these forces too. In gravitationalEnvironment everything that has mass attracts every other thing that has mass.