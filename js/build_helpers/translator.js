async function getTranslations() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_TRANSLATIONS_KEY);
  doc.useApiKey(process.env.GOOGLE_API_KEY);

  console.log("\nConnecting to Google Docs");
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  console.log("Building EN dictionary");
  const en = new Map([]);
  rows.forEach((row) => {
    en.set(`{{${row.LABEL}}}`, row.EN);
  });

  console.log("Building UK dictionary");
  const uk = new Map([]);
  rows.forEach((row) => {
    uk.set(`{{${row.LABEL}}}`, row.UK);
  });

  console.log("Building HU dictionary");
  const hu = new Map([]);
  rows.forEach((row) => {
    hu.set(`{{${row.LABEL}}}`, row.HU);
  });

  return { en, uk, hu };
}

exports.getTranslations = getTranslations;
