function checkOrbit(Particles){

    for (var index in Particles) {
        
        var p = Particles[index];
        var distX = this.locationX - p.locationX;
        var distY = this.locationY - p.locationY;
        
        var distTotal = Math.sqrt(Math.abs(distX * distX) + Math.abs(distY * distY);
        absoluteX = Math.abs(distX);
        absoluteY = Math.abs(distY);
        
        //redo this logic based on the particle's velocity history
        if ((absoluteX == 0) && (absoluteY == 0)) {
            absoluteX = 1;
            absoluteY = 1;
        }
        
        if (totalDist <= this.radius){
            
            velocityModTotal = (1 / Math.sqrt(Math.abs(totalDist)) * this.gravity);
            velocityModifierX = (Math.abs((distX / distTotal) * velocityModifier);
            velocityModifierY = (Math.abs((distY / distTotal) * velocityModifier);
            
            
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