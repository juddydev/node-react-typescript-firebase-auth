# Firebase Authentication Sample on Web

Sample web application for Firebase Authentication developed using Node.js, React, and TypeScript.  
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

- [Volta](https://volta.sh/)

Node.js is required to run this application. Please install Volta to automatically use the suitable Node.js version.

### Firebase

This application uses Firebase Authentication.

1. Create a Firebase project by following the instructions in the [Firebase docs](https://firebase.google.com/docs/web/setup#create-project).
1. Enable Email/Password sign-in by following steps 2 and 3 the instructions in the [Firebase docs](https://firebase.google.com/docs/auth/web/password-auth#before_you_begin).
1. Enable Google sign-in by following steps 2 the instructions in the [Firebase docs](https://firebase.google.com/docs/auth/web/google-signin#before_you_begin).

## Recommended

- [Visual Studio Code](https://code.visualstudio.com/)

The recommended extensions for Visual Studio Code are listed in [.vscode/extensions.json](.vscode/extensions.json).

## Getting Started

- Clone this repository.

```
git clone https://github.com/kwn1125/node-react-typescript-firebase-auth.git <project_directory>
```

- Install dependencies.

```
cd <project_directory>
npm install
```

- Update the empty values and Rename `.env.sample`. Please refer to the [Create React App docs](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used) for guidance on file naming conventions.
- Launch the application.

```
npm start
```
