export class Restaurant {
    restaurantUuid: string;
    name: string;
    country: Country;
    images: string[] | undefined;
    allowReview: boolean;

    constructor(restaurantUuid: string, name: string, countryCode: string, locales: string[], images: string[] | undefined, allowReview: boolean) {
        this.restaurantUuid = restaurantUuid;
        this.name = name;
        this.country = new Country(countryCode, locales);
        this.images = images;
        this.allowReview = allowReview;
    }
}

export class Country {
    code: string;
    locales: string[];

    constructor(code: string, locales: string[]) {
        this.code = code;
        this.locales = locales;
    }
}

