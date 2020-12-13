import React from 'react';
import styled from 'styled-components';
import logo from '../images/charity.jpg';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 5em;
  font-size: 30px;
`;

export const Home = (props) => (
  <div>
  <img src={logo} alt="image"/>
    <GridWrapper>
    <p>Around 200 natural disasters were recorded in the beginning of 2020 this includes Covid, California wildfire and hurricanes.</p>
    <p>So, our team has decided to create a platform for customers to contribute (donate) to approved charitable institutions.</p>
    </GridWrapper>
  </div>
  )