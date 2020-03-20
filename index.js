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

/**
 * @param {any} id
 * @param {{ width: Integer, height: Integer }} dimensions
 * @param {String} title
 * @param {Function} handleOnPress
 * @param {Integer} progress 0-100
 * @param {hexValue} color stroke color
 * @param {any} style provide any of your own styles to the wrapper
 */
const Filter = ({id, dimensions, title, handleOnPress, progress, color="#000", style=null}) => {
  /*
    p1, p2, p3 and p4 are the 4 points that make up the start end end positions of the two lines.
    Image for reference: https://gyazo.com/3f81da177ca1f8fd3750f856c1a7553f
  */
  let p1 = { x: dimensions.height/2, y: 1 };
  let p2 = { x: dimensions.width - dimensions.height/2, y: 1 }
  let p3 = { x: dimensions.height/2 , y: dimensions.height-1 };
  let p4 = { x: dimensions.width - dimensions.height/2, y: dimensions.height-1 };
  
  // Circle Circumfrence Formula
  let cc = 2 * Math.PI * (dimensions.height/2);

  // Circumfrence of the Arc (Half Circle)
  let c = cc / 2;
  // Length of a single Line
  let l = dimensions.width - dimensions.height;
  // The total circumfrence of the entire Component
  let totalC = c*2 + l*2;
  
  /*
    The stepProgress tells the component how much of itself to render.
    So with a progress of 47, 47% of the component is rendered.
    This calculation is as simple as multiplying the total circumfrence with the progress in decimal format.
  */
  const stepProgress = totalC * (progress / 100);

  /*
    Prop Definitions:

    show:         Boolean;  
      Tells the component when to be shown

    isAnimating:  Boolean;  
      Tells the component when to be animating

    stepProgress: Float;    
      The stepProgress

    stepOffset:   Float;    
      This is equal to the stepProgress already covered/drawn.
      So for the first half circle, the top line has already been drawn.
      This means that the offset would be the length of that line (l).
    
    color:        String;
      The stroke color for the Component.
    
    ===== Arcs =====
    
    centerPos:    { x: xPos, y: yPos };
      The center position of the circle, this is C1 and C2 on the image (https://gyazo.com/3f81da177ca1f8fd3750f856c1a7553f)

    radius:       Float;
      The circle radius.

  */
  return (    
    <div style={style} onClick={() => handleOnPress(id)}>
      <svg height={dimensions.height} width={dimensions.width}>
        <Arc 
          centerPos={{ x: p2.x, y: dimensions.height/2 }} 
          show={stepProgress > l} 
          radius={dimensions.height/2} 
          color={color}
        />
        <Arc 
          centerPos={{ x: p2.x, y: dimensions.height/2 }} 
          show={stepProgress > l && stepProgress < l+c} 
          radius={dimensions.height/2} 
          isAnimating={stepProgress > l && stepProgress < l+c}
          stepProgress={stepProgress}
          stepOffset={l}
          color={color}
        />
        <Arc 
          centerPos={{ x: p1.x, y: dimensions.height/2 }} 
          show={stepProgress > l+c+l} 
          radius={dimensions.height/2} 
          leftCircle={true}
          color={color}
        />
        <Arc 
          centerPos={{ x: p1.x, y: dimensions.height/2 }} 
          show={stepProgress > l+c+l && stepProgress < totalC} 
          radius={dimensions.height/2} 
          isAnimating={stepProgress > l+c+l && stepProgress < totalC}
          stepProgress={stepProgress}
          stepOffset={l+c+l}
          leftCircle={true}
          color={color}
        />
        <Line 
          p1={p1} p2={p2} 
          show={stepProgress > 0} 
          isAnimating={stepProgress > 0 && stepProgress < l} 
          stepProgress={stepProgress} 
          stepOffset={0} 
          color={color}
        />
        <Line 
          p1={p4} p2={p3} 
          show={stepProgress > l+c} 
          isAnimating={stepProgress > l+c && stepProgress < l+l+c} 
          stepProgress={stepProgress} 
          stepOffset={l+c} 
          animateLeft={true} 
          color={color}
        />
        {progress > 0 && <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill={color} fontFamily="Roboto" fontWeight="300" fontSize="15px">{title}</text>}
      </svg>
    </div>
  );
}

module.exports = Filter;
