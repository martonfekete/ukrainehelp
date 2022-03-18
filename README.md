# https://ukrainehelp.hu

A simple, 3-language starting page for people fleeing Ukraine to Hungary who are looking for the latest useful information on a variety of topics, including crossing the border, finding accomodation or medical care, legal information or sources related to fleeing with pets or travelling further.

The website contains only the _most essential_ information for _refugees_. It's aim is to provide a spring board with useful references to find further information or portals. It is not an all-encompassing wiki or a detailed description or collection of all sources. It is also not a website aimed at informing or promoting organizations or people offering help.

Contributions are welcome.

## Install and run locally

`Note: this will run the instance without any labels if you don't set up the translation source.`

- If you don't have it, install [Node](https://nodejs.org/)
- Install dependencies: `npm ci`
- Run the dev environment: `npm start`

## Setting up translations

- Create a [GoogleApi Key](https://support.google.com/googleapi/answer/6158862?hl=en)
- Set the environment variable: `export GOOGLE_API_KEY=yourApiKey`
- Set googleSheetId for translation: `export GOOGLE_TRANSLATIONS_KEY=idOfAGoogleSheetFileFromUrl`
