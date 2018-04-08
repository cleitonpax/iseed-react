<p align="center">
    <img src="https://react.semantic-ui.com/logo.png" alt="Semantic UI React logo" align="center">
</p>

<h1 align="center">react-semantic-boilerplate</h1>

**NOTE: This project is not officially associated with Semantic UI and/or Facebook in any way. It is just a simple helpful boilerplate made by me.**

## Introduction

This is a boilerplate project that intends to provide an easy way to setup [Create React App](https://github.com/facebookincubator/create-react-app) with a customizable version of [Semantic UI](https://semantic-ui.com/), as this process is usually clumsy and full of little inconveniences.

## How to use

### Installation

First clone the repository to your computer by running  
`git clone https://github.com/pretzelhands/react-semantic-boilerplate.git`

Then you need to install the required dependencies with  
`yarn install` (**npm:** `npm install`)

And after that you are ready to go!

### Basic usage

Basically you can use it the same as any React app that was made with Create React App. The basic commands are in place:

`yarn start` (**npm:** `npm run start`)  
`yarn build` (**npm:** `npm run build`)

The difference is that the `build` command now also builds Semantic UI for use in production and the `start` command starts the `watch` task of Semantic UI's `Gulpfile`

You can then edit your React app as you normally would and it will provide the same conveniences of hot reloading etc that you have grown used to!

All the necessary files have already been pre-included so you just need to import the components you wish to use from [semantic-ui-react](https://react.semantic-ui.com) and start building stuff!

### Customizing Semantic UI

To customize Semantic UI you can find the appropriate files in `src/semantic/src/themes/custom`. To understand the file structure provided in that folder, please read the [Customization Guide](http://learnsemantic.com/developing/customizing.html) provided by Semantic UI.

In it's standard form the theme contains exactly the same configuration as the `default` theme.

**N.B.: On \*nix systems you can also use the `src/semantic/theme` symlink to access theme files. This is purely for convenience.**

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

## Contributing

Contributions in any form are welcome! If you find a bug, please [file an issue.](https://github.com/pretzelhands/react-semantic-boilerplate/issues) All contributors are asked to abide by the rules of the [Contributor Covenant.](./CODE_OF_CONDUCT.md)

## Updates

This repo will be kept up-to-date in accordance with the stable releases of React, Create React App, Semantic UI and Semantic UI React insofar they are compatible. 

## License

This project is licensed under the ISC license. See the [LICENSE file](./LICENSE.md) for more details.
