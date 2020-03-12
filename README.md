# firebase-auth-be

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
  "Authorization": "Bearer ***"
}