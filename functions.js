var i = 0;
(function () {
  window.applicationCache.ondownloading;
  window.applicationCache.onprogress = function (a) {
    document.getElementById("cache-overlay").style.display = "block";
    var progress = document.getElementById("progress");
    progress.innerHTML = '<div align="center" id="myBar"></div>';
    var elem = document.getElementById("myBar");
    i = Math.round(100 * (a.loaded / a.total));
    elem.style.width = i + "%";
    if (i == 0) {
      elem.innerHTML = "";
    } else {
      elem.innerHTML = i + "%";
    }
  };
  window.applicationCache.oncached = function () {
    document.getElementById("cache-overlay").style.display = "none";
    var message = document.getElementById("message");
    message.innerHTML =
      '<div align="center" style="color:green">Mise en cache réussi</div>';
    setTimeout(function () {
      message.innerHTML = " ";
    }, 2000);
  };
})();
function cssLink() {
  var link = document.createElement("meta");
  link.setAttribute("charset", "utf-8");
  document.getElementsByTagName("head")[0].appendChild(link);
  var Csslink = document.createElement("link");
  Csslink.rel = "stylesheet";
  Csslink.type = "text/css";
  Csslink.href = "./assets/css/style.css";
  document.getElementsByTagName("head")[0].appendChild(Csslink);
  
  
}
function wait() {
  var wait = document.getElementById("cs-loader");
  if (wait.style.display == "none") {
    wait.style.display = "block";
  } else {
    wait.style.display = "none";
  }
}
function removeScript(x) {
  var nb = x;
  var obj = document.getElementsByTagName("script");
  for (var i = obj.length - 1; nb > 0; i--) {
    document.body.removeChild(obj[i]);
    nb--;
  }
}
function lang() {
  var lang = document.getElementById("lang");
  lang.innerHTML = "";
}
function notif(message) {
  var notification = document.getElementById("message");
  notification.innerText = message;
}
function jb_finished() {
  if (main_ret == 179 || main_ret == 0) {
    wait();
    notif(
      "Votre PS4 est maintenant Jailbreak jusqu'au prochain redémarrage \n Patientez jusqu'à la notification \"Mémoire système insuffisante\""
    );
    setTimeout(function () {
      notif("Rechargement du Host");
    }, 3500);
    setTimeout(function () {
      document.location.href = ".";
      read_ptr_at(0);
    }, 4000);
  } else {
    notif(
      "Le jailbreak a échoué! Cliquez sur Fermer le Navigateur, redémarrez votre PS4 et réessayez."
    );
  }
}
function mira_finished() {
  wait();
  notif("Mira + HEN est maintenant démarrer!\nPatientez jusqu'à la notification \"Mémoire système insuffisante\"");
  removeScript(3);
  setTimeout(function () {
    document.location.href = ".";
    read_ptr_at(0);
    notif(" ");
  }, 6000);
}
function binloader_finished() {
  wait();
  notif("Charge utile bien envoyé...");


    read_ptr_at(0);

  removeScript(2);
}
function payload_finished() {
  wait();
  notif("La charge utile est prête!");
  removeScript(3);
  setTimeout(function () {
    notif(" ");
  }, 3000);
}
function SC(x) {
  return '<script src="' + x + '.js"></scr' + "ipt>";
}
function BINLOADER(x) {
  return SC("PAYLOADS/binloader/" + x);
}
function MIRA(x) {
  return SC("PAYLOADS/mirahen/" + x);
}
function MIRABASE(x) {
  return "PAYLOADS/mirahen/" + x + ".js";
}
function SCPAYLOAD(x) {
  return "PAYLOADS/" + x + ".js";
}
function JB(x) {
  return "jb/" + x + ".js";
}
function load_JB() {
  lang();
  wait();
  notif("Jailbreak en cours");
  var element = document.createElement("script");
  element.src = JB("c-code");
  document.body.appendChild(element);
}
function load_binloader() {
  lang();
  buildHTML();
  wait();
  notif("Injection de Binloader");
  setTimeout(function () {
    notif("En attente de charge utile...");
  }, 1000);
  document.write(BINLOADER("mira") + BINLOADER("c-code"));
}
function load_mira() {
  lang();
  buildHTML();
  wait();
  notif("Injection de Mira + HEN");
  document.write(MIRA("mira") + MIRA("mirahen") + MIRA("c-code"));
}
function inject_payload(payload) {
  lang();
  wait();
  notif("Injection de la charge utile");
  let tab = ["mira", payload, "c-code"];
  for (let i = 0; i < tab.length; i++) {
    var element = document.createElement("script");
    if(i == 0 || i == 2){
      element.src = MIRABASE(tab[i]);
    } else {
      element.src = SCPAYLOAD(tab[i]);
    }
    document.body.appendChild(element);
  }
}
function buildHTML() {
  if (document.getElementById("table") == null) {
    cssLink();
    document.write(
      "<body>" +
        "<header>" +
        '<div class="content-title">' +
        '<h1 id="title">Jailbreak Fw 6.72</h1>' +
        "</div>" +
        '<div class="container headerbtn" align="center" id="header">' +
        '<a href="#" class="btnHeader" onclick="load_JB(); return false">Jailbreak</a></th>' +
        '<a href="#" class="btnHeader" onclick="load_binloader(); return false">BinLoader</a></th>' +
        "</div>" +
        "</header>" +
        '<table id="table">' +
        '<tr align="center">' +
        '<th><a href="#" class="btn" onclick="load_mira(); return false">MIRA + HEN</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'dumper\'); return false">Dumper</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'app2usb\'); return false">App2Usb</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'ftp\'); return false">FTP</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'desabler\'); return false">Désactiver MAJ</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'enabler\'); return false">Activer MAJ</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'history\'); return false">Historique navigateur</a></th>' +
        "</tr>" +
        '<tr align="center">' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'browser\'); return false">Activer navigateur</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'backupDTB\'); return false">SAV DTB</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'restoreDTB\'); return false">Restaure DTB</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'rifs\'); return false">Rennomer RIF</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'dumperKernel\'); return false">Dumper Noyau</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'fan\'); return false">Ventilo Turbo</a></th>' +
        '<th><a href="#" class="btn" onclick="inject_payload(\'kernelClock\'); return false">Horloge noyau</a></th>' +
        "</tr>" +
        "</table>" +
        "<footer>" +
        '<div id="message" class="message"></div>' +
        '<div id="cs-loader" class="cs-loader" style="display:none">' +
        '<div class="cs-loader-inner">' +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "</div>" +
        "</div>" +
        "</footer>" +
        "</body>"
    );
    
  }
}
