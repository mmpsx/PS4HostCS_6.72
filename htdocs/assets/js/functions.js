
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
    document.getElementById("message").innerHTML =
      '<div align="center" style="color:green">Mise en cache réussi</div>';
    setTimeout(function () {
      message.innerHTML = " ";
    }, 2000);
  };
})();

function removeScript(x) {
  var nb = x;
  var obj = document.getElementsByTagName("script");
  for (var i = obj.length - 1; nb > 0; i--) {
    document.body.removeChild(obj[i]);
    nb--;
  }
}
function readcookie() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("exploit"))
    .split("=")[1];
  return cookieValue;
}
function finished() {
  switch (readcookie()) {
    case "mira":
      mira_finished();
      break;
    case "payload":
      payload_finished();
      break;
    case "binloader":
      binloader_finished();
      break;
    case "webkit":
      alert(cookieValue);
      break;
    case "jailbreak":
      jb_finished();
      break;
  }
}

function jb_finished() {
  if (main_ret == 179 || main_ret == 0) {
    document.getElementById("cs-loader").style.display = "none";
    document.getElementById("message").innerText =
      "Votre PS4 est maintenant Jailbreak jusqu'au prochain redémarrage.";
    setTimeout(function () {
      document.getElementById("message").innerText = " ";
      //removeScript(1);
    }, 4000);
  } else {
    document.getElementById("message").innerText =
      "Le jailbreak a échoué! Cliquez sur Fermer le Navigateur, redémarrez votre PS4 et réessayez.";
  }
}
function binloader_finished() {
  document.getElementById("cs-loader").style.display = "none";
  document.getElementById("message").innerText = "Charge utile bien envoyé...";
  setTimeout(function () {
    document.getElementById("message").innerText =
      "Relancez Binloader pour une autre charge utile";
    setTimeout(function () {
      document.getElementById("message").innerText = " ";
      removeScript(2);
    }, 3000);
  }, 3000);
}
function mira_finished() {
  document.getElementById("cs-loader").style.display = "none";
  setTimeout(function () {
    document.getElementById("message").innerText =
      "Mira + HEN est maintenant démarrer!";
    setTimeout(function () {
      document.getElementById("message").innerText = " ";
      removeScript(3);
    }, 3000);
  }, 6000);
}

function payload_finished() {
  document.getElementById("message").innerText = "La charge utile est prête!";
  setTimeout(function () {
    document.getElementById("message").innerText = " ";
    document.getElementById("cs-loader").style.display = "none";
    /*commentez la fonction suivante sur un reseau local ("type: miniweb") pour une meilleure utilisation sans les message type "mémoire système insuffisante". Ne convient pas en mode Cache 
    //
    comment the following function on a local network ("type: miniweb") for better use without "insufficient system memory" type messages. Not suitable in Cache mode*/
    //

    //read_ptr_at(0);

    removeScript(3);
  }, 5000);
}
function load_JB() {
  document.getElementById("message").innerText = "Jailbreak en cours";
  document.getElementById("cs-loader").style.display = "block";
  setTimeout(function () {
    var element = document.createElement("script");
    element.src = JB("c-code");
    document.body.appendChild(element);
  }, 2000);
}

function load_binloader() {
  if (readcookie() == "payload") {
    read_ptr_at(0);
    document.cookie = "exploit=binloader";
  } else {
    buildHTML();
    document.getElementById("message").innerText = "Injection de Binloader";
    document.getElementById("cs-loader").style.display = "block";
    setTimeout(function () {
      document.getElementById("message").innerText =
        "Utilisez PS4 Injector sur port 9021.Cliquez sur Connecter...";
      setTimeout(function () {
        document.getElementById("message").innerText =
          'Attendez la notification "Wait for clients"';
        setTimeout(function () {
          document.getElementById("message").innerText =
            "En attente de charge utile";

          setTimeout(function () {
            document.write(BINLOADER("mira") + BINLOADER("c-code"));
          }, 1000);
        }, 4000);
      }, 4000);
    }, 4000);
  }
}
function load_mira() {
  document.cookie = "exploit=mira";
  buildHTML();
  document.getElementById("message").innerText = "Injection de Mira + HEN";
  document.getElementById("cs-loader").style.display = "block";
  setTimeout(function () {
    document.write(MIRA("mira") + MIRA("mirahen") + MIRA("c-code"));
  }, 1000);
}

function inject_payload(payload) {
  document.cookie = "exploit=payload";
  buildHTML();
 
  setTimeout(function () {
    document.getElementById("message").innerHTML = "Injection de la charge utile";
    document.getElementById("cs-loader").style.display = "block";
    setTimeout(function () {

      document.write(MIRA("mira") + SCPAYLOAD(payload) + MIRA("c-code"));
    }, 100);
  }, 500);
}

function buildHTML() {
  if (document.getElementById("listmenu") == null) {
    document.write("<head>" +
        '<meta charset="utf-8" />' +
        '<link rel="stylesheet" href="./assets/css/style.css">' +
        "<title>PS4HostCS V2.0.2 par Logic-68 C.S</title>" +
        '<script src="./assets/js/functions.js"></script>' +
        "</head>" +
        "<body>" +
        '<header id="header">' +
        '<div class="content-title">' +
        '<h1 id="title">Jailbreak</h1>' +
        "</div>" +
        "</header>" +
        '<div class="container" id="listmenu">' +
        '<ul id="menu" >' +
        '<li id="li0"><a href="#" class="deroulant" id="deroulant0" >Exploits</a>' +
        '<ul class="submenu" id="submenu0">' +
        '<li><a href="#" id="jailbreak" class="submenua" onclick="load_JB(); return false">Jailbreak</a></li>' +
        '<li><a href="#" id="mirahen" class="submenua" onclick="load_mira(); return false">Mira+HEN</a></li>' +
        '<li><a href="#" id="binloader" class="submenua" onclick="load_binloader(); return false">Binloader</a></li>' +
        ' <li><a href="#" id="binloader" class="submenua" onclick="inject_payload(\'todex\'); return false">DEX</a></li>' +
        "</ul>" +
        "</li>" +
        '<li id="li1"><a href="#" class="deroulant" id="deroulant1">Système</a>' +
        '<ul class="submenu" id="submenu1">' +
        '<li><a href="#" id="dumperkernel" onclick="inject_payload(\'dumperKernel\'); return false">Dumper Noyau</a></li>' +
        '<li><a href="#" id="kernelclock" onclick="inject_payload(\'kernelClock\'); return false">Horloge Noyau</a></li>' +
        '<li><a href="#" id="fan" onclick="inject_payload(\'fan\'); return false">Ventilo Turbo</a></li>' +
        "</ul>" +
        "</li>" +
        '<li id="li2"><a href="#" class="deroulant" id="deroulant2">Navigateur</a>' +
        '<ul class="submenu" id="subnavigator">' +
        '<li><a href="#" id="history" onclick="inject_payload(\'history\'); return false">Activer Historique</a></li>' +
        '<li><a href="#" id="browser" onclick="inject_payload(\'browser\'); return false">Activer Navigateur</a></li>' +
        "</ul>" +
        "</li>" +
        '<li id="li3"><a href="#" class="deroulant" id="deroulant3">Applications</a> ' +
        '<ul class="submenu" id="subapplication">' +
        '<li><a href="#" id="dumper" onclick="inject_payload(\'dumper\'); return false">Dumper</a></li>' +
        '<li><a href="#" id="app2usb" onclick="inject_payload(\'app2usb\'); return false">App2Usb</a></li>' +
        '<li><a href="#" id="rifs" onclick="inject_payload(\'rifs\'); return false">Renomer RIF</a></li>' +
        "</ul>" +
        "</li>" +
        '<li id="li4"><a href="#" class="deroulant" id="deroulant4">FTP</a>' +
        '<ul class="submenu" id="subftp">' +
        '<li><a href="#" id="ftp"  onclick="inject_payload(\'ftp\'); return false">FTP VTX</a></li>' +
        "</ul>" +
        "</li>" +
        '<li id="li5"><a href="#" class="deroulant" id="deroulant5">Mise à jour</a>' +
        '<ul class="submenu" id="subupdate">' +
        '<li><a href="#" id="enabler"  onclick="inject_payload(\'desabler\'); return false">Activer</a></li>' +
        '<li><a href="#" id="desabler" onclick="inject_payload(\'enabler\'); return false">Désactiver</a></li>' +
        "</ul>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "<footer>" +
        '<div id="message" class="message"></div>' +
        '<div id="cs-loader" class="cs-loader">' +
        '<div class="cs-loader-inner">' +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "<label></label>" +
        "</div>" +
        "</div>" +
        '<div class="overlay" id="cache-overlay">' +
        '<div id="progress"></div>' +
        "</div>" +
        "</footer>" +
        '<script src="./assets/js/jquery-3.3.1.min.js"></script>' +
        "</body>"
    );
  }
}

/*
function cssLink() {
  var link = document.createElement("meta");
  link.setAttribute("charset", "utf-8");
  var Csslink = document.createElement("link");
  Csslink.rel = "stylesheet";
  Csslink.type = "text/css";
  Csslink.href = "./assets/css/style.css";
  document.getElementsByTagName("head")[0].appendChild(Csslink);
  document.getElementsByTagName("head")[0].appendChild(link);
}*/