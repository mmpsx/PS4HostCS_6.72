/***********************Définition des variables**********************/
let level = 0;
let spoof = false;
let title = document.getElementsByTagName("title");
let version = "3.0.0";
let exploit = null;
let boxip = document.getElementById("boxip");
let infobubble = document.getElementById("infobubble");

let scrollings = [];
scrolling = [scrolls];

for (let i = 0; i < scrolling.length; i++) {
  scrollings[i] = JSON.parse(scrolling[i]);
}

let payloads = [];
pl = [
  pls,
  //jb,
  miranooff,
  miraoff,
  binloader,
  todex,
  linux,
  dumpkernel,
  kernelclock,
  backupdtb,
  restoredtb,
  historY,
  browser,
  hen,
  hennooff,
  dumper,
  app2usb,
  rifs,
  webrte,
  ftp,
  desabler,
  enabler,
  ps4trainer,
];

for (let i = 0; i < pl.length; i++) {
  payloads[i] = JSON.parse(pl[i]);
}

let home = [];
datas = [data];
for (let i = 0; i < datas.length; i++) {
  home[i] = JSON.parse(datas[i]);
}
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

function injection() {
  setInnerText(message, home[0][defaultLangue].inject);
}
function reception() {
  setInnerText(message, home[0][defaultLangue].injectwell);
}
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

/**********************Request*************************************/
function requestLangueServer() {
  //const serverLangue = JSON.parse(server);
  const url = "http://" + location.host;
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ langue: defaultLangue }),
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function requestIp() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://" + location.host + "/ip", true);
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let address = JSON.parse(xhr.response);
        console.log(xhr.response);
        address.forEach((key) => {
          let object = key;
          for (const property in object) {
            if (property == "PS4") {
              localStorage.setItem(property, object[property]);

              boxip.innerHTML += `<div id="ipps4" class="lan">${property} : ${object[property]}</div>`;
            } else {
              boxip.innerHTML += `<div class="lan">${property} : ${object[property]}</div>`;
            }
          }
        });
        boxip.innerHTML +=
          '<div class="lan">Cache : <span class="red">' +
          home[0][defaultLangue].nocached +
          "</span></div>";
      } else {
        if (localStorage.getItem("PS4")) {
          boxip.innerHTML += `<div id="ipps4" class="lan">PS4 : ${localStorage.getItem(
            "PS4"
          )}</div>`;
        } else {
          boxip.innerHTML += '<div class="lan">PS4 : N/A</div>';
        }
        boxip.innerHTML += '<div class="lan">PS4HostCS : N/A</span></div>';
        boxip.innerHTML +=
          '<div class="lan">Cache : <span class="green">' +
          home[0][defaultLangue].cached +
          "</span></div>";
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
        '<div class="red">' + home[0][defaultLangue].desactivateHost + "</div>"
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
        setInnerText(message, exploit + " " + home[0][defaultLangue].ready_pl);
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
        setInnerText(message, "");
        boxip.innerHTML +=
          '<div class="lan">Jailbreak <span class="green">OK</span></div>';
      } else {
        setInnerText(message, home[0][defaultLangue].jbfailed);
        boxip.innerHTML +=
          '<div class="lan">Jailbreak <span class="red">Echec</span></div>';
        removeScript(0);
      }
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
  //setInnerText(message, home[0][defaultLangue].wait_jb);
  //displayBlock(csLoader);
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

  if (payload == "Ftp") {
    sessionStorage.setItem("Ftp", true);
    if (sessionStorage.getItem("Ftp") === "true") {
      document.getElementById("ipps4").innerHTML =
        '<div class="lan">FTP :' +
        localStorage.getItem("PS4") +
        ':1337 <span class="green">Actif</span></div>';
    }
    setTimeout(function () {
      displayNone(message);
      displayNone(csLoader);
    }, 1000);
  }
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
  infosBubble();
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
    /*'<li><a id="jb" href="#" class="custom-btn btn" onclick="load_JB(); return false">Jailbreak' +
    "</a></li>" +*/
    '<li><a id="miranooff" href="#" class="custom-btn btn" onclick="load_mira(\'noofficial\'); return false">' +
    payloads[0][defaultLangue].mira +
    "</a>" +
    "</li>" +
    '<li><a id="miraoff" href="#" class="custom-btn btn" onclick="load_mira(\'official\'); return false">' +
    payloads[0][defaultLangue].mira2 +
    "</a></li>" +
    '<li><a id="binloader" href="#" class="custom-btn btn" onclick="load_binloader(); return false">' +
    payloads[0][defaultLangue].binload +
    "</a></li>" +
    '<li><a id="todex" href="#" class="custom-btn btn" onclick="inject_payload(\'Todex\'); return false">' +
    payloads[0][defaultLangue].dex +
    "</a></li>" +
    '<li><a id="linux" href="#" class="custom-btn btn" onclick="inject_payload(\'Linux\'); return false">' +
    payloads[0][defaultLangue].linux +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li1"><a href="#" class="deroulant" id="scrolling_menu1">' +
    scrollings[0][defaultLangue].system +
    "</a>" +
    '<ul class="submenu" id="submenu1">' +
    '<li><a id="dumpkernel" href="#" class="custom-btn btn" onclick="inject_payload(\'DumperKernel\'); return false">' +
    payloads[0][defaultLangue].dumperkernel +
    "</a></li>" +
    '<li><a id="kernelclock" href="#" class="custom-btn btn" onclick="inject_payload(\'KernelClock\'); return false">' +
    payloads[0][defaultLangue].kernelclock +
    "</a></li>" +
    '<li><a id="backupdtb" href="#" class="custom-btn btn" onclick="inject_payload(\'BackupDTB\'); return false">' +
    payloads[0][defaultLangue].backupDTB +
    "</a></li>" +
    '<li><a id="restoredtb" href="#" class="custom-btn btn" onclick="inject_payload(\'RestoreDTB\'); return false">' +
    payloads[0][defaultLangue].restoreDTB +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li2"><a href="#" class="deroulant" id="scrolling_menu2">' +
    scrollings[0][defaultLangue].nav +
    "</a>" +
    '<ul class="submenu" id="submenu2">' +
    '<li><a id="historY" href="#" class="custom-btn btn" onclick="inject_payload(\'History\'); return false">' +
    payloads[0][defaultLangue].history +
    "</a></li>" +
    '<li><a id="browser" href="#" class="custom-btn btn" onclick="inject_payload(\'Browser\'); return false">' +
    payloads[0][defaultLangue].browser +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li3"><a href="#" class="deroulant" id="scrolling_menu3">' +
    scrollings[0][defaultLangue].app +
    "</a>" +
    '<ul class="submenu" id="submenu3">' +
    '<li><a id="hen" href="#" class="custom-btn btn" onclick="inject_payload(\'HenVTX\'); return false">' +
    payloads[0][defaultLangue].henvtx +
    "</a></li>" +
    '<li><a id="hennooff" href="#" class="custom-btn btn" onclick="inject_payload(\'HenVTX_2.1.9\'); return false">' +
    payloads[0][defaultLangue].hennoofficial +
    "</a></li>" +
    '<li><a id="dumper" href="#" class="custom-btn btn" onclick="inject_payload(\'Dumper\'); return false">' +
    payloads[0][defaultLangue].dumper +
    "</a></li>" +
    '<li><a id="app2usb" href="#" class="custom-btn btn" onclick="inject_payload(\'App2usb\'); return false">' +
    payloads[0][defaultLangue].app2usb +
    "</a></li>" +
    '<li><a id="rifs" href="#" class="custom-btn btn" onclick="inject_payload(\'rifs\'); return false">' +
    payloads[0][defaultLangue].rifs +
    "</a></li>" +
    '<li><a id="webrte" href="#" class="custom-btn btn" onclick="inject_payload(\'WebRTE\'); return false">' +
    payloads[0][defaultLangue].webrte +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li4"><a href="#" class="deroulant" id="scrolling_menu4">' +
    scrollings[0][defaultLangue].ftp +
    "</a>" +
    '<ul class="submenu" id="submenu4">' +
    '<li><a id="ftp" href="#" class="custom-btn btn" onclick="inject_payload(\'Ftp\'); return false">' +
    payloads[0][defaultLangue].ftp +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li5"><a href="#" class="deroulant" id="scrolling_menu5">' +
    scrollings[0][defaultLangue].update +
    "</a>" +
    '<ul class="submenu" id="submenu6">' +
    '<li><a id="desabler" href="#" class="custom-btn btn" onclick="inject_payload(\'Desabler\'); return false">' +
    payloads[0][defaultLangue].enabler +
    "</a></li>" +
    '<li><a id="enabler" href="#" class="custom-btn btn" onclick="inject_payload(\'Enabler\'); return false">' +
    payloads[0][defaultLangue].desabler +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    '<li id="li5"><a href="#" class="deroulant" id="scrolling_menu6">' +
    scrollings[0][defaultLangue].ps4trainer +
    "</a>" +
    '<ul class="submenu" id="submenu7">' +
    '<li><a id="ps4trainer" class="custom-btn btn" href="http://ps4trainer.com/Trainer/index.html">' +
    payloads[0][defaultLangue].ps4trainer +
    "</a></li>" +
    "</ul>" +
    "</li>" +
    "</ul>";
  return buildHTML;
}
loadHTML();
displayCheckBox();
/*******************Info bubble ********************************* */
function GetId(id) {
  return document.getElementById(id);
}
let cmpti = false;
let topBubble = 0;
let a = 1;
b = 1;
c = 1;
d = 1;
e = 1;
function move(e) {
  if (cmpti) {
    if (document.documentElement.clientWidth > 0) {
      GetId("curseur").style.left =
        80 + event.x + document.documentElement.scrollLeft + "px";
      GetId("curseur").style.top =
        topBubble + event.y + document.documentElement.scrollTop + "px";
    } else {
      GetId("curseur").style.left =
        80 + event.x + document.body.scrollLeft + "px";
      GetId("curseur").style.top =
        topBubble + event.y + document.body.scrollTop + "px";
    }
  }
}
function showBubble(text) {
  if (cmpti == false) {
    GetId("curseur").style.visibility = "visible";
    GetId("curseur").innerHTML = text;
    cmpti = true;
  }
}
function hideBubble() {
  if (cmpti == true) {
    GetId("curseur").style.visibility = "hidden";
    cmpti = false;
  }
}
document.onmousemove = move;

/************************States Infos Bubble*********************************/
if (getCookie("bubble") === null) {
  createCookie("bubble", "bubble");
  setInnerHTML(
    infobubble,
    '<span class="green">' +
      home[0][defaultLangue][getCookie("bubble")] +
      "</span"
  );
  infosBubble();
} else {
  if (getCookie("bubble") === "bubble") {
    setInnerHTML(
      infobubble,
      '<span class="green">' +
        home[0][defaultLangue][getCookie("bubble")] +
        "</span"
    );
  } else {
    setInnerHTML(
      infobubble,
      '<span class="red">' +
        home[0][defaultLangue][getCookie("bubble")] +
        "</span"
    );
  }
  infosBubble();
}
/*****************Position Top Bubble selector********************/
function position_top(j) {
  if (j >= 6 && j <= 9) {
    topBubble = -(a * 10);
    a++;
  } else if (j >= 10 && j <= 11) {
    topBubble = -(b * 10);
    b++;
  } else if (j >= 12 && j <= 17) {
    topBubble = -(c * 10);
    c++;
  } else if (j >= 18) {
    topBubble = -(d * 10);
    d++;
  } else if (j >= 19 && j <= 20) {
    topBubble = -(e * 10);
    e++;
  } else if (j >= 20) {
    topBubble = -(f * 10);
    f++;
  } else {
    topBubble = -(j * 10);
  }
}
function infosBubble() {
  if (getCookie("bubble") === "bubble") {
    let tabMenu = document.getElementById("menu");
    let tabBtn = tabMenu.getElementsByClassName("custom-btn btn");
    for (let i = 0, iMax = tabBtn.length; i < iMax; ++i) {
      let id = tabBtn[i].id;

      document.getElementById(id).addEventListener("mouseover", function () {
        let j = i + 1;
        position_top(j);
        showBubble(
          '<div class="">' +
            "<span>" +
            payloads[j].title +
            "<br></span>" +
            "<span>" +
            payloads[j].version +
            "<br></span>" +
            "<span>" +
            payloads[j].updated +
            "<br></span>" +
            "<span>" +
            payloads[j].firmware +
            "<br></span>" +
            "<span>" +
            payloads[j].description[defaultLangue] +
            "<br></span>" +
            "<span>" +
            payloads[j].author +
            "<br></span>" +
            "<span>" +
            payloads[j].url +
            "<br></span>" +
            "</div>"
        );
      });
      document.getElementById(id).addEventListener("mouseout", function () {
        hideBubble();
      });
    }
  } else {
    let tabMenu = document.getElementById("menu");
    let tabBtn = tabMenu.getElementsByClassName("custom-btn btn");
    for (let i = 0, iMax = tabBtn.length; i < iMax; ++i) {
      let id = tabBtn[i].id;
      document.getElementById(id).addEventListener("mouseover", function () {
        hideBubble();
      });
    }
  }
}
/****************************Bubble display****************** */
function displayBubble() {
  if (getCookie("bubble") == "bubble") {
    console.log("1");
    setInnerHTML(
      infobubble,
      '<span class="red">' + home[0][defaultLangue].nobubble + "</span>"
    );
    modifyCookie("bubble", "nobubble");
    infosBubble();
  } else if (getCookie("bubble") == "nobubble") {
    console.log("2");
    setInnerHTML(
      infobubble,
      '<span class="green">' + home[0][defaultLangue].bubble + "</span>"
    );
    modifyCookie("bubble", "bubble");
    infosBubble();
  }
}
