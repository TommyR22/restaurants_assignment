import { gql } from 'apollo-server-express';

// Defines entry point for READ operations
export const query = gql`
  type Query {
    restaurantList: [Restaurant]
    restaurants(limit: Int, offset: Int, name: String, onlyImage: Boolean = false): [Restaurant]
    pagination(limit: Int, offset: Int, name: String, onlyImage: Boolean = false): Pagination
  }
`;

module.exports = {
    query,
};
