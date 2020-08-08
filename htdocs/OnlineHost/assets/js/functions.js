function JB(x) {
  return "jb/" + x + ".js";
}
function SC(x) {
  return '<script src="' + x + '.js"></scr' + "ipt>";
}
function MIRA(x) {
  return SC("PAYLOADS/mirahen/" + x);
}
function BINLOADER(x) {
  return "PAYLOADS/binloader/" + x + ".js";
}
function SCMIRA(x) {
  return "PAYLOADS/mirahen/" + x + ".js";
}
function PAYLOAD(x) {
  return "PAYLOADS/" + x + ".js";
}

function removeScript(nb) {
  let head = document.getElementsByTagName("head")[0];
  let scripts = head.getElementsByTagName("script");
  for (let i = scripts.length; i > 1; i--) {
    head.removeChild(scripts[nb]);
    nb--;
  }
}
function readcookie(ex) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(ex))
    .split("=")[1];

  return cookieValue;
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
function barFan(barfan, level) {
  for (let i = 0; i < level; i++)
    barfan += '<button id="' + i + 'btn" class="level"></button>';
  for (let i = level; i < 10; i++)
    barfan += '<button id="' + i + 'btn" class="levelclear"></button>';
  return (barfan +=
    '</div><div id="writelevel">' +
    threshold +
    readcookie("levelTemp") +
    "°" +
    "</div>");
}
createTempDefault("56");
