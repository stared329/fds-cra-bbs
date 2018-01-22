import React, {Component} from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const Input = styled.input`
  font-size: 14px;
  font-color: red;
  line-height: 20px;
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
export default class AccountScreen extends Component{
  handleSubmit = e => {
    e.preventDefault();
    const nickName = e.target.elements.nickName.value;
    this.props.onNickNameSubmit(nickName);
  }
  render() {
    const {nickname, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickname={nickname} onUserInfoClick={onNickNameClick} />
        <form onSubmit={this.handleSubmit}>
          <Input type="text" name="nickName"/>
          <Btn type="submit">Save</Btn>
        </form>
      </div>
    )
  }
}
