(async function () {
  const fs = require("fs");
  const fse = require("fs-extra");
  const path = require("path");
  require("dotenv").config();

  const templater = require("./build_helpers/templater");
  templater.createIndex();

  const source = path.resolve(__dirname, "../index.html");
  const distPath = path.resolve(__dirname, "../dist");

  if (!fs.existsSync(`${distPath}`)) {
    fs.mkdirSync(`${distPath}`);
  }

  const languages = require("./constants").languages;
  const translator = require("./build_helpers/translator");
  const translations = await translator.getTranslations();

  languages.forEach((lang) => {
    console.group(`\nBuilding language version ${lang}...`);

    if (!fs.existsSync(`${distPath}/${lang}`)) {
      console.log(`Version ${lang} doesn't exist. Creating...`);
      fs.mkdirSync(`${distPath}/${lang}`);
    }

    const target =
      lang === process.env.DEFAULT_LANG
        ? `${distPath}/index.html`
        : `${distPath}/${lang}/index.html`;
    fs.copyFileSync(source, target);
    const fileText = fs.readFileSync(target, "utf-8");

    try {
      const replacements = translations[lang];
      let updatedText = fileText.replace(/{{[^}]+}}/g, function (m) {
        return replacements.get(m) || m;
      });

      console.log("Adding meta");
      const commitHash = require("./build_helpers/version").revision;
      updatedText = updatedText.replace(
        "<html>",
        `<html data-commit="${commitHash}" lang="${lang}">`
      );

      if (process.argv.includes("--prod")) {
        console.log("Adding analytics");
        const analyticsCode = `
          <!-- Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-EMBGBSK11V"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-EMBGBSK11V");
          </script>`;
        updatedText = updatedText.replace("</head>", `${analyticsCode}</head>`);

        console.log("Adding additional META");
        const meta = `
        <meta name="facebook-domain-verification" content="gwgl7pgvc3rj2ywtxwxve2y3xi1d99" />`;
        updatedText = updatedText.replace("[[META]]", meta);

        console.log("Adding Facebook pixel");
        const pixelCode = `
        <!-- Meta Pixel Code -->
          <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '506182860847696');
          fbq('track', 'PageView');
          </script>
          <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=506182860847696&ev=PageView&noscript=1"
          /></noscript>
          <!-- End Meta Pixel Code -->`;
        updatedText = updatedText.replace("</head>", `${pixelCode}</head>`);
      }

      fs.writeFileSync(target, updatedText);

      if (lang === process.env.DEFAULT_LANG) {
        fs.copyFileSync(
          path.resolve(__dirname, "../partials/base.html"),
          `${distPath}/${lang}/index.html`
        );
      }
      console.log(`Language version ${lang} created\n`);
    } catch (error) {
      console.log(`Error while creating version ${lang}:\n${error}`);
    }
    console.groupEnd();
  });

  console.log("Copying styles...");
  fse.copySync(path.resolve(__dirname, "../css"), `${distPath}/css`);
  console.log(`Styles copied to ${distPath}/css`);

  console.log("Copying images...");
  fse.copySync(path.resolve(__dirname, "../img"), `${distPath}/img`);
  console.log(`Images copied to ${distPath}/img`);

  console.log("Copying files...");
  fse.copySync(path.resolve(__dirname, "../files"), `${distPath}/files`);
  console.log(`Files copied to ${distPath}/files`);

  console.log("Copying js...");
  fse.copySync(path.resolve(__dirname, "../js"), `${distPath}/js`);
  console.log(`Files copied to ${distPath}/js`);

  fs.unlinkSync(source);
})();
