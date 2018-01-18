import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class BBS extends Component {
  //lifecycle hook
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBByZ9TvPx7pOahDbGl4lkS7Apx1lV1z3Y",
      authDomain: "fds-cra-bbs.firebaseapp.com",
      databaseURL: "https://fds-cra-bbs.firebaseio.com",
      projectId: "fds-cra-bbs",
      storageBucket: "",
      messagingSenderId: "281741899963"
    };
    firebase.initializeApp(config);
  }
    render() {
      return (
        <div>BBS</div>
      )
    }
}
