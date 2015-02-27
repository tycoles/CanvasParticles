//Set up Canvas and Canvas context
var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");
//Set the number of particles that should be spawned
var numParticles = 30000;

/*Create particle array and push anonymous particle objects
  on to the array*/
Particles = [];
for (var i = 0; i < numParticles; i++){

    Particles.push({
        locationX: Math.round(Math.random() * 1000), 
        locationY: Math.round(Math.random() * 1000),
        velocityX: (Math.random() * 2) - 1,
        velocityY: (Math.random() * 2) - 1});

}

//loop that repeatedly calls draw()
var recursiveAnimation = function() {
    
    draw();
    window.requestAnimationFrame(recursiveAnimation);

}

window.requestAnimationFrame(recursiveAnimation);

function draw(){
    
    //clear Canvas between frames
    ctx.clearRect(0, 0, c.width, c.height);
    
    for (var index in Particles){
    
        var particle = Particles[index];
        
        //Set a new x&y coordinate based on the individual particle's x&y velocity
        particle.locationX = particle.locationX - particle.velocityX;
        particle.locationY = particle.locationY - particle.velocityY;
        
        ctx.fillRect(particle.locationX, particle.locationY, 1, 1);
        
    }

}
