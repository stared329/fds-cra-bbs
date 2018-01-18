import React, { Component } from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #00c4cc;
  background-image: linear-gradient(139deg, #00C4CC 0%, #7D2AE8 100%);
  color: white;
  padding: 50%;
  font-size: 24px;
`
export default class CheckLoginState extends Component {
  render() {
    return (
      <Loading>Loading...</Loading>
    )
  }
}
