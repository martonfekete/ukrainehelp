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

## Contribute

### Stylesheets

The project uses SCSS to declare style. Since the page is pretty simple, no pattern is implemented in the files structure. Just keep connected classes in one file, separating specific areas from the rest.

### Javascript

Most of the logic of building the site is done via the following JS files:

- `markdown.js` contains the logic to translate the content found in MD files into HTML via a customizable renderer
- `templater.js` replaces the template slots within `template.html` and builds the source for the index file
- `translator.js` connects to Google Docs, downloads the translation files and replaces all the labels `{{BETWEEN_CURLY_BRACKETS}}` with their translations
- `build.js` creates the `index.html` file for various supported languages and adds the necessary metadata and scripts for the live builds

Use VSCode to easily inherit the minimal formatting rules for JS and HTML files that the project has in place (see `.editorconfig` for details)

### Content

The project's text contents live in the `content` folder as Markdown files. The expandable blue boxes are in the `content/help` folder, the rest of the files follow the same name as their template placeholders. E.g. the Impresum has `content/impressum.md` as content and `[[IMPRESSUM]]` as the placeholder.

If you want to update the content, follow these rules:

- For a completely new section, add a `[[TEMPLATE_SLOT]]` in `template.html`
- Add content to the relevant MD files. Use `{{CURLY_BRACES}}` for translateable content.
  - If you added new text and have access to the translation files, add them to the source, otherwise put the necessary labels and at least the English version into the PR description.
- If you add a link, there are 3 variants on the default layount:
  - `[btn_SOME_LABEL](http://google.com)` will gennerate the blue button-style link
  - `[btn-inverted_SOME_LABEL](http://google.com)` will generate a blue, ghost-button style link
  - `[ref_MY_REFERENCE](http://google.com###15/03/2022)` will generate a reference link

#### References

To remain trustworthy and show where and when our information is from, try using source notations wherever you can (unless you're pointing directly to the site where the information is from). The build process helps you automatically generate the references if you follow the rules as below:

1. Include your references as links, so `[label](url)` is expected
1. Start your label with `ref_` to indicate reference mapping to the markdown renferer
1. Include the current date or any other information you want to show in brackets of the tooltip after the url, followed by `###`; e.g. `(url###15/03/2022)`
1. Do not include "Source:" in the label, that will be added automatically during rendering

Example

`[ref_MY_REFERENCE](http://google.com###15/03/2022)` will render (styes and meta omitted for brewity) as `<a href="http://google.com"><span>Source: MY_REFERENCE (15/03/2022)</span></a>`.
