async function getTranslations() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");

  const defaultMap = new Map([
    ["{{CSS_SRC}}", "../css"],
    ["{{IMG_SRC}}", "../img"],
    ["{{FILE_SRC}}", "../img"],
  ]);

  const defaultReturn = {
    en: defaultMap,
    hu: defaultMap,
    uk: defaultMap,
  };

  let doc = new Object();
  try {
    console.log("\nConnecting to Google Docs");
    doc = new GoogleSpreadsheet(process.env.GOOGLE_TRANSLATIONS_KEY);
    doc.useApiKey(process.env.GOOGLE_API_KEY);
    await doc.loadInfo();
  } catch (e) {
    console.log("Couldn't connect to Google Docs. Displaying raw labels");
    console.log(e);
    return defaultReturn;
  }

  try {
    const en = new Map([]);
    const uk = new Map([]);
    const hu = new Map([]);

    console.log("Building dictionaries");

    for (let i = 0; i < doc.sheetCount; i++) {
      const sheet = doc.sheetsByIndex[i];
      process.stdout.write(`Reading sheet: ${sheet.title}`);
      if (i == 0) process.stdout.write("(default) ");

      const rows = await sheet.getRows();

      rows.forEach((row) => {
        process.stdout.write(".");

        row.LABEL = row.LABEL.replace(/^_/, `${sheet.title}_`);

        en.set(`{{${row.LABEL}}}`, row.EN);
        uk.set(`{{${row.LABEL}}}`, row.UK);
        hu.set(`{{${row.LABEL}}}`, row.HU);
      });
      process.stdout.write("\n");
    }
    return { en, uk, hu };
  } catch (e) {
    console.log(e);
    console.log("Couldn't connect create dictionaries. Displaying raw labels");
    return defaultReturn;
  }
}

exports.getTranslations = getTranslations;
