import React, { Component } from 'react';
import NavBar from './NavBar';

export default class Article extends Component {
  render(){
    const { nickname, onUserInfoClick} = this.props;
    return (
      <div>
        <NavBar nickname={nickname} onUserInfoClick={onUserInfoClick}/>
        article list
      </div>
    )
  }
}
