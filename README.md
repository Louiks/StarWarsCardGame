# CardGame

# Welcome to StarWars universe!

Hello! My name is Jakub, and I am a fullstack developer located in Wrocław, Poland. I have created this project as a recruitment task. If you want to learn about this project and how to run, and use it, please continue reading.

# Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

# Project structure

```
        CardGame/
        ├── cypress/
        │   ├── e2e/
        │   ├── fixtures/
        │   ├── support/
        ├── src/
        │   ├── app/
        │   │   ├── gameplay/
        │   │   │   ├── components/
        │   │   │   ├── game-page/
        │   │   │   ├── model/
        │   │   │   ├── services/
        │   │   │   ├── gameplay.module.ts
        │   │   │   └── gameplay-routing.module.ts
        │   │   ├── home/
        │   │   │   ├── about/
        │   │   │   ├── home-page/
        │   │   │   ├── how-to/
        │   │   │   └── home.module.ts
        │   │   ├── shared/
        │   │   │   ├── components/
        │   │   │   ├── services/
        │   │   │   ├── testing/
        │   │   │   └── shared.module.ts
        │   │   ├── app.component.html
        │   │   ├── app.component.scss
        │   │   ├── app.component.spec.ts
        │   │   ├── app.component.ts
        │   │   ├── app.module.ts
        │   │   └── app-routing.module.ts
        │   ├── assets/
        │   ├── environments/
        │   ├── styles/
        │   ├── index.html
        │   ├── main.ts
        ├── angular.json
        ├── cypress.config.ts
        ├── package.json
        ├── package-lock.json
        └── README.md       <--- HERE YOU ARE!

	
```

# Features

- **Frontend**:
- Provides a user-friendly interface, with many smooth animations.
- Interacts with the Star Wars API - SWAPI.
- Allows user to choose winning-factor and play!
- Guides user on how to use the application and provides background.

# Installation

**Frontend**
Download and Install node from https://nodejs.org
Open command line run `npm install -g npm`
Go to `/CardGame/`
Run terminal in `/CardGame/` location
Run `npm install`
Run `npm run ng serve`
You should see server running with the following information:

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


√ Compiled successfully.

```

# Usage

Having Frontend:

1. Open command line, go to `/CardGame/` location, run `npm run ng serve`
2. Open browser, navigate to http://localhost:4200/
3. Go to `How To Play` page and read the instructions, or enjoy exploring the game on your own!

# API Endpoints

This application does rely on an external server located under https://www.swapi.tech link.
The only endpoint used is the https://www.swapi.tech/api/people/${number} endpoint. It does not require any other parameters or special headers, just a number serving as index.
The endpoint returns data in the following manner, where `<personData>` is the data of the requested person:

```
{
  message: string;
    result: {
      description: string;
      properties: <personData>;
    }
}
```

Here is an example of what the endpoint returns, when given number is `1`:

```
Result:

{
  "message": "ok",
  "result": {
    "properties": {
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "created": "2024-09-25T05:12:16.058Z",
      "edited": "2024-09-25T05:12:16.058Z",
      "name": "Luke Skywalker",
      "homeworld": "https://www.swapi.tech/api/planets/1",
      "url": "https://www.swapi.tech/api/people/1"
    },
    "description": "A person within the Star Wars universe",
    "_id": "5f63a36eee9fd7000499be42",
    "uid": "1",
    "__v": 0
  }
}
```

Most of the data is not used by the application, therefore is not kept.

# Tests

The application has been tested with unit and e2e test.

- unit tests (jasmine):
  - 34 unique tests
  - Can be found across the whole folder structure.
  - Can be run using `ng test` command
- e2e test (cypress):
  - 18 unique tests
  - Can be found in `CardGame/cypress/e2e` folder
  - Can be run using `npx cypress run`

# Credits

- Background star parallax: https://codepen.io/riley-pearce/pen/OJWPjZM
- Placeholder Avatar: https://pngtree.com/freepng/oval-user-avatar-placeholder-black_6796229.html
- The Star Wars icon is the sole property of Lucasfilm Limited.
