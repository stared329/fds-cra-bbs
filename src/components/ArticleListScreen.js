import React, { Component } from 'react';
import NavBar from './NavBar';
import { Table } from 'semantic-ui-react'
import styled from 'styled-components';

const ArticleItemRow = styled(Table.Row)`
  &:hover {
    cursor: pointer;
    background-color: #00c4cc .8;
  }
`;

export default class Article extends Component {
  render(){
    const { nickname, onUserInfoClick, articleArr } = this.props;
    return (
      <div>
        <NavBar nickname={nickname} onUserInfoClick={onUserInfoClick}/>
        {Array.isArray(articleArr) && articleArr.length > 0
        ? <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>author</Table.HeaderCell>
              <Table.HeaderCell>title</Table.HeaderCell>
              <Table.HeaderCell>created at</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              articleArr.map(({ articleId, title, author, createdAt }) => (
                <ArticleItemRow key={articleId}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                </ArticleItemRow>
              ))
            }
          </Table.Body>
        </Table>
        : '게시글이 없습니다.'
        }
      </div>
    )
  }
}
