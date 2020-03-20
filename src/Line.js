import React from 'react';

/*
  The line animation is quite simple. Move to p1 and draw to p2.
  When animating, draw to p2.x - the stepProgress and the previously covered steps (the step offset)
*/
const Line = ({p1, p2, show, animateLeft=false, isAnimating, stepProgress, stepOffset, color}) => {  
  return (    
    show ? <path 
      stroke={color} 
      strokeWidth="1" 
      fill="none" 
      d={`
        M ${p1.x},${p1.y} 
        L ${isAnimating ? animateLeft ? p1.x - (stepProgress-stepOffset) : p1.x + (stepProgress-stepOffset) : p2.x},${p2.y}
      `} 
    /> : null
  );
}

export default Line;
