//Set up Canvas and Canvas context
var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");
//Set the number of particles that should be spawned
var numParticles = 20000;

/*Create particle array and push anonymous particle objects
  on to the array*/

var Orbiter = {
    locationX: 500,
    locationY: 500,
    gravity: 20,
    radius: 200,
    checkOrbit: function (TargetParticles) {

        for (var index in TargetParticles) {
            
            var absoluteX, absoluteY;
            var velocityModifierX, velocityModifierY, velocityModTotal
            
            var p = TargetParticles[index];
            var distX = this.locationX - p.locationX;
            var distY = this.locationY - p.locationY;

            var distTotal = Math.sqrt(Math.abs(distX * distX) + Math.abs(distY * distY));
            absoluteX = Math.abs(distX);
            absoluteY = Math.abs(distY);

            //redo this logic based on the particle's velocity history
            if ((absoluteX == 0) && (absoluteY == 0)) {
                absoluteX = 1;
                absoluteY = 1;
            }
            
            if (distTotal <= this.radius){

                velocityModTotal = (1 / Math.sqrt(Math.abs(distTotal)) * this.gravity);
                velocityModifierX = (Math.abs((distX / distTotal) * velocityModTotal));
                velocityModifierY = (Math.abs((distY / distTotal) * velocityModTotal));


                if (distX < 0){
                    velocityModifierX = -1 * velocityModifierX;
                }else if (distX == 0){
                    velocityModifierY = velocityModTotal;
                }

                if (distY < 0){
                    velocityModifierY = -1 * velocityModifierY;
                }else if (distY == 0){
                    velocityModifierX = velocityModTotal;
                }

                p.velocityX += velocityModifierX;
                p.velocityY += velocityModifierY;

            }
        }
    }
};

var OrbiterTree = new Quadtree({
    locationX: Orbiter.locationX,
    locationY: Orbiter.locationY,
    width: 50,
    height: 50
});

Particles = [];
for (var i = 0; i < numParticles; i++){
    
    var particle = {
        locationX: Math.round(Math.random() * 1000), 
        locationY: Math.round(Math.random() * 1000),
        velocityX: (Math.random() * 2) - 1,
        velocityY: (Math.random() * 2) - 1}
    
    Particles.push(particle);
    OrbiterTree.insert(particle);

}


//loop that repeatedly calls draw()
var recursiveAnimation = function() {
    
    var orbitingParticles = OrbiterTree.retrieve({
        
        x: Orbiter.locationX,
        y: Orbiter.locationY,
        width: Orbiter.radius,
        height: Orbiter.radius
    }); 
    
    Orbiter.checkOrbit(orbitingParticles);
    draw();
    
    window.requestAnimationFrame(recursiveAnimation);
}

window.requestAnimationFrame(recursiveAnimation);

function draw(){
    
    //clear Canvas between frames
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.fillStyle = "#FFFFFF";
    for (var index in Particles){
    
        var particle = Particles[index];
        
        //Set a new x&y coordinate based on the individual particle's x&y velocity
        particle.locationX = particle.locationX + particle.velocityX;
        particle.locationY = particle.locationY + particle.velocityY;
        
        ctx.fillRect(particle.locationX, particle.locationY, 1, 1);
        
    }

}
