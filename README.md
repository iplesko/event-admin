# Event admin

A simple single-page app for event administration.

The point of this project is to demonstrate my programming habits and show styling (CSS) skills.

## Compiling and starting the app

The only required prerequisite is [NodeJS 12+](https://nodejs.org/) installed.

To compile the application run:

    npm install
    npm run build
    
Then open `dist/index.html` in your favourite browser. The app hasn't been tested in Internet Explorer.

## Development

We use webpack to build the app. To use webpack dev server for live hot reloading, run:

    npm run start:dev 

Then open http://localhost:8080 in a browser of your choice.

To run all tests execute the following command:

    npm run tets

To run lint use this command. Drop the `--fix` parameter if automatic fix is not desired.

    npm run lint --fix
