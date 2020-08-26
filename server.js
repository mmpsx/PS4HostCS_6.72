"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

//const request = require('request');
const path = require("path");

const upload = multer();
const app = express();
const version = "v 1.0.1";
const { networkInterfaces } = require("os");
const nets = networkInterfaces();
const port = 8000;
let results = [];
let ipps4, iphost, names;
let responseip = [];
let langue = 0;
let root = "PKG";

app.use(express.static("host"));
app.use("/host", express.static(__dirname + "/host"));
app.use(express.static(__dirname + "/host/assets/lang"));

//app.use(express.static(__dirname + "/PKG"));

/***************** GETHOME**********************************/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/host/index.html");
});

function getFilesizeInBytes(filename) {
  let stats = fs.statSync(root + "/" + filename),
  fileSizeInBytes = stats["size"];
  let result = 0 === fileSizeInBytes ? 0 : Math.floor(Math.log(fileSizeInBytes) / Math.log(1024));

  return `${1 * (fileSizeInBytes / Math.pow(1024, result)).toFixed(2)} ${["B", "kB", "MB", "GB", "TB"][result]}`
}

function splitCusa(name){
  let cusa = name.toUpperCase(), 
  c = /([A-Z]{4}[0-9]{5})/i, 
  d = "CUSA",  
  e = "NPUP";
  if(c.test(cusa) ){
    if(cusa.indexOf(d) !== -1) cusa = cusa.substring(cusa.indexOf(d), cusa.indexOf(d) + 9);
    else if (cusa.indexOf(e) !== -1) cusa = cusa.substring(cusa.indexOf(e), cusa.indexOf(e) + 9);
  } 
  else{
    cusa = name.split(".pkg");
    cusa = cusa[0];
  } 
  return cusa
}

/*********************PKG FOLDER AND LIST****************/
app.get("/listtitle", function (req, resp) {
  fs.readdir(root, (err, files) => {
    if (err) {
      throw err;
    }
    let cusa = [];
    files.forEach((file) => {
      file.endsWith(".pkg")
        ? cusa.push({ name: splitCusa(file), size: getFilesizeInBytes(file) })
        : null;
    });
    console.log(cusa);
    resp.send({ cusa: cusa });
  });
});
/*********************PKG FOLDER AND LIST****************/
app.get("/listpkg", function (req, resp) {
  fs.readdir(root, (err, files) => {
    if (err) {
      throw err;
    }
    let pkgs = [];
    files.forEach((file) => {
      file.endsWith(".pkg")
        ? pkgs.push({ name: file, size: getFilesizeInBytes(file) })
        : null;
    });

    resp.send({ pkgs: pkgs });
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
//app.use(upload.array());

const data = fs.readFileSync("host/assets/lang/server.json", "utf8");
const dataJSON = JSON.parse(data);

function definitionHost() {
  if (results) {
    results = [];
  }
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        if (name === "Ethernet" && net.address) {
          names = dataJSON[langue].hostlan;
          responseip.push({ "Host Ethernet": net.address });
          if (!results[names]) {
            results[names] = [];
            results[names].push(net.address);
          }
        } else if (name === "Wi-Fi" && net.address) {
          names = dataJSON[langue].hostwifi;
          responseip.push({ "Host WiFi": net.address });
          if (!results[names]) {
            results[names] = [];
            results[names].push(net.address);
          }
        }
      }
    }
  }
}
/************************GETIP PS4 AND DISPLAY********************************/
function getIpPS4(req, res) {
  if (!ipps4) {
    ipps4 = req.ip.split(":");
    ipps4 = ipps4[3];
  }
  if (responseip[1] === undefined || responseip[1].PS4 !== ipps4) {
    responseip.push({ PS4: ipps4 });
    console.log("\n\t\t PS4 IP local:", ipps4);
  }
}

/************************GET AND RETURN IP********************************/

app.get("/ip", function (req, res) {
  getIpPS4(req, res);
  res.send(responseip);
});

/***********************DISPLAY IP SERVER*********************************/
function displayIpServer() {
  let a = dataJSON[langue].hostlan;
  let b = dataJSON[langue].hostwifi;
  if (results[a]) {
    iphost = responseip[0]["Host Ethernet"];
  } else if (results[b]) {
    iphost = responseip[0]["Host WiFi"];
  }
  console.log("\t\t", b, "http://" + iphost + ":", port);
}

/***********************DISPLAY INFOS*********************************/
function displayInfo() {
  console.log("\t\t", dataJSON[langue].intro, "\n");
  displayIpServer();
  console.log("\n\t\t", dataJSON[langue].languageserver, "\n");
  console.log("\n\t\t", dataJSON[langue].cached, "\n");
}
/***************** POST CHANGE LANGUAGE*********************************/
app.post("/", function (req, res) {
  langue = req.body.langue;
  console.clear();
  console.log("\t\t\t┌──────────────────────────────────────────────────────┐");
  if (req.body.langue === 1) {
    console.log(
      "\t\t\t│ \x1b[33m%s%s\x1b[0m",
      dataJSON[langue].titleserver,
      version,
      "        │"
    );
  } else {
    console.log(
      "\t\t\t│ \x1b[33m%s%s\x1b[0m",
      dataJSON[langue].titleserver,
      version,
      "  │"
    );
  }
  console.log("\t\t\t├──────────────────────────────────────────────────────┤");
  if (req.body.langue === 1) {
    console.log(
      "\t\t\t│                        \x1b[33m%s\x1b[0m",
      dataJSON[langue].subtitleserver,
      "  │"
    );
  } else if (req.body.langue === 0) {
    console.log(
      "\t\t\t│                        \x1b[33m%s\x1b[0m",
      dataJSON[langue].subtitleserver,
      " │"
    );
  }
  console.log("\t\t\t└──────────────────────────────────────────────────────┘");
  console.log("\n\n\n\n");
  definitionHost();
  displayInfo();
  getIp(req, res);
});

/******************** LISTEN ****************************/

app.listen(port, function () {
  definitionHost();
  console.log("\t\t\t┌──────────────────────────────────────────────────────┐");
  console.log(
    "\t\t\t│ \x1b[33m%s%s\x1b[0m",
    dataJSON[langue].titleserver,
    version,
    "  │"
  );
  console.log("\t\t\t├──────────────────────────────────────────────────────┤");
  console.log(
    "\t\t\t│                        \x1b[33m%s\x1b[0m",
    dataJSON[langue].subtitleserver,
    " │"
  );
  console.log("\t\t\t└──────────────────────────────────────────────────────┘");
  console.log("\n\n\n\n");
  displayInfo();
});

module.exports = app;


