import React from 'react';

const Arc = ({centerPos, radius, show, isAnimating, stepProgress, stepOffset, leftCircle=false, color}) => {
  let offsetRadius = radius - 1;
  let circumfrence = 2 * Math.PI * offsetRadius;
  let strokeDashoffset = isAnimating ? 
    leftCircle ?
    offsetRadius/2*Math.PI + (stepProgress-stepOffset)
    : offsetRadius/2*Math.PI - (stepProgress-stepOffset) 
  : offsetRadius/2*Math.PI;

  return (
    show ? <circle 
      stroke={isAnimating ? "#FFF" : color}
      strokeWidth={isAnimating ? "2" : 1}
      fill="none"
      strokeDasharray={[circumfrence/2, circumfrence/2]} 
      strokeDashoffset={leftCircle ? -strokeDashoffset : strokeDashoffset}
      cx={centerPos.x} 
      cy={centerPos.y} 
      r={offsetRadius}
    /> : null
  );
}

export default Arc;
