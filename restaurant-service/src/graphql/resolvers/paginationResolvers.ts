import {PaginationModel} from "../models/PaginationModel";

// A resolver is a function that's responsible for populating the data for a single field in your schema
// It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.
export const paginationResolvers = {
    Query: {
        pagination: async (_parent: any, _args: any, _context: any, _info: any) => {
            return PaginationModel.getPagination(_args);
        }
    },
};




