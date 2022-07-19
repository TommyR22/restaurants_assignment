import { gql } from 'apollo-server-express';

// This "pagination" type
export const paginationType = gql`
  type Pagination {
    total: Int
    pageCount: Int
    currentPage: Int
  }
`;

