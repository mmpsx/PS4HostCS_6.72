/***********************Définition des variables**********************/
let level = 0;
let spoof = false;
let title = document.getElementsByTagName("title");
let version = "2.0.8";
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

let scrollings = [];
scrolling = [scrolls];
for (let i = 0; i < scrolling.length; i++) { 
  scrollings[i] = JSON.parse(scrolling[i]); 
}

let payloads = [];
pl = [pls];
for (let i = 0; i < pl.length; i++) { 
  payloads[i] = JSON.parse(pl[i]); 
}

let home = [];
datas = [data];
for (let i = 0; i < datas.length; i++) { 
  home[i] = JSON.parse(datas[i]); 
}


displayFan();
displayFirmware();

/***************Display BarFan************************************/
function barFan(barfan, level) {
  for (let i = 0; i < level; i++)
    barfan += '<button id="' + i + 'btn" class="level"></button>';
  for (let i = level; i < 10; i++)
    barfan += '<button id="' + i + 'btn" class="levelclear"></button>';
  return (barfan +=
    '</div><div id="writelevel">' +
    home[0][defaultLangue].threshold +
    readCookie("levelTemp") +
    "°" +
    "</div>");
}
function injection() {
  setInnerText(message, home[0][defaultLangue].inject);
}
function reception() {
  setInnerText(message, home[0][defaultLangue].injectwell);
}
/**********************Request*************************************/
function requestLangueServer() {
//const serverLangue = JSON.parse(server);
const url = 'http://' + location.host;
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method: 'post',
      body: JSON.stringify({"langue" : defaultLangue})
  }).then(function(response) {
      console.log(response);
  
  }).catch(function(error) {
      console.log(error);
  })
}
function requestIp() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://" + location.host + "/ip", true);
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      let boxid = document.getElementById("boxip");
      if (xhr.status === 200) {
        let address = JSON.parse(xhr.response);
        address.forEach((key) => {
          let object = key;
          for (const property in object) {

            if(property == "PS4"){
              localStorage.setItem(property, object[property]);
            }
            boxid.innerHTML += `<div class="lan">${property} : ${object[property]}</div>`;
          }
        });
      } else {
        if(localStorage.getItem("PS4")){
          boxid.innerHTML += `<div class="lan">PS4 : ${localStorage.getItem("PS4")}</div>`;
        } else {
          boxid.innerHTML +=
          '<div class="lan">PS4 : N/A</div>';
        }
         boxid.innerHTML +=
          '<div class="lan">PS4HostCS : <span style="color:red">N/A</span></div>';
          boxid.innerHTML +=
          '<div class="lan">Cache : <span style="color:green">' + home[0][defaultLangue].cached + '</span></div>';
      }
    }
  };
  xhr.send(null);
}
requestIp();
/***********************Firmware not compatible***********************/
if (alertfirmware == true) {
  if (document.getElementById("menulist") != null) {
    displayBlock(overlay);
    displayNone(menuList);
    displayNone(fanProgress);
    setInnerHTML(
      message,
      '<div class="red">' +
        home[0][defaultLangue].badFw +
        checkFw() +
        home[0][defaultLangue].badFw2 +
        "</div>"
    );
    setTimeout(function () {
      displayNone(overlay);
      setInnerHTML(
        message,
        '<div class="red">' +
          home[0][defaultLangue].desactivateHost +
          "</div>"
      );
    }, 6000);
  }
}
/********************Receipt notification payload*******************/
function pl_loaded() {
  if (exploit === "Binloader")
    setInnerText(message, home[0][defaultLangue].wait_pl_binloader);
  else reception();
  setTimeout(function () {
    setInnerText(message, home[0][defaultLangue].start_pl);
    setTimeout(function () {
      if (exploit === "Binloader")
        setInnerText(message, home[0][defaultLangue].relaunchBinloader);
      else
        setInnerText(
          message,
          exploit + " " + home[0][defaultLangue].ready_pl
        );
      if (spoof === true)
        setInnerText(message, home[0][defaultLangue].restartNavigator);
      setTimeout(function () {
        displayNone(csLoader);
        setInnerText(message, "");
      }, 3000);
      if (exploit === "Binloader") exploit = null;
    }, 3000);
  }, 5000);
}
/**************************Injection completed*************************/
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
        setInnerText(message, home[0][defaultLangue].jbsuccess);
        setTimeout(function () {
          setInnerText(message, "");
        }, 3000);
      } else setInnerText(message, home[0][defaultLangue].jbfailed);
      removeScript(1);
      break;
    default:
      pl_loaded();
      removeScript(2);
      break;
  }
}
/****************************Firmware display****************** */
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
  setInnerText(message, home[0][defaultLangue].wait_jb);
  displayBlock(csLoader);
  exploit = "Jailbreak";
  setTimeout(function () {
    let func = JB("jb");
    newScript(func);
  }, 500);
}
function spoofed() {
  if (checkFw() === "8.00") {
    setInnerText(message, home[0][defaultLangue].alertSpoof);
    setTimeout(function () {
      setInnerText(message, home[0][defaultLangue].restartSystem);
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
        exploit = home[0][defaultLangue].miraNoOfficial;
        func1 = SCMIRA("noofficial");
        newScript(func1);
        newScript(func2);
      } else if (version == "official") {
        if (spoofed() === false) {
          exploit = home[0][defaultLangue].miraOfficial;
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
    setInnerText(message, home[0][defaultLangue].relaunch_for_mira);
    setTimeout(function () {
      setInnerText(message, home[0][defaultLangue].quit_navigator);
      setTimeout(function () {
        setInnerText(message, "");
      }, 6000);
    }, 6000);
  } else {
    exploit = "Binloader";
    injection();
    displayBlock(csLoader);
    setTimeout(function () {
      setInnerText(message, home[0][defaultLangue].wait_pl);
      setTimeout(function () {
        setInnerText(message, home[0][defaultLangue].wait_pl_binloader);
        setTimeout(function () {
          let func = BINLOADER("c-code");
          newScript(func);
        }, 500);
      }, 3000);
    }, 1000);
  }
}
/*********************Display threshold selection************* */
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

/************************Threshold selector***********************/
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
/************************Language definition**********************/
function loadHTML() {
  if (menu) {
    title[0].innerHTML =
      "PS4HostCS" +
      " V " +
      version +
      " " +
      plLangue() +
      " " +
      home[0][defaultLangue].compagnie;
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
  requestLangueServer();
}
/************************Check Language****************************/
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
/********************Display checkbox Language********************/
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
/*******************Build Menu**********************************/
function buildHTML() {
  let buildHTML =
    '<ul id="menu">' +
    '<li id="li0"><a href="#" class="deroulant" id="scrolling_menu0">' +
    scrollings[0][defaultLangue].exploit +
    "</a>" +
    '<ul class="submenu" id="submenu0">' +
    '<li><a href="#" class="custom-btn btn" onclick="load_mira(\'noofficial\'); return false">' +
    payloads[0][defaultLangue].mira +
    "</a>" +
    "</li>" +
    '<li><a href="#" class="custom-btn btn" onclick="load_mira(\'official\'); return false">' +
    payloads[0][defaultLangue].mira2 +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="load_binloader(); return false">' +
    payloads[0][defaultLangue].binload +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Todex\'); return false">' +
    payloads[0][defaultLangue].dex +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Linux\'); return false">' +
    payloads[0][defaultLangue].linux +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li1"><a href="#" class="deroulant" id="scrolling_menu1">' +
    scrollings[0][defaultLangue].system +
    "</a>" +
    '<ul class="submenu" id="submenu1">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'DumperKernel\'); return false">' +
    payloads[0][defaultLangue].dumperkernel +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'KernelClock\'); return false">' +
    payloads[0][defaultLangue].kernelclock +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'BackupDTB\'); return false">' +
    payloads[0][defaultLangue].backupDTB +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'RestoreDTB\'); return false">' +
    payloads[0][defaultLangue].restoreDTB +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li2"><a href="#" class="deroulant" id="scrolling_menu2">' +
    scrollings[0][defaultLangue].nav +
    "</a>" +
    '<ul class="submenu" id="submenu2">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'History\'); return false">' +
    payloads[0][defaultLangue].history +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Browser\'); return false">' +
    payloads[0][defaultLangue].browser +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li3"><a href="#" class="deroulant" id="scrolling_menu3">' +
    scrollings[0][defaultLangue].app +
    "</a>" +
    '<ul class="submenu" id="submenu3">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'HenVTX\'); return false">' +
    payloads[0][defaultLangue].henvtx +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'HenVTX_2.1.5\'); return false">' +
    payloads[0][defaultLangue].hennoofficial +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Dumper\'); return false">' +
    payloads[0][defaultLangue].dumper +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'App2usb\'); return false">' +
    payloads[0][defaultLangue].app2usb +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'rifs\'); return false">' +
    payloads[0][defaultLangue].rifs +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'WebRTE\'); return false">' +
    payloads[0][defaultLangue].webrte +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li4"><a href="#" class="deroulant" id="scrolling_menu4">' +
    scrollings[0][defaultLangue].ftp +
    "</a>" +
    '<ul class="submenu" id="submenu4">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Ftp\'); return false">' +
    payloads[0][defaultLangue].ftp +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li5"><a href="#" class="deroulant" id="scrolling_menu5">' +
    scrollings[0][defaultLangue].update +
    "</a>" +
    '<ul class="submenu" id="submenu6">' +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Desabler\'); return false">' +
    payloads[0][defaultLangue].enabler +
    "</a></li>" +
    '<li><a href="#" class="custom-btn btn" onclick="inject_payload(\'Enabler\'); return false">' +
    payloads[0][defaultLangue].desabler +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li5"><a href="#" class="deroulant" id="scrolling_menu6">' +
    scrollings[0][defaultLangue].ps4trainer +
    "</a>" +
    '<ul class="submenu" id="submenu7">' +
    '<li><a class="custom-btn btn" href="http://ps4trainer.com/Trainer/index.html">' +
    payloads[0][defaultLangue].ps4trainer +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    "</ul>";
  return buildHTML;
}
loadHTML();
displayCheckBox();