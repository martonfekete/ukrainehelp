const fs = require("fs");
const path = require("path");
const marked = require("marked");

require("./markdown");
const markdownSource = path.resolve(__dirname, "../../content");

// BUILD HTML
let htmlString = "";
console.group("Building HTML from MD");
fs.readdirSync(`${markdownSource}/help`).forEach((source) => {
  console.log(source);
  try {
    const title = source.split("_")[1].slice(0, -3);
    const markdownContent = fs.readFileSync(
      `${markdownSource}/help/${source}`,
      "utf-8"
    );
    let parsed = marked.parse(markdownContent);
    parsed = parsed.replace(/{{_/g, "{{HELP_" + title.toUpperCase() + "_");
    htmlString += `
      <a class="anchor" name="${title}"></a>
      <details id="${title}" onclick="setAnchorTag('${title}')">
        <summary>{{HELP_${title.toUpperCase()}}}</summary>
        <div>${parsed}</div>
      </details>`;
  } catch (e) {
    console.log(`Error building HTML from ${markdownSource}/${source}`);
    console.log(e);
  }
});
console.groupEnd();
console.log("HTML built\n");

// UPDATE INDEX.HTML
const createIndexHtml = () => {
  let template = fs.readFileSync(
    path.resolve(__dirname, "../../template.html"),
    "utf-8"
  );

  console.group("Replacing template");

  console.log("Replacing WELCOME");
  try {
    let welcome = fs.readFileSync(`${markdownSource}/welcome.md`, "utf-8");

    var parsed = marked.parse(welcome);
    parsed = parsed.replace(/{{_/g, "{{WELCOME_");

    let welcomeHtml = `
    <details id="welcome">
      <summary>{{WELCOME}}</summary>
      <div>${parsed}</div>
    </details>`;
    template = template.replace(/\[\[WELCOME\]\]/g, welcomeHtml);
    console.log("WELCOME replaced");
  } catch (e) {
    console.log("Error replacing WELCOME");
    console.log(e);
  }

  console.log("Replacing CONTENT...");
  template = template.replace(/\[\[CONTENT\]\]/g, htmlString);
  console.log("CONTENT replaced");

  console.log("Replacing ORGANIZATIONS...");
  try {
    let orgs = fs.readFileSync(`${markdownSource}/organizations.md`, "utf-8");
    template = template.replace(
      /\[\[ORGANIZATIONS\]\]/g,
      marked
        .parse(orgs)
        .replace("<p>", '<p class="centered">')
        .replace(/{{_/g, "{{ORGANIZATIONS_")
    );
    console.log("ORGANIZATIONS replaced");
  } catch (e) {
    console.log("Error replacing ORGANIZATIONS");
    console.log(e);
  }

  console.log("Replacing TIMESTAMP...");
  const time = new Date();
  const timeString = `${time.toLocaleDateString("hu", {
    timeZone: "Europe/Budapest",
  })} ${time.getHours()}:${time.getMinutes()}`;
  template = template.replace(/\[\[TIMESTAMP\]\]/g, timeString);
  console.log("TIMESTAMP replaced");

  console.log("Replacing IMPRESSUM...");
  try {
    let impressum = fs.readFileSync(`${markdownSource}/impressum.md`, "utf-8");
    template = template.replace(
      /\[\[IMPRESSUM\]\]/g,
      marked.parse(impressum).replace(/{{_/g, "{{IMPRESSUM_")
    );
    console.log("IMPRESSUM replaced");
  } catch (e) {
    console.log("Error replacing IMPRESSUM");
    console.log(e);
  }

  console.groupEnd();

  fs.writeFileSync(path.resolve(__dirname, "../../index.html"), template);
};

exports.createIndex = createIndexHtml;
