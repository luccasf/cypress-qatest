# QA Automation - Fidel
This is an automation test using Cypress.

## Installation

This automation requires Node.js to run.
Install the dependencies

```
cd cypress-qatest
npm install 
```

**How to run all tests**

> npm run cy:run

## Structure

I decided to use the recommended pattern, although I am aware of the page object pattern

The automation was divided into two folders: e2e and api.
The e2e test used the standard strategy, creating the tests within the integration folder in the .spec files using the "it" for each test.

The api test I started by storing the login token to use in all other tests. For location testing, I created a function to reuse in other scenarios and improve code maintainability
I also used a uuid generator for a scenario that needed a different text every time.
