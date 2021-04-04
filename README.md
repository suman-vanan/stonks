# Stonks

_Stonks_ is a mobile application that enables users to search for financial instruments on various stock exchanges, and add them to their portfolio.

## Features

Here is a planned list of features (ticked ones are completed, unticked ones are under development).

- [ ] Register and login users via: Phone Number (Account / Username) Password (OTP)
- [ ] Search for financial instruments by ticker, common name, or other terms
- [ ] View information on the financial instrument (Realtime price, Historical price data, related news)
- [ ] Share the financial instrument with external parties
- [ ] Follow the financial instrument in the process adding it to their watchlist (portfolio)
- [ ] Manage their watchlist by adding or removing financial instruments
- [ ] Have an overview of the losses and gains in their portfolio

## Choosing the tech stack

### Which framework?

Our requirements are to develop a mobile app that works well on both iOS & Android. The following options come to mind:

- Ionic
- React Native
- Flutter

Ionic [scores poorly](https://2020.stateofjs.com/en-US/technologies/mobile-desktop/) in developer satisfaction scores for a variety of reasons, and hence was eliminated.

Both React Native and Flutter enable creation of native apps that work great on mobile.

I've had prior experience with React Native, so I went with that.

### Which language?

The next choice would be which language to use:

- Vanilla JavaScript
- TypeScript

The benefits of TypeScript are very significant, even in a small project like this. Some of these benefits:

- Declaring types allows the static type checker to catch bugs/errors quickly
- Makes the code base more self-documenting
- Enhances the dev experience by enabling editors (such as VScode) to provide autocomplete with context-aware suggestions
- Reduces the amount of menial testing needed (i.e. testing not related to business logic)
  - No need for tests that TS can catch
- ...and so on

### What libraries to use?

> The standard library saves programmers from having to reinvent the wheel.
>
> &mdash; <cite>Bjarne Stroustrup</cite>

#### UI

- Since we don't have a UI designer, we'd benefit from a React Native component library that provides UI components that look good out-of-the-box.
- There's a [few choices](https://blog.logrocket.com/react-native-component-libraries-in-2020/), but I settled on [React Native Paper](https://callstack.github.io/react-native-paper/index.html)

## Setup Instructions

### Build & Run

Currently, I'm supporting & testing the app on iOS only. Hence, these instructions are for running this app on the iOS Simulator on a development machine.

1. This app uses [Alpha Vantage](https://www.alphavantage.co/) API for financial instrument data. Get your free API key, and fill it up in `.env` (see `.env.template` for instructions)
2. To install dependencies, run: `yarn install`
3. To launch app on iOS Simulator (assuming your [React Native dev environment has been setup](https://reactnative.dev/docs/environment-setup)), run: `npx pod-install ios && npx react-native run-ios`

### Test

Here's some steps to setup testing in a blank RN project created with React Native CLI.

- `transformIgnorePatterns`: Used to specify which files shall be transformed by Babel. Many react-native npm modules unfortunately don't pre-compile their source code before publishing. [(Source)](https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization)
  - A [sample regex](https://stackoverflow.com/a/59964555/8561397) that works for some common RN scenarios
- Mocking native dependencies
  - Libraries such as `@react-navigation` and `@react-native-firebase` ahve dependencies that include native code, and hence need to be mocked in order to be tested. Read the docs for such libraries to understand how to mock them properly.
