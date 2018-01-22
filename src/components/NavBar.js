import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const Wrap = styled.nav`
  align-itmes: center;
  background: #00c4cc;
  background-image: linear-gradient(139deg, #00C4CC 0%, #7D2AE8 100%);
  display: flex;
  padding: 15px 30px;
`
const InnerLeft = styled.div`
  color: white;
  flex-grow: 1;
  font-size: 2em;
  font-weight: 600;
  align-self: center;
`

const Btn = styled.button`
  background-color: #fff;
  border: 0px;
  border-radius: 7px;
  color: #3f4652;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  padding: 0.75em 1.5em;
  text-align: center;
`

const UserInfo = styled.a`
  cursor:pointer;
  color: white;
  font-size: 14px;
  align-self: center;
  padding: 0 20px;
`

export default class NavBar extends Component{
  handleLogoutClick = () => {
    firebase.auth().signOut();
  }
  handleNickNameClick = e => {
    this.props.onUserInfoClick('editinfo', this.props.uid);
  }

  render() {
    return (
      <Wrap>
        <InnerLeft>BBS</InnerLeft>
        <UserInfo onClick={this.handleNickNameClick}>{this.props.nickname}</UserInfo>
        <Btn onClick={this.handleLogoutClick}>Logout</Btn>
      </Wrap>
    )
  }
}
