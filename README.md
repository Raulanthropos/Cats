# Code Challenge - Express Publishing

This is a code challenge for a React web app that utilizes the Cat API for data and images.

## Project Overview

The goal of this project is to create a simple web app with the following features:

1. A login form where the user can enter a username and password. Upon submission, the credentials are stored in the app's state.
2. A navigation/header element that includes a "Login" link. Clicking the "Login" link takes the user to the login form.
3. Once logged in, the user can see a "Cats" link in the navigation bar. Clicking on the "Cats" link takes the user to the "/cats" route that displays a list of small cat images.
4. Under each cat image, there is a "Favourite" button that allows the user to add the cat to their favourites collection.
5. The favourites collection can be viewed in a separate route called "/favourites". It displays the favourited cat images along with an "Unfavourite" button for each image.

## Technologies Used

- React (https://reactjs.org/)
- React Router (https://reactrouter.com/)
- Redux (https://redux.js.org/)
- The Cat API (https://thecatapi.com/)

## Project Structure

  - `src/`: This directory contains the source code of the application.
  - `components/`: Contains reusable React components used throughout the app.
  - `redux/`: Contains the Redux-related files, including actions, reducers, and the store configuration.
  - `App.js`: The main entry point of the application, where the routes and overall structure are defined.
  - `index.js`: The entry point for rendering the React app into the DOM.
  - `public/`: Contains static assets and the HTML file used as the entry point for the app.

## How to Run the Project

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Start the development server with `npm start`.
4. Open the web app in your browser.


