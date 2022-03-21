const fs = require("fs");
const path = require("path");
require("dotenv").config();

const distPath = path.resolve(__dirname, "../../dist");
const languages = require("../constants").languages;

const missingLabels = [];

languages.forEach((lang) => {
  const fileText = fs.readFileSync(
    lang === process.env.DEFAULT_LANG
      ? `${distPath}/index.html`
      : `${distPath}/${lang}/index.html`,
    "utf-8"
  );

  const missingTranslation = fileText.match(/{{.*}}/gi);
  if (missingTranslation) {
    missingTranslation.forEach((key) => {
      missingLabels.push(`${key} (${lang})`);
    });
  }

  const unresolvedTemplate = fileText.match(/\[\[.*\]\]/gi);
  if (unresolvedTemplate) {
    unresolvedTemplate.forEach((key) => {
      missingLabels.push(`${key} (${lang})`);
    });
  }
});

if (missingLabels.length > 0) {
  throw new Error(
    `Labels are missing from the final versions:\n${missingLabels.join("\n")}`
  );
}

console.log("PASSED: No untranslated keys or unresolved templates.");
