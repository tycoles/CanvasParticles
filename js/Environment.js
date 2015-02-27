var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");

Particles = [];

for (var i = 0; i < 1000; i++){

    Particles.push({locationx: Math.round(Math.random() * 1000), locationy: Math.round(Math.random() * 1000)});

}


draw();

function draw(){

    for (var index in Particles){
    
        var particle = Particles[index];
        
        ctx.fillRect(particle.locationx, particle.locationy, 1, 1);
    
    }

}
