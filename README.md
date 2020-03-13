# Code Design

## Language

Typescript has been choosen to utilize the latest javascript syntax and force type checking

## Folder structure

Due to the small size of the project, the vision is to split the code into the following catalogues:

- controllers
- auth
- routes
- models

## 3rd party libraries

### Express

- Express has been chosen because I'm familiar with express
- Express provides functionality to split the endpoint logic using router by passing in multiple logic functions. For example, business logic and authorization logic can be split up into multiple functions. This increases reusability of the code
- Express can be easily integrated with other libraries and middlelayers like bodyParser, which reduces the effort of development

## Infrastructure

- Firebase functions has been chosen because of the simplicity of the deployment
- Firebase store has been chosen because of the seemless integration with firebase auth and firebase functions

## CICD

Use circle ci for CICD pipeline

- every master commit will deploy to firebase functions
- simple and easy to use
- integrate seemlessly with github
- support unit testing on PRs

# Instructions

## Set current directory to the functions folder

```
cd functions
```

## Setup

```
npm install
```

### Lints and fixes files

```
npm run lint
```

### Run unit tests

```
npm run test
```

### Deployment

install firebase cli

```
npm install -g firebase-tools
```

login firebase

```
firebase login
```

init firebase project, choose firebase functions

```
firebase init
```

make sure firebase store has been setup under the corresponding project

deploy

```
firebase deploy
```

### API endpoints

GET https://us-central1-fir-auth-eclipx.cloudfunctions.net/api/admin_only
{
"Authorization": "Bearer \*\*\*"
}
