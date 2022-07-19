import {ApolloServer} from "apollo-server-express";

const { typeDefs } = require("./../graphql/typeDefs");
const { resolvers } = require("./../graphql/resolvers");

it('returns hello with the provided name', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    const result = await testServer.executeOperation({
        query: `
        query GetRestaurants {
          restaurantList {
            restaurantUuid
            name
            allowReview
            images
            country {
              code
              locales
            }
          }
        }
        `
        // variables: { name: 'cafe' },
    });
    expect(result.errors).toBeUndefined();
    expect(result.data?.restaurantList).toBeDefined();
});
