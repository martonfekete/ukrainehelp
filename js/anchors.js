function scrollToAnchor() {
  const url = window.location.href;
  if (url.includes("#")) {
    const anchor = url.slice(url.indexOf("#") + 1);
    const details = document.querySelector(`#${anchor}`);
    details.setAttribute("open", true);
    try {
      window.scrollTo(
        0,
        details.getBoundingClientRect().top + window.scrollY - 50
      );
    } catch {}
  }
}

function setAnchorTag(id) {
  let url = window.location.href;
  if (url.includes("#")) {
    url = url.replace(/#.*/i, `#${id}`);
  } else {
    url = `${url}#${id}`;
  }
  window.history.pushState({}, "", url);
}
