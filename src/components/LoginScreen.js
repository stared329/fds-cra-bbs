import React, {Component} from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';

const Wrap = styled.nav`
  display:flex;
  background: #00c4cc;
  background-image: linear-gradient(139deg, #00C4CC 0%, #7D2AE8 100%);
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  align-items: center;
  justify-content: center;
`
const Btn = styled.button`
  background-color: #fff;
  border: 0px;
  border-radius: 7px;
  color: #3f4652;
  cursor: pointer;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  padding: 0.75em 1.5em;
  text-align: center;
`
export default class Login extends Component{
  handleLoginClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    this.writeUserData(result.user.uid, result.user.displayName);
  }

  writeUserData = async (userId, name) => {
    await firebase.database().ref('users/' + userId).update({
      username: name
    });
  }

  render() {
    return (
      <Wrap>
        <Btn onClick={this.handleLoginClick}>Login with Google</Btn>
      </Wrap>
    )
  }
}
