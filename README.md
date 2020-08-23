# Event admin

A simple single-page app for event administration.

The point of this project is to demonstrate my programming habits and show styling (CSS) skills.

## Requirements set by author

**Functional**
 - simple, minimalistic
 - add button that opens modal with create event form
 - events represented as cards in grid
 - each event card contains button for edit and delete
 - edit button opens same modal with form as add button
 - date from can't be set after date to and vice versa
 - optional event description
 - events sorted by date from
 - past events visually different from future events

**Non functional**
 - as little code as possible
 - good testability, high test coverage whenever it makes sense
 - enforced code style
 - dev server with hot reload for convenient development
 - no passing props through more than one nested react component
 - easy build and development environment setup

## Compiling and starting the app

The only prerequisite is [NodeJS 12+](https://nodejs.org/) installed.

To compile the application run:

    npm install
    npm run build
    
Then open `dist/index.html` in your favourite browser. The app has been tested Firefox and Chrome.

## Development

We use webpack to build the app. To use webpack dev server for live hot reloading, run:

    npm run start:dev 

Then open http://localhost:8080 in a browser of your choice.

To run all tests execute the following command:

    npm tets

To run lint use this command

    npm run lint

To run lint with automatic problem fixing run

    npm run lint -- --fix
