function JB(x) {
  return "jb/" + x + ".js";
}
function SC(x) {
  return '<script src="' + x + '.js"></scr' + "ipt>";
}
function BINLOADER(x) {
  return "PL_" + plLangue() + "/binloader/" + x + ".js";
}
function SCMIRA(x) {
  return "PL_" + plLangue() + "/mirahen/" + x + ".js";
}
function PAYLOAD(x) {
  return "PL_" + plLangue() + "/" + x + ".js";
}
function plLangue() {
  let pl_langue;
  switch (defaultLangue) {
    case 0:
      return (pl_langue = "FR");
    case 1:
      return (pl_langue = "EN");
  }
}
function removeScript() {
  let head = document.getElementsByTagName("head")[0];
  let scripts = head.getElementsByTagName("script");
  for (let i = scripts.length; i > 0; i--) {
    head.removeChild(scripts[i - 1]);
  }
}

function createCookie(name, value) {
  let expire = addDays(30);
  document.cookie = name + "=" + value + ";expires=" + expire.toUTCString();
}
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else return readCookie(name);
}
function readCookie(ex) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(ex))
    .split("=")[1];

  return cookieValue;
}
function deleteCookie(cname) {
  var d = new Date();
  d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
  var expires = "expires=" + d.toGMTString();
  window.document.cookie = cname + "=" + "; " + expires;
}
function createTempDefault(value) {
  let expire = addDays(30);
  if (document.cookie.indexOf("fan=") == -1) {
    document.cookie = "fan=" + value + ";expires=" + expire.toUTCString();
    document.cookie = "levelTemp=" + value + ";expires=" + expire.toUTCString();
  }
}
function modifyCookie(name, value) {
  let expire = addDays(30);
  document.cookie = name + "=" + value + ";expires=" + expire.toUTCString();
}

function checkBlock(elem) {
  if (elem && elem.style.display == "block") {
    return true;
  } else {
    return false;
  }
}
function displayBlock(elem) {
  if (elem) {
    elem.style.display = "block";
  }
}
function displayNone(elem) {
  if (elem) {
    elem.style.display = "none";
  }
}
function setInnerHTML(elem, str) {
  if (elem) elem.innerHTML = str;
}
function setInnerText(elem, str) {
  if (elem) elem.innerHTML = str;
}
function languncheck(elem) {
  if (elem) elem.checked = false;
}

function addDays(days) {
  let result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}
function newScript(func) {
  let element = document.createElement("script");
  element.src = func;
  return document.getElementsByTagName("head")[0].appendChild(element);
}
function loadPayload(payload) {
  let tab = [payload, "c-code"];
  for (let i = 0; i < tab.length; i++) {
    var element = document.createElement("script");
    if (i == 0) element.src = PAYLOAD(tab[i]);
    else element.src = SCMIRA(tab[i]);
    document.getElementsByTagName("head")[0].appendChild(element);
  }
}
createTempDefault("85");
