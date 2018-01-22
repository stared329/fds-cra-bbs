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
        this.getUserInfo(user.uid);
        this.fetchArticles();
        // this.changeState('list', user.uid);
      } else {
        this.changeState('login');
      }
    });
  }

  getUserInfo = async (uid) => {
    const userInfo = await firebase.database().ref('users/'+uid).once('value');
    const userNickname = ("nickname" in userInfo.val())?userInfo.val().nickname:userInfo.val().username;
    this.changeState('list');
    this.setState({uid: uid, nickname:userNickname});
  }

  getNickNameByUserId = async (uid) => {
    const info = await firebase.database().ref('users/'+uid).once('value');
    const nickname = info.val().nickname;
    return nickname;
  }

  changeState = (newPage) => {
    this.setState(prevState => {
      return {
        page: newPage
      };
    });
  }

  saveNickName = async nickname => {
    await firebase.database().ref('users/'+this.state.uid).update({
      nickname: nickname
    });
    this.setState({
      nickname: nickname
    });
    this.changeState('list');
  }

  fetchArticles = async () => {
    const snapshot = await firebase.database().ref('articles').once('value');
    const articlesObj = snapshot.val();
    let articles = null;
    if(articlesObj != null)
    {
      articles = Object.entries(articlesObj).map(([articleId, articleItem]) => {
        return {
          ...articleItem,
          articleId
        }
      });
      const uidSet = new Set(articles.map(({uid}) => uid));
      const uidObj = {};
      const ps = Array.from(uidSet).map(async uid => {
        const snapshot = await firebase.database().ref('users/' + uid).once('value');
        const nickName = snapshot.val();
        return [uid, nickName];
      });
      const pairArr = await Promise.all(ps);
      for(const obj of pairArr){
        uidObj[obj[0]] = obj[1]['nickname'];
      }
      articles.forEach(article => {
        article.author = uidObj[article.uid];
      });
    }
    this.setState({ articles });
  }

  render() {
    const { nickname, uid, articles} = this.state;
    return (
      <div>
        {
          this.state.page === 'login'
          ? <Login />
          : this.state.page === 'list'
          ? <Article
            nickname={nickname || uid}
            articleArr={articles}
            onUserInfoClick={this.changeState}/>
          : this.state.page === 'loading'
          ? <CheckLoginState />
          : this.state.page === 'editinfo'
          ? <Account
            nickname={nickname || uid}
            onNickNameClick={this.changeState}
            onNickNameSubmit={this.saveNickName}/>
          : null
        }
      </div>
    )
  }
}
