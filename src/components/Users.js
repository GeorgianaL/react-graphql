import React, { Component } from 'react';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';

const getUsersQuery = gql`
  {
    users {
      id
      name
      username
    }
  }
`;

class Users extends Component {
  constructor(props) {
    super(props);
  }

  displayUsers() {
      const { data } = this.props;
      if (data.loading) {
        return (<h3>Loading users...</h3>)
      } else {
        return data.users.map((user) => {
          return (
            <li key={user.id}>
              {user.name} - {user.username}
            </li>
          );
        })
      }
  }

  render() {
    return (
      <div>
        <ul>
          { this.displayUsers() }
        </ul>
      </div>
    );
  }
}

export default graphql(getUsersQuery)(Users);
