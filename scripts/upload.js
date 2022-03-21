require("dotenv").config();
const ftp = require("ftp");
const path = require("path");

const distPath = path.resolve(__dirname, "../dist");
const languages = require("./constants").languages;
const ftpClient = new ftp();

ftpClient.on("ready", function () {
  ftpClient.list((err, list) => {
    if (err) {
      console.log("Error retrieving directory");
      throw err;
    }

    const dirs = list
      .filter((item) => item.type === "d")
      .map((item) => item.name);

    languages.forEach((lang) => {
      if (!dirs.includes(lang)) {
        createNewLang(lang);
      } else {
        uploadLangVersion(lang);
      }
    });

    uploadFile("index.html");
    uploadFile("css/style.css");
  });
});

function createNewLang(lang) {
  console.log(`\nCreating folder for ${lang}`);
  ftpClient.mkdir(lang, (err) => {
    if (err) {
      console.log(`Failed to create dir ${lang}`);
      throw err;
    }
    console.log("Folder created");
    uploadLangVersion(lang);
  });
}

function uploadLangVersion(lang) {
  uploadFile(`${lang}/index.html`);
}

function uploadFile(sourceFile) {
  console.log(`Uploading ${sourceFile}...`);

  const src = `${distPath}/${sourceFile}`;
  ftpClient.put(src, `${sourceFile}`, function (err, list) {
    if (err) {
      console.log(`Error uploading ${sourceFile}`);
      throw err;
    }
    console.log(`Uploaded root ${sourceFile}`);

    ftpClient.end();
  });
}

ftpClient.connect({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
});
