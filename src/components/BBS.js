import React, {Component} from 'react';
import * as firebase from 'firebase';
import Login from './LoginScreen';
import Article from './ArticleListScreen';
import CheckLoginState from './LoginChecking';
import Account from './AccountScreen';

export default class BBS extends Component {
  state = {
    page: 'login'
  }
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
    this.changeState('loading');

    //callback에 function을 사용할 경우 this 문제가 발생할 수 있음. 화살표 함수 사용할 것
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //logged in
        this.changeState('list', user.uid);
      } else {
        this.changeState('login');
      }
    });
  }

  changeState = (newPage, uid) => {
    this.setState(prevState => {
      return {
        page: newPage,
        uid: uid
      };
    });
  }

  render() {
    return (
      <div>
        {
          this.state.page === 'login'
          ? <Login />
          : this.state.page === 'list'
          ? <Article uid={this.state.uid} onUserInfoClick={this.changeState}/>
          : this.state.page === 'loading'
          ? <CheckLoginState />
          : this.state.page === 'editinfo'
          ? <Account />
          : null
        }
      </div>
    )
  }
}
