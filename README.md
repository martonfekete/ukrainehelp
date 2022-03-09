# https://ukrainehelp.hu

## Install
- Download and Install NodeJs: https://nodejs.org/
- clone this repository, `cd ukrainehelp`
- `npm install`
- `mkdir dist`
- Create a [GoogleApi Key](https://support.google.com/googleapi/answer/6158862?hl=en)
- Set the environment variable: `export GOOGLE_API_KEY=yourApiKey`
- Set googleSheetId for translation: `export GOOGLE_TRANSLATIONS_KEY=idOfAGoogleSheetFileFromUrl`
- Build the website: `npm run build`
- See what you have done in the /dist folder
