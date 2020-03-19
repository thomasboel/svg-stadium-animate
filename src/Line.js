import React from 'react';

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
