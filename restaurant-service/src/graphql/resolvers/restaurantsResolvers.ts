// A resolver is a function that's responsible for populating the data for a single field in your schema
// It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.
import {RestaurantModel} from "../models/RestaurantModel";

export const restaurantsResolvers = {
    Query: {
        restaurantList: () => RestaurantModel.all(),
        restaurants: (_parent: any, _args: any, _context: any, _info: any) => {
            return RestaurantModel.getRestaurants(_args);
        }
    },
};
