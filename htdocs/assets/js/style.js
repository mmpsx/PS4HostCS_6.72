/***********************Définition des contantes**********************/
function injection() {
  setInnerText(message, "Injection de la charge utile");
}
function reception() {
  setInnerText(message, "La charge utile a bien été injecter");
}
const jbsucces =
  "Votre PS4 est maintenant Jailbreak jusqu'au prochain redémarrage.";
const jbfailed =
  "Le jailbreak a échoué! Cliquez sur Fermer le Navigateur, redémarrez votre PS4 et réessayez.";
const badFw =
  "ATTENTION! Nous avons détecté que votre PlayStation 4 fonctionne sous FW " +
  checkFw() +
  ", qui n'est pas compatible avec PS4HostCS";
const relaunchBinloader =
  "Relançez Binloader pour envoyer une autre charge utile";
const desactivateHost = "PS4HostCS a été désactivé";
const wait_pl = "En attente de charge utile";
const ready_pl = "est maintenant démarrer!";
const start_pl = "Démarrage de la la Charge utile";
const relaunch_for_mira =
  "Vous venez d'activer Mira + Hen !!! Pour utiliser Binloader le Navigateur doit être Quittez par la touche PS d'abords.";
const quit_navigator =
  "Veuillez Quitter le navigateur entre ces deux opération pour éviter ce message a l'avenir.";
const wait_pl_binloader =
  "Utilisez PS4 Injector sur port 9021.Cliquez sur Connecter...";
const alertSpoof = "Attention le spoof 8.00 a été détecté Actif";
const restartSystem =
  "Veuillez redémarrer le système pour le désactivé avant d'utiliser Mira Officiel";
const restartNavigator =
  "Veuillez redémarrer votre navigateur vour activer le spoof";
const threshold = "Seuil de Temp /";
const wait_jb = "Jailbreak en cours...";
const miraNoOfficial = "Mira non Officiel";
const miraOfficial = "Mira Officiel";
const overlay = document.getElementById("cache-overlay");
const menuList = document.getElementById("menulist");
const fanProgress = document.getElementById("fanprogress");
const alertFw = document.getElementById("alertfw");
const csLoader = document.getElementById("cs-loader");
const message = document.getElementById("message");
const firmware = document.getElementById("firmware");
const fanprogress = document.getElementById("fanprogress");

/***********************Définition des variables**********************/
let level = 0;
let spoof = false;
displayFan();
displayFirmware();
/***********************Firmware non compatible***********************/
if (alertfirmware == true) {
  if (document.getElementById("menulist") != null) {
    displayBlock(overlay);
    displayNone(menuList);
    displayNone(fanProgress);
    setInnerHTML(alertFw, '<div class="red">' + badFw + "</div>");
    setTimeout(function () {
      displayNone(overlay);
      setInnerHTML(alertFw, '<div class="red">' + desactivateHost + "</div>");
    }, 6000);
  }
}
/********************Notification réception payload*******************/
function pl_loaded() {
  if (exploit === "Binloader") setInnerText(message, wait_pl_binloader);
  else reception();
  setTimeout(function () {
    setInnerText(message, start_pl);
    setTimeout(function () {
      if (exploit === "Binloader") setInnerText(message, relaunchBinloader);
      else setInnerText(message, exploit + " " + ready_pl);
      if (spoof === true) setInnerText(message, restartNavigator);
      setTimeout(function () {
        displayNone(csLoader);
        setInnerText(message, "");
      }, 3000);
      if (exploit === "Binloader") exploit = null;
    }, 3000);
  }, 5000);
}
/**************************Injection terminée*************************/
function finished() {
  switch (exploit) {
    case "Mira Officiel":
      pl_loaded();
      removeScript(2);
      break;
    case "Mira non Officiel":
      spoof = true;
      pl_loaded();
      removeScript(2);
      break;
    case "Binloader":
      removeScript(2);
      break;
    case "Jailbreak":
      if (main_ret == 179 || main_ret == 0) {
        displayNone(csLoader);
        setInnerText(message, jbsucces);
        setTimeout(function(){
          setInnerText(message, "");
        },3000)
      } else setInnerText(message, jbfailed);
      break;
    default:
      pl_loaded();
      removeScript(2);
      break;
  }
}
/****************************Affichage du Firmware****************** */
function displayFirmware() {
  if (checkFw() === "8.00")
    setInnerHTML(
      firmware,
      '<span class="firmware">Spoof:' + " " + checkFw() + "</span>"
    );
  else
    setInnerHTML(
      firmware,
      '<span class="firmware">Firmware:' + " " + checkFw() + "</span>"
    );
}
/***********************Jailbreak***************************/
function load_JB() {
  setInnerText(message, wait_jb);
  displayBlock(csLoader);
  exploit = "Jailbreak";
  setTimeout(function () {
    let func = JB("jb");
    newScript(func);
  }, 500);
}
function spoofed() {
  if (checkFw() === "8.00") {
    setInnerText(message, alertSpoof);
    setTimeout(function () {
      setInnerText(message, restartSystem);
      setTimeout(function () {
        setInnerText(message, "");
        displayNone(csLoader);
      }, 5000);
    }, 4000);
    return true;
  } else {
    return false;
  }
}
/***********************Mirahen***************************/
function load_mira(version) {
  setTimeout(function () {
    injection();
    displayBlock(csLoader);
    setTimeout(function () {
      let func2 = SCMIRA("c-code");
      let func1 = "";
      if (version == "noofficial") {
        exploit = miraNoOfficial;
        func1 = SCMIRA("noofficial");
        newScript(func1);
        newScript(func2);
      } else if (version == "official") {
        if (spoofed() === false) {
          exploit = miraOfficial;
          func1 = SCMIRA("official");
          newScript(func1);
          newScript(func2);
        }
      }
    }, 1000);
  }, 1000);
}
/***********************Payload***************************/
function inject_payload(payload) {
  injection();
  displayBlock(csLoader);
  exploit = payload;
  setTimeout(function () {
    loadPayload(payload);
  }, 500);
}
/***********************Binloader***************************/
function load_binloader() {
  if (exploit != null) {
    exploit = null;
    setInnerText(message, relaunch_for_mira);
    setTimeout(function () {
      setInnerText(message, quit_navigator);
      setTimeout(function () {
        setInnerText(message, "");
      }, 6000);
    }, 6000);
  } else {
    setTimeout(function () {
      injection();
      displayBlock(csLoader);
      setTimeout(function () {
        setInnerText(message, wait_pl);
        exploit = "Binloader";
        setTimeout(function () {
          let func = SCMIRA("c-code");
          newScript(func);
        }, 3000);
      }, 3000);
    }, 1000);
  }
}
/*********************affichage selection seuil************* */
function displayFan() {
  let barfan = '<div id="fan">';
  switch (readcookie("fan")) {
    case "53":
      level = 1;
      break;
    case "54":
      level = 2;
      break;
    case "55":
      level = 3;
      break;
    case "56":
      level = 4;
      break;
    case "57":
      level = 5;
      break;
    case "58":
      level = 6;
      break;
    case "59":
      level = 7;
      break;
    case "60":
      level = 8;
      break;
    case "61":
      level = 9;
      break;
    case "62":
      level = 10;
      break;
  }
  setInnerHTML(fanprogress, barFan(barfan, level));
  setCookieLevel();
}

/************************Selecteur de seuil***********************/
function setCookieLevel() {
  let tabLevel = fanProgress.getElementsByTagName("button");
  for (let i = 0; i < tabLevel.length; i++) {
    let id = tabLevel[i].id;
    document.getElementById(id).addEventListener("click", function () {
      switch (id.split("b")[0]) {
        case "0":
          modifyCookie("fan", "53");
          modifyCookie("levelTemp", "53");
          break;
        case "1":
          modifyCookie("fan", "54");
          modifyCookie("levelTemp", "54");
          break;
        case "2":
          modifyCookie("fan", "55");
          modifyCookie("levelTemp", "55");
          break;
        case "3":
          modifyCookie("fan", "56");
          modifyCookie("levelTemp", "56");
          break;
        case "4":
          modifyCookie("fan", "57");
          modifyCookie("levelTemp", "57");
          break;
        case "5":
          modifyCookie("fan", "58");
          modifyCookie("levelTemp", "58");
          break;
        case "6":
          modifyCookie("fan", "59");
          modifyCookie("levelTemp", "59");
          break;
        case "7":
          modifyCookie("fan", "60");
          modifyCookie("levelTemp", "60");
          break;
        case "8":
          modifyCookie("fan", "61");
          modifyCookie("levelTemp", "61");
          break;
        case "9":
          modifyCookie("fan", "62");
          modifyCookie("levelTemp", "62");
          break;
      }
      displayFan();
      inject_payload("Fancontrol");
    });
  }
}
