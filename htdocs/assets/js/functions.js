function readcookie(ex) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(ex))
    .split("=")[1];
  return cookieValue;
}

function removeScript(x) {
  var nb = x;
  var obj = document.getElementsByTagName("script");
  for (var i = obj.length - 1; nb > 0; i--) {
    document.body.removeChild(obj[i]);
    nb--;
  }
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
