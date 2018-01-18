import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class Login extends Component{
  handleLoginClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log(token, user);
    })
  }
  render() {
    return (
      <button onClick={this.handleLoginClick}>구글로 로그인</button>
    )
  }
}
