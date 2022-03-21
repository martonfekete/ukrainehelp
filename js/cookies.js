function showCookies() {
  const accepted = sessionStorage.getItem("cookieAccepted");
  if (!accepted) {
    document.getElementById("cookie").style.display = "flex";
    return;
  }
  if (!Boolean(accepted)) {
    rejectCookies();
  }
}

function rejectCookies() {
  sessionStorage.setItem("cookieAccepted", "false");
  document.getElementById("cookie").style.display = "none";

  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function acceptCookies() {
  sessionStorage.setItem("cookieAccepted", "true");
  document.getElementById("cookie").style.display = "none";
}
