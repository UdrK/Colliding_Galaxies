class Galaxy {

    constructor (core, masslessMovers) {
        this.core = core;
        this.masslessMovers = masslessMovers;
    }

    update() {
        this.core.update();
        this.masslessMovers.forEach(element => {
            element.update();
        });
    }

    display(optionalColor=null) {
        this.core.display();
        this.masslessMovers.forEach(element => {
            element.display(optionalColor);
        });      
    }
}
