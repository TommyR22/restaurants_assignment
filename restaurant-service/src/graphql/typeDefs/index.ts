import {query} from "./query";
import {restaurantType} from "./types/restaurantType";
import {paginationType} from "./types/paginationType";

const typeDefs = [query, restaurantType, paginationType];

module.exports = {
    typeDefs,
};
