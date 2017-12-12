# Silicon Valley Web App
This project is a small web app that displays json data returned by the bundled api (in the server folder). The project has been bootstrapped using create-react-app.
this project is a small RESTFUL API that returns json data corresponding to all episodes of the show silicon valley, optionally filtered by season.

## Installation
- to run the client you must first install node.js. The node package manager npm should be installed automatically as part of this.
- Once installed, in the root of the project directory execute: npm install. This should install all project dependencies locally, in the node_modules folder.

## Starting the client
- to run the client, in the root directorty execute: npm start
- You can now access the client in your browser at port 3000.

## Running the test suite
to run tests, in the root directory execute: npm test

## Extensions
 As time was limited for this task, various corners were cut in the name of speed:
- lack of semantic markup.
- refactoring the call to the server api into its own endpoint
- add a loader while the api data loads. 
- Only one test (took some time to get testing working): in order to test the part of the app making the api request need to use something like https://www.npmjs.com/package/jest-fetch-mock to mock the fetch requests.
- hard coded localhost proxy in package.json. 
- browser testing: only tested in firefox and chrome. 