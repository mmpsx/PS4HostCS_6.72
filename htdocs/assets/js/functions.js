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
  var head = document.getElementsByTagName("head")[0];
  var scripts = head.getElementsByTagName("script");
  for (var i = scripts.length - 1; nb > 0; i--) {
    head.removeChild(scripts[i]);
  }
}
function readcookie(ex) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(ex))
    .split("=")[1];
  return cookieValue;
}
function finished() {
  switch (readcookie("exploit")) {
    case "mira":
      mira_finished();
      break;
    case "payload":
      payload_finished();
      break;
    case "binloader":
      binloader_finished();
      break;
    case "jailbreak":
      jb_finished();
      break;
  }
}