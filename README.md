# https://ukrainehelp.hu

## Install and run locally

`Note: this will run the instance without any labels if you don't set up the translation source.`

- Download and Install NodeJs: https://nodejs.org/
- Clone this repository, `cd ukrainehelp`
- Install dependencies: `npm ci`
- Run the dev environment: `npm start`

## Setting up translations

- Create a [GoogleApi Key](https://support.google.com/googleapi/answer/6158862?hl=en)
- Set the environment variable: `export GOOGLE_API_KEY=yourApiKey`
- Set googleSheetId for translation: `export GOOGLE_TRANSLATIONS_KEY=idOfAGoogleSheetFileFromUrl`
