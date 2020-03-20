import React from 'react';
import styled from 'styled-components';
import Line from './Line';
import Arc from './Arc';

const Wrapper = styled.div`
  margin: 0px 6px 10px 0px;
  
  &:hover {
    cursor: pointer;
  }
`;

const Filter = ({id, dimensions, title, handleOnPress, progress, color="#000", fill="transparent"}) => {
  let p1 = { x: dimensions.height/2, y: 1 };
  let p2 = { x: dimensions.width - dimensions.height/2, y: 1 }
  let p3 = { x: dimensions.height/2 , y: dimensions.height-1 };
  let p4 = { x: dimensions.width - dimensions.height/2, y: dimensions.height-1 };
  
  let cc = 2 * Math.PI * (dimensions.height/2);
  let c = cc / 2;
  let l = dimensions.width - dimensions.height;
  let totalC = c*2 + l*2;

  const stepProgress = totalC * (progress / 100);

  return (    
    <Wrapper onClick={() => handleOnPress(id)}>
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
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill={color} fontFamily="Roboto" fontWeight="300" fontSize="15px">{title}</text>
      </svg>
    </Wrapper>
  );
}

export default Filter;
