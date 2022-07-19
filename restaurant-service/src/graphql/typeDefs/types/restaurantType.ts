import { gql } from 'apollo-server-express';

// This "Restaurant" type defines the queryable fields for every restaurant in data source.
export const restaurantType = gql`
  type Restaurant {
    restaurantUuid: ID
    name: String
    country: Country
    images: [String]
    allowReview: Boolean
  }
  
  type Country {
    code: String
    locales: [String]
  }
  
`;

