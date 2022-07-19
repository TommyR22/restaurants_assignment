import axios from "axios";
import {Restaurant} from "../data/Restaurant";
const knex = require('../../../knexfile');
const config = require('config');

export class RestaurantModel {
    static async all() {
        return await knex('restaurant')
    }

    static async getRestaurants(_args: any) {
        const {limit, offset, name, onlyImage} = _args;
        // get images from image-service
        const responseImages = await axios.get(`${config.get('imageService.url')}:${config.get('imageService.port')}${config.get('imageService.endpoints.images')}`); // inside docker-compose network app can see each other by service name
        // query
        const responseQuery = await knex('restaurant')
            .leftJoin('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
            .leftJoin('country', 'restaurant.country_code', 'country.country_code')
            .columns(['restaurant.*',
                'restaurant_has_image.image_uuid',
                'country.locales'])
            .where((builder: any) => {
                if (name) {
                    builder.where('name', 'ilike', `%${name}%`); // i = insensitive-case
                }
                if (onlyImage) {
                    builder.whereNotNull('image_uuid');
                }
            })
            .limit(limit)
            .offset(offset)

        // format output
        const array: Restaurant[] = [];
        // Map images from image-service to create a complexity o(n) instead o(n*n)
        let imagesMap = new Map<string, string[]>();
        (responseImages.data.images).forEach((image: any) => {
            if (imagesMap.get(image.imageUuid)) {
                const array = imagesMap.get(image.imageUuid);
                if (array) {
                    array.push(image.url)
                    imagesMap.set(image.imageUuid, array);
                }
            } else {
                imagesMap.set(image.imageUuid, [image.url]);
            }
        })
        // loop restaurants
        responseQuery.forEach((item: any) => {
            let allowReview = false;
            // check allowReview for FR restaurant
            if (item.country_code === 'FR') {
                allowReview = true;
            }
            // set restaurant obj
            const restaurant = new Restaurant(
                item.restaurant_uuid,
                item.name,
                item.country_code,
                item.locales,
                imagesMap.get(item.image_uuid),
                allowReview);
            array.push(restaurant);
        })
        // console.log(responseImages.data);
        // console.log(responseQuery);
        return array;
    }
}
