# Exercise Tracker

This is an exercise tracker REST API project part of the freeCodeCamp 'Back End Development and APIs' certification process.

## Technologies

* **Node.js** with **Express** - server and route handling.
* **MongoDB** with **Mongoose** - user and exercise validation, storage and lookup.

## Usage

### Development

Make sure to set up your `.env` file with your `MONGO_URI` and `PORT`. Afterwards, you can run in the terminal:

`npm run setup` - for setting up dependencies and starting the server

### Service Preview

![chrome_VXbGDMCDu9](https://user-images.githubusercontent.com/117132555/231838403-1936bf97-c939-4d5a-a98d-5f9ed07c7651.png)

* First step is creating a new user. Adding exercises and checking logs is not possible without a valid `_id`. Endpoint is `POST /api/users`
* Second step is adding a new exercise to the created user. The duration field only allows for numeric input, and the date will default to the current date if left empty or is given an invalid input. Endpoint is `POST /api/users/:_id/exercises`
* Exercise logs can be checked via the third form. The `from`, `to` and `limit` fields are optional log filters. Endpoint is `GET /api/users/:_id/logs?[optional_filters]`
* A list of all users can be accessed via its corresponding button. Endpoint is `GET /api/users`
