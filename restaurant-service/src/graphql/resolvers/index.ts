import {restaurantsResolvers} from "./restaurantsResolvers";
import {paginationResolvers} from "./paginationResolvers";

const resolvers = [restaurantsResolvers, paginationResolvers];

module.exports = {
    resolvers,
};
