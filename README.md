# example Docker + GraphQL (NodeJs) + PostgreSQL + Angular

## Goal
Creation of a graphql API in NodeJS.

## Run
```docker-compose up```


## Context
The purpose of this project is to create a simple graphQL API in charge of exposing Restaurant information fetched from an external service (`image-service`) and from a local database.

### Infrastructure
Infrastructure is available in the [docker-compose file](./docker-compose.yml) and composed as follow:
 - a NodeJs GraphQL micro-service ([restaurant-service](./restaurant-service)) You can use the playground to test it http://localhost:3000/graphql
 - a PostgreSQL database
 - a REST micro-service ([image-service](./image-service))
 - an Angular web application micro-service ([web-service](./web-service))

### Database

Database tables are created through migrations and the database is populated with test data through seeds (you don't need to modify migrations and seed directories)

> - restaurant (restaurant_uuid, name, country_code)
> - restaurant_has_images (restaurant_uuid, image_uuid)
> - country (country_code, locales) - (locales is an psql array of texts)


### Image service (DO NOT EDIT THIS PROJECT)
This service is exposing 2 endpoints:
- `GET /images` returning all images (no filter)

Expected response:
```json
{
    "images": [
        {
            "imageUuid": "imageUuid",
            "url": "url"
        }
    ]
}
```

Important information:
 - **This endpoint must NOT be modified** (even if it's badly designed)
 - This project has no database. Data are persisted in memory only. Every server restart will reset everything.

## TASKS

### Create a graphQL query
Create a graphQL query returning restaurant information.

Response must be paginated (set a default value if none is provided) and optionnaly filtered by:
 - the restaurant name
 - with images only (i.e. return only restaurants having images. By default, all restaurants are returned)

The field "allowReview" is not stored anywhere. It must be computed "on the fly" and set to true for french restaurants only.

Expected response:
```json
{
  "restaurants": [
      {
          "restaurantUuid": "restaurantUuid",
          "name": "name",
          "country": {
              "code": "code",
              "locales": ["fr_FR"]
          },
          "images": [ "http://image.url" ],
          "allowReview": true
      }
  ],
  "pagination": {
      "total": 1,
      "pageCount": 1,
      "currentPage": 1
  }
}
```

### Notes
Query:
```json
query GetRestaurants($limit: Int! = 5, $offset: Int! = 0, $name: String, $onlyImage: Boolean = false) {
    restaurants(limit: $limit, offset: $offset, name: $name, onlyImage: $onlyImage) {
        restaurantUuid
        name
        allowReview
        images
        country {
            code
            locales
        }
  }
    pagination(limit: $limit, offset: $offset, name: $name, onlyImage: $onlyImage) {
        total
        pageCount
        currentPage
        }
  }
```

- added image-service configurations on `./restaurant-service/config/default.json`
- added models, data, resolver, typeDefs Graphql on `./restaurant-service/src/graphql`
- added an Angular app example (see Infrastructure section) to query the restaurants (use ENTER to send filters). Page is showed at `http://localhost:4200` (for further info see [README](./web-service/README.md))
- I don't understand well the pagination logic, so I've used the simple offset based strategy.
- Due to nature of the output expected, I did the same query two times (bad practice). One for `restaurants` and one for `pagination` object to retrieve total elements.

Tip - to check tables on docker:
```
docker exec -it code-postgres-1 /bin/bash
psql -U postgres
\c thefork
\dt
SELECT * FROM "country";
```

#### Improvements
- [Front-end / Back-end] Testing: unit and e2e on Front-end side and Back-end side.
- [Front-end] lazy loading restaurants with **IntersectionObserver**.
- [Back-end] create an interface (or aliases) between postgres data and graphql output data.
- [Back-end] cursor based pagination integration.
- [Back-end] Optimize query.
