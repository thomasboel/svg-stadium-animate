import React from 'react';

const Arc = ({centerPos, radius, show, isAnimating, stepProgress, stepOffset, leftCircle=false, color}) => {
  // Because the entire component is shifted 1 pixel downwards, we need to subtract 1 from the radius.
  let offsetRadius = radius - 1;
  // Circle cirumfrence
  let circumfrence = 2 * Math.PI * offsetRadius;
  // The way we animate is shift the offset of the stroke dashes.
  // If it's a left circle we take 1/4th of the circle circumfrence and add the step progress minus the step offset
  // If it's a right circle we subtract the step progress minus the step offset
  // Else just show the 1/4th which then becomes just the half circle.
  let strokeDashoffset = isAnimating ? 
    leftCircle ?
    circumfrence/4 + (stepProgress-stepOffset)
    : circumfrence/4 - (stepProgress-stepOffset) 
  : circumfrence/4;

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
