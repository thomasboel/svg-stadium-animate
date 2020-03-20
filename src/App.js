import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Filter from './Filter';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 350px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 50px;
  background-color: #099fda;
`;

const category1 = [
  { id: 1, title: "Tile 1", dimensions: { width: "100", height: "32" } },
  { id: 2, title: "Tile 2", dimensions: { width: "125", height: "32" } },
  { id: 3, title: "Tile 3", dimensions: { width: "90", height: "32" } },
  { id: 4, title: "Tile 4", dimensions: { width: "180", height: "32" } },
  { id: 5, title: "Tile 5", dimensions: { width: "110", height: "32" } },
];

const category2 = [
  { id: 6, title: "Tile 1", dimensions: { width: "80", height: "32" } },
  { id: 7, title: "Tile 2", dimensions: { width: "92", height: "32" } },
  { id: 8, title: "Tile 3", dimensions: { width: "90", height: "32" } },
  { id: 9, title: "Tile 4", dimensions: { width: "100", height: "32" } },
  { id: 10, title: "Tile 5", dimensions: { width: "85", height: "32" } },
];

/*
  Note to any programmer. The implementation of the module in this file is far from perfect.
  The idea would probably be to have some sort of array that stores the current progress of the individual Filter component.
  That way you can show some and hide others, perhaps even conditionally render them so the Components will also move around in your container.

  Note that the title is not animated as of yet, not sure if it should be tho.
*/

function App() {

  const blue = "#009fda";
  const yellow = "#eaab00";

  const [progress, setProgress] = useState(0);
  let animationSpeed = 1;
  
  let flag = false;
  
  setInterval(() => {
    if (!flag && progress < 100) {
      setProgress(progress + 1);
      flag = true;
    } 
  }, animationSpeed);

  return (
    <div className="App">
      <h1 >
        RWE Filter Animation Prototype
      </h1>

      <h3 style={{ color: blue }}>
        Category 1
      </h3>

      <FlexColumn>
        <FlexRow>
          {category1.map((filter, index) => (
            <Filter 
              key={index}
              id={filter.id}
              dimensions={filter.dimensions}
              title={filter.title}
              progress={progress}
              handleOnPress={(id) => {}}
              color={blue}
            />
          ))}
        </FlexRow>
      </FlexColumn>

      <h3 style={{ color: yellow }}>
        Category 2
      </h3>

      <FlexColumn>
        <FlexRow>
          {category2.map((filter, index) => (
            <Filter 
              key={index}
              id={filter.id}
              dimensions={filter.dimensions}
              title={filter.title}
              progress={progress}
              handleOnPress={(id) => {}}
              color={yellow}
            />
          ))}
        </FlexRow>
      </FlexColumn>
    </div>
  );
}

export default App;
