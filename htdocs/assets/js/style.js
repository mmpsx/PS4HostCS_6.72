/***********************Définition des variables**********************/
let level = 0;
let spoof = false;
let title = document.getElementsByTagName("title");
let version = "2.0.7";
let exploit = null;
/*********************Définition des contantes**********************/
const menuList = document.getElementById("menulist");
const fanProgress = document.getElementById("fanprogress");
const csLoader = document.getElementById("cs-loader");
const firmware = document.getElementById("firmware");
const fanprogress = document.getElementById("fanprogress");
const displayLangue = document.getElementById("language");
const menu = document.getElementById("menulist");
const choiceLang = document.getElementById("choicelangue");
const overlay = document.getElementById("cache-overlay");
displayFan();
displayFirmware();
/***********************Firmware non compatible***********************/
if (alertfirmware == true) {
  if (document.getElementById("menulist") != null) {
    displayBlock(overlay);
    displayNone(menuList);
    displayNone(fanProgress);
    setInnerHTML(
      message,
      '<div class="red">' +
        tabJSON[0][defaultLangue].badFw +
        checkFw() +
        tabJSON[0][defaultLangue].badFw2 +
        "</div>"
    );
    setTimeout(function () {
      displayNone(overlay);
      setInnerHTML(
        message,
        '<div class="red">' +
          tabJSON[0][defaultLangue].desactivateHost +
          "</div>"
      );
    }, 6000);
  }
}
/********************Notification réception payload*******************/
function pl_loaded() {
  if (exploit === "Binloader")
    setInnerText(message, tabJSON[0][defaultLangue].wait_pl_binloader);
  else reception();
  setTimeout(function () {
    setInnerText(message, tabJSON[0][defaultLangue].start_pl);
    setTimeout(function () {
      if (exploit === "Binloader")
        setInnerText(message, tabJSON[0][defaultLangue].relaunchBinloader);
      else
        setInnerText(
          message,
          exploit + " " + tabJSON[0][defaultLangue].ready_pl
        );
      if (spoof === true)
        setInnerText(message, tabJSON[0][defaultLangue].restartNavigator);
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
      pl_loaded();
      removeScript(2);
      break;
    case "Jailbreak":
      if (main_ret == 179 || main_ret == 0) {
        displayNone(csLoader);
        setInnerText(message, tabJSON[0][defaultLangue].jbsuccess);
        setTimeout(function () {
          setInnerText(message, "");
        }, 3000);
      } else setInnerText(message, tabJSON[0][defaultLangue].jbfailed);
      removeScript(1);
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
  setInnerText(message, tabJSON[0][defaultLangue].wait_jb);
  displayBlock(csLoader);
  exploit = "Jailbreak";
  setTimeout(function () {
    let func = JB("jb");
    newScript(func);
  }, 500);
}
function spoofed() {
  if (checkFw() === "8.00") {
    setInnerText(message, tabJSON[0][defaultLangue].alertSpoof);
    setTimeout(function () {
      setInnerText(message, tabJSON[0][defaultLangue].restartSystem);
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
        exploit = tabJSON[0][defaultLangue].miraNoOfficial;
        func1 = SCMIRA("noofficial");
        newScript(func1);
        newScript(func2);
      } else if (version == "official") {
        if (spoofed() === false) {
          exploit = tabJSON[0][defaultLangue].miraOfficial;
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
    setInnerText(message, tabJSON[0][defaultLangue].relaunch_for_mira);
    setTimeout(function () {
      setInnerText(message, tabJSON[0][defaultLangue].quit_navigator);
      setTimeout(function () {
        setInnerText(message, "");
      }, 6000);
    }, 6000);
  } else {
    exploit = "Binloader";
    injection();
    displayBlock(csLoader);
    setTimeout(function () {
      setInnerText(message, tabJSON[0][defaultLangue].wait_pl);
      setTimeout(function () {
        setInnerText(message, tabJSON[0][defaultLangue].wait_pl_binloader);
        setTimeout(function () {
          let func = BINLOADER("c-code");
          newScript(func);
        }, 500);
      }, 3000);
    }, 1000);
  }
}
/*********************affichage selection seuil************* */
function displayFan() {
  let barfan = '<div id="fan">';
  switch (readCookie("fan")) {
    case "56":
      level = 1;
      break;
    case "57":
      level = 2;
      break;
    case "58":
      level = 3;
      break;
    case "59":
      level = 4;
      break;
    case "60":
      level = 5;
      break;
    case "61":
      level = 6;
      break;
    case "62":
      level = 7;
      break;
    case "63":
      level = 8;
      break;
    case "64":
      level = 9;
      break;
    case "65":
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
          modifyCookie("fan", "56");
          modifyCookie("levelTemp", "56");
          break;
        case "1":
          modifyCookie("fan", "57");
          modifyCookie("levelTemp", "57");
          break;
        case "2":
          modifyCookie("fan", "58");
          modifyCookie("levelTemp", "58");
          break;
        case "3":
          modifyCookie("fan", "59");
          modifyCookie("levelTemp", "59");
          break;
        case "4":
          modifyCookie("fan", "60");
          modifyCookie("levelTemp", "60");
          break;
        case "5":
          modifyCookie("fan", "61");
          modifyCookie("levelTemp", "61");
          break;
        case "6":
          modifyCookie("fan", "62");
          modifyCookie("levelTemp", "62");
          break;
        case "7":
          modifyCookie("fan", "63");
          modifyCookie("levelTemp", "63");
          break;
        case "8":
          modifyCookie("fan", "64");
          modifyCookie("levelTemp", "64");
          break;
        case "9":
          modifyCookie("fan", "65");
          modifyCookie("levelTemp", "65");
          break;
      }
      displayFan();
      inject_payload("Fancontrol");
    });
  }
}
/************************Définition de la langue**********************/
function loadHTML() {
  if (menu) {
    title[0].innerHTML =
      "PS4HostCS" +
      " V " +
      version +
      " " +
      plLangue() +
      " " +
      tabJSON[0][defaultLangue].compagnie;
    setInnerHTML(menu, buildHTML());
  }
}
function selectLang() {
  switch (readCookie("language")) {
    case "french":
      defaultLangue = 0;
      break;
    case "english":
      defaultLangue = 1;
      break;
  }
  loadHTML();
}
function checklang(langue) {
  let french = null,
    english = null;
  if (document.getElementById("french"))
    french = document.getElementById("french");
  if (document.getElementById("english"))
    english = document.getElementById("english");
  switch (langue) {
    case "french":
      languncheck(english);
      createCookie("language", "french");
      break;
    case "english":
      languncheck(french);
      createCookie("language", "english");
      break;
  }
  selectLang();
}
function displayCheckBox() {
  if (displayLangue) {
    setInnerHTML(
      displayLangue,
      '<label for="french">Français:</label>' +
        '<input type="checkbox" class="checkbox" id="french" onclick="checklang(\'french\')">' +
        '<label for="english">English:</label>' +
        '<input type="checkbox" class="checkbox" id="english" onclick="checklang(\'english\')"></input>'
    );
  }
  choiceLang.addEventListener("mouseover", function () {
    displayLangue.classList.remove("hidelanguage");
    displayLangue.classList.add("showlanguage");
  });
  choiceLang.addEventListener("mouseout", function () {
    displayLangue.classList.remove("showlanguage");
    displayLangue.classList.add("hidelanguage");
  });
  displayLangue.addEventListener("mouseover", function () {
    displayLangue.classList.remove("hidelanguage");
    displayLangue.classList.add("showlanguage");
  });
  displayLangue.addEventListener("mouseout", function () {
    displayLangue.classList.remove("showlanguage");
    displayLangue.classList.add("hidelanguage");
  });
}
function buildHTML() {
  let buildHTML =
    '<ul id="menu">' +
    '<li id="li0"><a href="#" class="deroulant" id="scrolling_menu0">' +
    tabJSON[2][defaultLangue].exploit +
    "</a>" +
    '<ul class="submenu" id="submenu0">' +
    '<li><a href="#" class="custom-btn btn" onclick="load_JB(); return false">' +
    tabJSON[1][defaultLangue].jb +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="load_mira(\'noofficial\'); return false">' +
    tabJSON[1][defaultLangue].mira +
    "</a>" +
    "</li>" +
    '<li><a href="#" class="custom-btn btn" onclick="load_mira(\'official\'); return false">' +
    tabJSON[1][defaultLangue].mira2 +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="load_binloader(); return false">' +
    tabJSON[1][defaultLangue].binload +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Todex\'); return false">' +
    tabJSON[1][defaultLangue].dex +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Linux\'); return false">' +
    tabJSON[1][defaultLangue].linux +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li1"><a href="#" class="deroulant" id="scrolling_menu1">' +
    tabJSON[2][defaultLangue].system +
    "</a>" +
    '<ul class="submenu" id="submenu1">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'DumperKernel\'); return false">' +
    tabJSON[1][defaultLangue].dumperkernel +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'KernelClock\'); return false">' +
    tabJSON[1][defaultLangue].kernelclock +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'BackupDTB\'); return false">' +
    tabJSON[1][defaultLangue].backupDTB +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'RestoreDTB\'); return false">' +
    tabJSON[1][defaultLangue].restoreDTB +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li2"><a href="#" class="deroulant" id="scrolling_menu2">' +
    tabJSON[2][defaultLangue].nav +
    "</a>" +
    '<ul class="submenu" id="submenu2">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'History\'); return false">' +
    tabJSON[1][defaultLangue].history +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Browser\'); return false">' +
    tabJSON[1][defaultLangue].browser +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li3"><a href="#" class="deroulant" id="scrolling_menu3">' +
    tabJSON[2][defaultLangue].app +
    "</a>" +
    '<ul class="submenu" id="submenu3">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'HenVTX\'); return false">' +
    tabJSON[1][defaultLangue].henvtx +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'HenVTX_2.1.5\'); return false">' +
    tabJSON[1][defaultLangue].hennoofficial +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Dumper\'); return false">' +
    tabJSON[1][defaultLangue].dumper +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'App2usb\'); return false">' +
    tabJSON[1][defaultLangue].app2usb +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'rifs\'); return false">' +
    tabJSON[1][defaultLangue].rifs +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'WebRTE\'); return false">' +
    tabJSON[1][defaultLangue].webrte +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li4"><a href="#" class="deroulant" id="scrolling_menu4">' +
    tabJSON[2][defaultLangue].ftp +
    "</a>" +
    '<ul class="submenu" id="submenu4">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Ftp\'); return false">' +
    tabJSON[1][defaultLangue].ftp +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li5"><a href="#" class="deroulant" id="scrolling_menu5">' +
    tabJSON[2][defaultLangue].update +
    "</a>" +
    '<ul class="submenu" id="submenu5">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Desabler\'); return false">' +
    tabJSON[1][defaultLangue].enabler +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Enabler\'); return false">' +
    tabJSON[1][defaultLangue].desabler+
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li5"><a href="#" class="deroulant" id="scrolling_menu6">' +
    tabJSON[2][defaultLangue].ps4trainer +
    "</a>" +
    '<ul class="submenu" id="submenu5">' +
    '<li><a class="custom-btn btn" href="http://ps4trainer.com/Trainer/index.html">' +
    tabJSON[1][defaultLangue].ps4trainer +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    "</ul>";
  return buildHTML;
}
loadHTML();
displayCheckBox();
