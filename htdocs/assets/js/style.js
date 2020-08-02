let fwVersion = "6.72";
var i = 0;
(function(){
  /*var ua = navigator.userAgent;
    var fwVersion = ua.substring(ua.indexOf("5.0 (") + 19, ua.indexOf(") Apple"));*/
  document.getElementById("firmware").innerHTML = '<span class="firmware">Firmware:' + " " + fwVersion + "</span>";
  alertEnvironment();

  return fw;
})();

function alertEnvironment() {
    

  if (fwVersion == "6.72") {
    
    window.applicationCache.ondownloading = function(){
        var msg = "Toutes nos félicitations! Nous avons détecté que votre PlayStation 4 fonctionne sous FW " +fwVersion +", qui est compatible avec PS4Host";

        document.getElementById("alertfw").innerHTML = '<div class="green">' + msg + '</div>';
    };
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

  } else if(fwVersion == "5.05"){
    var msg = "ATTENTION! Nous avons détecté que votre PlayStation 4 fonctionne sous FW " +fwVersion +", qui n'est pas compatible avec cette version de PS4Host";
    
    document.getElementById("alertfw").innerHTML = '<div class="orange">' + msg + '</div>';
    document.getElementById("menulist").innerHTML = "";
  }
  else {
    var msg = "ATTENTION! Nous avons détecté que votre PlayStation 4 fonctionne sous FW " +fwVersion +", qui n'est pas compatible avec PS4Host";
    
    document.getElementById("alertfw").innerHTML = '<div class="red">' + msg + '</div>';
    document.getElementById("menulist").innerHTML = "";
  }
  setTimeout(function () {
    document.getElementById("alertfw").innerText = " ";
  }, 7000);
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
    document.getElementById("message").innerHTML =
      "Injection de la charge utile";
    document.getElementById("cs-loader").style.display = "block";
    setTimeout(function () {
      document.write(MIRA("mira") + SCPAYLOAD(payload) + MIRA("c-code"));
    }, 100);
  }, 500);
}

function buildHTML() {
  if (document.getElementById("listmenu") == null) {
    document.write(
      "<head>" +
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
        '<div id="message" class="message"></div>' +
        "<footer>" +
        "<hr>" +
        '<span class="hide" id="hide">Firmware:<script>document.write(getEnvironmentInfo());</script>' +
        "</span>" +
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
        '<script src="./assets/js/style.js"></script>' +
        '<script src="./assets/js/jquery-3.3.1.min.js"></script>' +
        "</body>"
    );
  }
}
