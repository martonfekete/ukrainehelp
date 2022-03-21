const marked = require("marked");

console.log("Setting markdown parser options...");

try {
  const renderer = {
    link(href, title, text) {
      if (text.startsWith("org_")) {
        return renderOrganizationLink(text, href);
      }
      if (text.startsWith("ref_")) {
        return renderSourceReference(text, href);
      }

      let start = "a";
      if (text.startsWith("btn_")) {
        start = 'a class="btn highlight"';
        text = text.slice(4);
      }
      if (text.startsWith("btn-small_")) {
        start = 'a class="btn highlight-small"';
        text = text.slice(10);
      }
      if (text.startsWith("invert-btn_")) {
        start = 'a class="btn highlight inverted"';
        text = text.slice(11);
      }

      if (href.startsWith("tel:")) {
        return `<${start} href="${href}">${text}</a>`;
      }
      return `<${start} href="${href}" rel="noreferrer noopener" target="_blank">${text}</a>`;
    },
  };

  marked.setOptions({
    renderer: new marked.Renderer(),
  });
  marked.use({
    renderer,
  });

  console.log("Markdown parser options set\n");
} catch (e) {
  console.log("Error setting options");
  console.log(`${e}\n`);
}

function renderSourceReference(text, href) {
  text = text.slice(4);
  let dateIndex = href.indexOf("###");
  if (dateIndex < 0) {
    dateIndex = href.length - 1;
  }
  const date = href.slice(href.indexOf("###") + 3);
  const dateText = dateIndex > 0 ? "(" + date + ")" : "";
  return `<a href="${href.slice(
    0,
    dateIndex
  )}" class="reference" rel="noreferrer noopener" target="_blank"><span class="reference__tooltip">{{SOURCE}}: ${text} ${dateText}</span></a>`;
}

function renderOrganizationLink(text, href) {
  let end = text.length;
  let logo = "";
  if (text.includes("_img")) {
    end = text.indexOf("_img:");
    logo = `<span style="background-image: url({{IMG_SRC}}/${text
      .match(/\_img:.*$/gi)[0]
      .slice(5)})" class="org__logo" /></span>`;
  }
  let fb = "";
  let link = href;
  if (href.includes("_fb:")) {
    fb = `<a href="https://facebook.com/${href
      .match(/_fb:.*$/gi)[0]
      .slice(
        4
      )}" class="org__fb" rel="noreferrer noopener" target="_blank"><img src="{{IMG_SRC}}/fb.svg"></a>`;
    link = href.slice(0, href.indexOf("_fb:"));
  }
  text = text.slice(4, end);
  return `<span class="highlight org"><a href="${link}" class="org__link" rel="noreferrer noopener" target="_blank">${logo}<span class="org__text">${text}</span></a>${fb}</span>`;
}
