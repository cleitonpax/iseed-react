<h1 align="center">iSeed Iot - with react-semantic-boilerplate</h1>

## Introduction

This is a dashboard to display data from ThingSpeak API and Arduino using ReactJs/Redux and Semantic-ui.

![alt text](./../../tree/master/src/assets/screen.png)

## How to use

### Installation

Install the required dependencies with  
`yarn install` (**npm:** `npm install`)


### Basic usage

Basically you can use it the same as any React app that was made with Create React App. The basic commands are in place:

`yarn start` (**npm:** `npm run start`)  
`yarn build` (**npm:** `npm run build`)

The difference is that the `build` command now also builds Semantic UI for use in production and the `start` command starts the `watch` task of Semantic UI's `Gulpfile`

All the necessary files have already been pre-included so you just need to import the components you wish to use from [semantic-ui-react](https://react.semantic-ui.com) and start building stuff!


### Advanced usage/New commands

In some instances you may not want to run Semantic UI and React at the same time, so I've provided commands to start them separately from one another. They are as follows:

To start the Webpack development server:  
`yarn react:start` (**npm:** `npm run react:start`)

To build the React app for production:  
`yarn react:build` (**npm:** `npm run react:build`)

To watch Semantic UI files for changes:  
`yarn semantic:start` (**npm:** `npm run semantic:start`)

To build Semantic UI for production:  
`yarn semantic:build` (**npm:** `npm run semantic:build`)
