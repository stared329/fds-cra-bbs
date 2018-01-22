import React, { Component } from 'react';
import NavBar from './NavBar';
import { Table } from 'semantic-ui-react'
import styled from 'styled-components';

export default class ArticleScreen extends Component{
  render() {
    const { title, content, nickname, onUserInfoClick } = this.props;
    return (
      <div>
        <NavBar nickname={nickname} onUserInfoClick={onUserInfoClick} />
        <div>{title}</div>
        <div>{content}</div>
      </div>
    )
  }
}
