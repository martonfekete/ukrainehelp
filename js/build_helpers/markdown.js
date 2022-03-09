const marked = require("marked");

console.log("Setting markdown parser options...");

try {
  const renderer = {
    link(href, title, text) {
      let start = "a";
      if (text.startsWith("btn_")) {
        start = 'a class="btn highlight"';
        text = text.slice(4);
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
