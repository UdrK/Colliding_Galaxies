class Mover {

    constructor (position, mass, color, radius=4, displayHistoryFlag=false, velocity=createVector(0,0,0), acceleration=createVector(0,0,0)) {
        this.position = position;
        this.color = color;
        this.mass = mass;
        this.radius = radius;
        
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.history = [];
        this.displayHistoryFlag = displayHistoryFlag;
    }

    applyForce(externalForce) {
        const force = p5.Vector.div(externalForce, this.mass);
        this.acceleration.add(force);
    }

    checkCollision(mover) {
        const distance = p5.Vector.sub(this.position, mover.position);
        if (distance.mag() <= 16) { //(this.radius) + (mover.radius)
            return true;
        }
        return false;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.updateHistory(this.position.copy());
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    updateHistory(newPosition) {
        this.history.unshift(newPosition);
        if (this.history.length > 5) {
            this.history.pop();
        }
    }

    display(optionalColor=null) {
        if (optionalColor) {
            this.color = optionalColor;
        }
        stroke(this.color);
        strokeWeight(this.radius);
        this.displayHistory();
        point(this.position.x, this.position.y, this.position.z);
    }

    displayHistory() {
        if (this.displayHistoryFlag) {
            let i = 0;
            this.history.forEach(oldPosition => {
                i+=1;
                stroke(this.color);             // cooly change color?
                strokeWeight(this.radius-i);    // decreases radius
                point(oldPosition.x, oldPosition.y, oldPosition.z);
            });
        }
    }
}
