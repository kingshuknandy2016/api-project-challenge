<html><center><h1>Actian Careers RESTful Application</h1></center></html>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

This is a simple restful application which extracts the open positions for a department and Action Careers page. We have used build in **fetchAPI** to make request.

# Table on Contents <!-- omit in toc -->

- [Architecture](#architecture)
- [Features](#features)
- [Quick Start](#quick-start)
- [Restful API](#restful-api)

## Architecture

![Process Flow](/docs/images/processFlow.jpeg)

 - **Start Microservice :** [index.ts](./src/index.ts) to start the microservice application
 - **Express App Setup** : Configures the main Express application [app.ts](./src/app.ts) by adding middleware, such as body-parser for parsing JSON requests.
Mounts the **router** under the **/** path.
- **Routing :** Routes are used to exposes RESTful endpoints for *Action Careers* operation. The **apis** are [here](./backend-express-postgresql/src/routes/v1Apis/)
- **Controller :** The **controller** are [here](./src/controllers/ActianCareersController.ts) that handles requests related to Action Careers.
-  **Service :** Implements a [service layer](./src/service/ActianCareersService.ts) to encapsulate the data parsing logic applied on the raw html content.
- **Repositories :** Implements a [repository layer](./src/repositories/ActianCareersRepository.ts) to make the raw api call to the Action Careers url.

## Features
* Used build in **fetchAPI** to make request
* For HtML parsing we have user **cheerio**
* Standard microservice with different layers **router**,**controller**,**service** and **repository**.

## Quick Start

- Install the dependencies

```cmd
  npm install
```

- Start the app in dev mode

```cmd
   npm run start:dev
```

## Restful API
```sh 
+--------+------------------------------+
  Method | URI
+--------+------------------------------+
  GET    | /health
  GET    | /getOpenPositions
+--------+------------------------------+
```
The raw curl request looks like
```sh
curl --location 'http://localhost:3000/getOpenPositions?department=Engineering'
```
The postman collection of the API's are [here](/docs/postmanApiCollection/ActionCareers.postman_collection.json)