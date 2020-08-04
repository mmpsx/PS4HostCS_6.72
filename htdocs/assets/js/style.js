if (fwVersion != null) {
  document.getElementById("firmware").innerHTML =
    '<span class="firmware">Firmware:' + " " + fwVersion + "</span>";
}
if (alertfirmware == true) {
  var msg =
    "ATTENTION! Nous avons détecté que votre PlayStation 4 fonctionne sous FW " +
    fwVersion +
    ", qui n'est pas compatible avec PS4HostCS";
  if (document.getElementById("menulist") != null) {
    document.getElementById("cache-overlay").style.display = "block";
    document.getElementById("menulist").style.display = "none";
    document.getElementById("alertfw").innerHTML =
      '<div class="red">' + msg + "</div>";
    setTimeout(function () {
      document.getElementById("cache-overlay").style.display = "none";
      document.getElementById("alertfw").innerHTML =
        '<div class="red">PS4HostCS a été désactiver</div>';
    }, 6000);
  }
}
/***********************Jailbreak***************************/
function jb_finished() {
  if (main_ret == 179 || main_ret == 0) {
    document.getElementById("cs-loader").style.display = "none";
    document.getElementById("message").innerText =
      "Votre PS4 est maintenant Jailbreak jusqu'au prochain redémarrage.";
    setTimeout(function () {
      document.getElementById("message").innerText = " ";
    }, 4000);
  } else {
    document.getElementById("message").innerText =
      "Le jailbreak a échoué! Cliquez sur Fermer le Navigateur, redémarrez votre PS4 et réessayez.";
  }
}
function load_JB() {
  document.getElementById("message").innerText = "Jailbreak en cours";
  document.getElementById("cs-loader").style.display = "block";
  document.cookie = "exploit=jailbreak";
  setTimeout(function () {
    var element = document.createElement("script");
    element.src = JB("jb");
    document.body.appendChild(element);
  }, 500);
}
/***********************Mirahen***************************/
function mira_finished() {
  setTimeout(function () {
    document.getElementById("message").innerText =
      "Mira + HEN est maintenant démarrer!";
    setTimeout(function () {
      document.getElementById("cs-loader").style.display = "none";
      document.getElementById("message").innerText = " ";
    }, 3000);
  }, 6000);
}

function load_mira() {
  setTimeout(function () {
    document.getElementById("message").innerHTML =
      "Injection de la charge utile";
    document.getElementById("cs-loader").style.display = "block";
    document.cookie = "exploit=mira";
    setTimeout(function () {
      var element = document.createElement("script");
      element.src = SCMIRA("mugiwaramirahen");
      document.getElementsByTagName("head")[0].appendChild(element);
      var element = document.createElement("script");
      element.src = SCMIRA("c-code");
      document.getElementsByTagName("head")[0].appendChild(element);
    }, 1000);
  }, 1000);
}
/***********************Payload***************************/
function payload_finished() {
  document.getElementById("message").innerHTML =
    "La charge utile a bien été injecter";
  setTimeout(function () {
    document.getElementById("message").innerHTML =
      "Démarrage de la la Charge utile";
    document.getElementById("cs-loader").style.display = "none";
    setTimeout(function () {
      document.getElementById("message").innerHTML = "";
      document.getElementById("cs-loader").style.display = "none";
      removeScript(2);
    }, 5000);
    removeScript(2);
  }, 5000);
}
function inject_payload(payload) {
  document.getElementById("message").innerHTML = "Injection de la charge utile";
  document.getElementById("cs-loader").style.display = "block";
  document.cookie = "exploit=payload";
  setTimeout(function () {
    let tab = [payload, "c-code"];
    for (let i = 0; i < tab.length; i++) {
      var element = document.createElement("script");
      if (i == 0) {
        element.src = PAYLOAD(tab[i]);
      } else {
        element.src = SCMIRA(tab[i]);
      }
      document.getElementsByTagName("head")[0].appendChild(element);
    }
  }, 1000);
}
/***********************Binloader***************************/
function binloader_finished() {
  document.getElementById("cs-loader").style.display = "none";
  document.getElementById("message").innerText = "Charge utile bien envoyé...";
  setTimeout(function () {
    document.getElementById("message").innerText =
      "Relancez Binloader pour une autre charge utile";
    setTimeout(function () {
      document.getElementById("message").innerText = " ";
      removeScript(2);
    }, 5000);
  }, 1000);
}
function load_binloader() {
  if (readcookie("exploit") != "null") {
   document.getElementById("message").innerHTML =
      "Vous venez d'activer Mira + Hen !!! Pour utiliser Binloader le Navigateur doit être Quittez par la touche PS d'abords.";
    setTimeout(function () {
      document.getElementById("message").innerHTML =
        "Veuillez Quitter le navigateur entre ces deux opération pour éviter ce message a l'avenir.";
      document.cookie = "exploit=null";
      setTimeout(function () {
        document.getElementById("message").innerHTML = "";
      }, 6000);
    }, 6000);
  } else {
    setTimeout(function () {
      document.getElementById("message").innerHTML =
        "Injection de la charge utile";
      document.getElementById("cs-loader").style.display = "block";

      setTimeout(function () {
        document.getElementById("message").innerText =
          "Utilisez PS4 Injector sur port 9021.Cliquez sur Connecter...";
        document.cookie = "exploit=binloader";
        setTimeout(function () {
          var element = document.createElement("script");
          element.src = SCMIRA("c-code");
          document.getElementsByTagName("head")[0].appendChild(element);
        }, 3000);
      }, 3000);
    }, 1000);
  }
}
