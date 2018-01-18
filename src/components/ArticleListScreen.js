import React, { Component } from 'react';
import NavBar from './NavBar';

export default class Article extends Component {
  render(){
    const { uid, onUserInfoClick} = this.props;
    return (
      <div>
        <NavBar uid={uid} onUserInfoClick={onUserInfoClick}/>
        article list
      </div>
    )
  }
}
