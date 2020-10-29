// returns force mover2 feels because of mass of mover1
function attraction(mover1, mover2) {
    const force = p5.Vector.sub(mover1.position, mover2.position);
    const distance = constrain(force.mag(), attractionLowerConstrain, attractionUpperConstrain);   // limits how strong gravity can get
    const magnitude = (bigG * mover1.mass * mover2.mass) / (distance * distance);  // GMm/d^2
    force.normalize();
    force.mult(magnitude);
    return force;
}

function drag(mover1, mover2) {
    const pos_diff = p5.Vector.sub(mover1.position, mover2.position);
    const distance = constrain(pos_diff.mag(), dragLowerConstrain, dragUpperConstrain);
    const speed = mover1.velocity.mag();
    // drag increses with speed and proximity (simulates increasing density next to core)
    const magnitude = bigD * speed / distance;
    const force = mover1.velocity.copy();
    force.mult(-1); // reverse direction
    force.normalize();
    force.mult(magnitude);
    return force;
}

function collisionDetection(galaxies) {
    return galaxies[0].core.checkCollision(galaxies[1].core);
}

function galaxiesCoreForces(galaxies) {
    // every galaxy core feels drag and gravity from every other
    for (i=0; i<galaxies.length; i+=1) {
        for (j=0; j<galaxies.length; j+=1) {
            if (i != j) {
                const galaxiesAttraction = attraction(galaxies[j].core, galaxies[i].core);
                const galaxiesDrag = drag(galaxies[i].core, galaxies[j].core);
                galaxies[i].core.applyForce(galaxiesAttraction);
                galaxies[i].core.applyForce(galaxiesDrag);
            }
        }
    }
}

function simpleMasslessMoversForces(galaxies) {
    // for each galaxy, every masslessMover feels gravitational forces from every galaxyCore
    for (i=0; i<galaxies.length; i+=1) {
        for (j=0; j<galaxies.length; j+=1) {
            for(k=0; k<galaxies[i].masslessMovers.length; k+=1) {
                const grav = attraction(galaxies[i].core, galaxies[j].masslessMovers[k]);
                galaxies[j].masslessMovers[k].applyForce(grav);
            }
        }
    }   
}

function masslessMoversForces(galaxies) {
    // for each galaxy, every masslessMover feels gravitational forces from every galaxyCore and every other masslessMover
    for (i=0; i<galaxies.length; i+=1) {
        for (j=0; j<galaxies.length; j+=1) {
            for(k=0; k<galaxies[i].masslessMovers.length; k+=1) {
                const coreGrav = attraction(galaxies[i].core, galaxies[j].masslessMovers[k]);
                galaxies[j].masslessMovers[k].applyForce(coreGrav);
                for(l=0; l<galaxies[i].masslessMovers.length; l+=1) {
                    const moverGrav = attraction(galaxies[i].masslessMovers[l], galaxies[j].masslessMovers[k]);
                    galaxies[j].masslessMovers[k].applyForce(moverGrav);                    
                }
            }
        }
    }   
}

// assumes galaxies have same number of objects
// calculates and applies forces
function simpleGravitationalEnvironment(galaxies) {
    // calculating and applying gravitational and drag force between galaxy cores
    galaxiesCoreForces(galaxies);

    // calculating and applying gravitational forces to massless movers
    simpleMasslessMoversForces(galaxies);
}

function gravitationalEnvironment(galaxies) {
    // calculating and applying gravitational and drag force between galaxy cores
    galaxiesCoreForces(galaxies);

    // calculating and applying gravitational forces to massless movers
    masslessMoversForces(galaxies);
}

// returns an array of objects that are supposed to gravitate the galaxy's 
function masslessBuilder(core, masslessNumber, color, initialVelocity) {
    movers = [];
    const centerX = core.position.x;
    const centerY = core.position.y;
    
    for(i=0; i<masslessNumber; i+=1) {
        // distribute cloud of objects around center
        const mass = random(masslessLowerMass, masslessUpperMass);
        const distance = random(masslessLowerXY, masslessUpperXY);
        const angle = random(0, TWO_PI);
        const xDistance = distance * cos(angle);
        const yDistance = distance * sin(angle);
        const zDistance = random(masslessLowerZ, masslessUpperZ);

        const startPosition = createVector(centerX + xDistance, centerY + yDistance, zDistance);

        // calculating speed for masslessMovers to be in an almost circular orbit
        const speed = Math.sqrt(bigG * smallG * (core.mass) / distance);

        // centerDir + (PI / 2) directs the velocity perpendicularly with respect to the galaxy core
        const centerDir = p5.Vector.sub(startPosition, core.position);
        let velocity = p5.Vector.fromAngle(centerDir.heading() + (PI / 2), speed);    
        velocity = p5.Vector.add(velocity, initialVelocity);
        const body = new Mover(startPosition, mass, color, masslessRadius, masslessHistory, velocity);

        movers.push(body);
    }
    return movers;
}

function galaxyBuilder(position, masslessNumber, velocity, attractorColor, masslessColor) {
    const core = new Mover(position, coreMass, attractorColor, coreRadius, coreHistory, velocity);
    const masslessMovers = masslessBuilder(core, masslessNumber, masslessColor, velocity);
    return new Galaxy(core, masslessMovers);
}
