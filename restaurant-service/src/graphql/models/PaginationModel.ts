import {Pagination} from "../data/Pagination";
const knex = require('../../../knexfile');

export class PaginationModel {
    static async getPagination(_args: any) {
        const {limit, offset, name, onlyImage} = _args;

        const responseQuery = await knex('restaurant')
            .leftJoin('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
            .leftJoin('country', 'restaurant.country_code', 'country.country_code')
            .where((builder: any) => {
                if (name) {
                    builder.where('name', 'ilike', `%${name}%`); // i = insensitive-case .where('name', 'ilike', `%${name}%`)
                }
                if (onlyImage) {
                    builder.whereNotNull('image_uuid');
                }
            })
            .limit(limit)
            .offset(offset)
            .count('* as count')
            .first()

        const p = new Pagination();
        p.total = responseQuery.count;
        p.currentPage = (Math.floor(offset / limit) + 1);
        p.pageCount = (Math.ceil(p.total / limit));
        return p;
    }
}

