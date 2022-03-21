function expandLang(forceVal, e) {
  const langSelector = document.querySelector("#lang ul");
  if (forceVal) {
    langSelector.style.display = forceVal;
    if (e.target.parentElement.id !== "impressum") {
      const impressum = document.querySelector("#impressum");
      impressum.style.display = forceVal;
    }
    return;
  }
  const currentStyle = langSelector.style.display;
  langSelector.style.display = currentStyle === "block" ? "none" : "block";
}

function expandImpressum() {
  const impressum = document.querySelector("#impressum");
  const currentStyle = impressum.style.display;

  impressum.style.display = currentStyle === "block" ? "none" : "block";
}
