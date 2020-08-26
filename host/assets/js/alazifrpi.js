"use strict";
var _this = void 0;
function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(a, b) {
    for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c)
}

function _createClass(a, b, c) {
    return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
}
var TMDB = function() {
    function a() {
        _classCallCheck(this, a), this.url = "", this.json = ""
    }
    return _createClass(a, [{
        key: "update",
        value: function b(a) {
            a !== this.url && (this.url = a, this.json = $.ajax({
                dataType: "json",
                url: this.url,
                async: !1
            }).responseJSON)
        }
    }, {
        key: "icon",
        get: function a() {
            return void 0 === this.json ? void 0 : this.json.icons[0].icon
        }
    }, {
        key: "name",
        get: function a() {
            return void 0 === this.json ? void 0 : this.json.names[0].name
        }
    }]), a
}();

function clearInputRPI() {
    $("#meta-info").hide(), $("#existURL").val(""), $("#installURL").val("http://"), $("#uninstallURL").val(""),$("#pkgSearch").val(""),
    $("#uninstallID").val(""), $("#uninstallRadioGame").prop("checked", !0),$("#taskContentID").val(""), $("#taskRadioGame").prop("checked", !0),
    $("#taskID").val(""), $("#posts").html("")
}

function getPKGListRPI() {
    return $.ajax({
        dataType: "json",
        url: "/pkgs/liste.json",
        async: !1
    }).responseJSON
}

function getTMDBURLRPI(a) {
    var b, c, d, e = "F5DE66D2680E255B2DF79E74F890EBF349262F618BCAE2A9ACCDEE5156CE8DF2CDF2D48C71173CDC2594465B87405D197CF1AED3B7E9671EEB56CA6753C2E6B0";
    e = e.toUpperCase();
    var f = new jsSHA("SHA-256", "TEXT");
    f.update(e);
    var g = f.getHash("HEX");
    return "2AB0555FABF50901A5D7CD56962769F0274374FA56C7E81E77EC386B22834AFB" === g.toUpperCase() ? (b = new jsSHA("SHA-1", "TEXT"), b.setHMACKey(e, "HEX"), b.update(a), c = b.getHMAC("HEX"), c = c.toUpperCase(), d = "https://tmdb.np.dl.playstation.net/tmdb2/".concat(a, "_").concat(c, "/").concat(a, ".json")) : d = "http://0.0.0.0", d
}

function displayTIDMetaRPI(a) {
    window.Meta.update(getTMDBURLRPI(a)), window.Meta.icon !== void 0 && $("#meta-icon").attr("src", window.Meta.icon), window.Meta.name !== void 0 && $("#meta-name").text(window.Meta.name), window.Meta.icon === void 0 && window.Meta.name === void 0 ? $("#meta-info").hide() : $("#meta-info").show()
}

function setLastIPRPI(a) {
    var b, c = decodeURIComponent(document.cookie),
        d = c.split(";");
    $.each(d, function(a, c) {
        for (;
            " " === c.charAt(0);) c = c.substring(1);
        0 === c.indexOf("last_ip=") && (b = c.substring(8, c.length))
    }), b === void 0 ? ($(a).val("0.0.0.0"), document.cookie = "last_ip=0.0.0.0; expires=Tue, 19 Jan 2038 03:14:07 UTC;") : $(a).val(b)
}

function validateInputRPI(a, b) {
    var c;
    if ("IP" === a && b === "0.0.0.0") return !1;
    else if("URL" === a && (b === "http://" || b === " ")) return !1;
    else if ("IP" === a) c = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    else if ("URL" === a) c = /^http[s]?:\/\/.+/i;
    else if ("ContentID" === a) c = /^[A-Z]{2}[0-9]{4}-[A-Z]{4}[0-9]{5}_[0-9]{2}-[A-Z0-9]{16}$/;
    else if ("TitleID" === a) c = /^[A-Z]{4}[0-9]{5}$/;
    else if ("TaskID" === a) c = /^(?:[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[0-9])$/;
    else return !1;
    return c.test(b)
}
function checkStatus(a) {
  if (a == "send" ) $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  else if (a == "checkip") $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Votre IP est invalide.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  else if (a == "TitleID") $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Vérifiez votre TitleID.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  else if (a == "http://") $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Vérifiez votre http://<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  else if (a == "task_ID") $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Votre numéro de Task_ID, n'est plus ou pas valide.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  else if (a == "ContentID") $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Vérifiez votre Content_ID.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
}

function checkStatusExist(data) {
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("exists"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\,"; i++) {
      a += data[i];
    }
    if ((stat = (data.indexOf("true"))) != -1){
      return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Ce titre existe déjà<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    } else {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Ce titre n'existe pas<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  } else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur de connection est survenue, vérifiez votre parefeu<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendExist(a, b, c) {
  var d = "http://".concat(a, ":12800/api/").concat(b);
  return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function() {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Une erreur de connection est survenue, vérifiez votre RPI PS4<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function(data) {
          checkStatusExist(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}

function existTitle(a, b, c) {
  return validateInputRPI("TitleID", c = c.toUpperCase()) ? sendExist(a, b, "{\"title_id\":\"" + c +"\"}") : checkStatus("TitleID")
}

function checkStatusInstall(data) {
  var a ="";
  var b, c ="";
  var d ="";
  var e="";
  var stat = 0;
  var liste = "";
  if ((stat = (data.indexOf("task_id"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++){
      a += data[i];
      b = [i + 3];
    }
    for(var i = b; i < data.length && data[i] != "\,"; i++){
      c += data[i];
    }
    if ((stat = (data.indexOf("title"))) != -1){
      for (var i = stat; i < data.length && data[i] != "\:"; i++){
        e = data[i];
        b = [i + 4];
      }
      for(var j = b; j < data.length && data[j+2] != "\}"; j++){
        d += data[j];
      }

    }
    if (c != " ") {
      var node = document.createElement("LI");
      var textnode = document.createTextNode(d + " : " +c);
      node.appendChild(textnode);
      document.getElementById("tasks-list").appendChild(node);

      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">"+d+" à bien été envoyer sous le \"" +a+" N° "+c+"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }


  } else if ((stat = (data.indexOf("error_code"))) != -1){
    for (var i = stat; i < data.length && data[i] != " "; i++){
      a += data[i];
      stat = (data.indexOf("0x80990015"));
      if (stat != -1){
        return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Le fichier existe déjà.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
      } else {
        return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenue<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
      }
    }
  } else if ((stat = (data.indexOf("error"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\,"; i++) {
      a += data[i];
      stat = (data.indexOf("Unable to set up"));
      if (stat != -1) {
        return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Votre http://.. n'est pas valide<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
      } else {
        return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenue<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
      }
    }
  } else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendInstall(a, b, c) {
  var d = "http://".concat(a, ":12800/api/").concat(b);
  return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
    type: 'POST',
    url: d,
    data: c,
    dataType: "json",
    timeout: 200,
    async: !1,
    beforeSend: function a() {
      $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    },
    complete: function a(data) {
      console.log(data);
      checkStatusInstall(data.responseText);
    }
  }).responseJSON) : checkStatus("checkip")
}
function installTitle(a, b, c) {
  return validateInputRPI("URL", c) ? sendInstall(a, "install", "{\"type\": \""+ b+"\", \"packages\": [\"" + c + "\"]}") : checkStatus("http://")
}

function checkStatusUninstall(data) {
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("status"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++) {
      a += data[i];
      stat = (data.indexOf("success"));
    }
    if (stat != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Le fichier a été supprimer avec succès.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    } else {
      return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Echec de la suppression du fichier!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  }else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie de la requête<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendUninstall(a, b, c) {
  var d = "http://".concat(a, ":12800/api/").concat(b);
  return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
      type: 'POST',
      url: d,
      data: c,
      dataType: "json",
      timeout: 200,
      async: !1,
      beforeSend: function a() {
        $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
      },
      complete: function a(data) {
        checkStatusUninstall(data.responseText);
      }
  }).responseJSON) : checkStatus("checkip")
}

function uninstallTitle(a, b, c) {
    if ("uninstall_game" === b || "uninstall_patch" === b) {
        return (validateInputRPI("TitleID", c = c.toUpperCase())) ? sendUninstall(a, b, "{\"title_id\": \"".concat(c, "\"}")) : checkStatus("TitleID")
    } else if (("uninstall_ac" === b || "uninstall_theme" === b)) {
      return validateInputRPI("ContentID", c.toUpperCase()) ? sendUninstalld(a, b, "{\"content_id\": \"".concat(c.toUpperCase(), "\"}")) : checkStatus("ContentID")
    }
}

function checkStatusUnregister(data){
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("status"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++) {
      a += data[i];
      stat = (data.indexOf("success"));
    }
    if (stat != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">La déconnexion à la Tâche a bien été enregistrer...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }else {
      return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Echec de la déconnexion à la Tâche!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  }else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie de la requête!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendUnregister(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkStatusUnregister(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}
function taskTitleUnregister(a, b, c) {
  return validateInputRPI("TaskID", c) ? sendUnregister(a, b, "{\"task_id\": ".concat(c, "}")) : checkStatus("task_ID")
}

function checkStatusResume(data){
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("status"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++) {
      a += data[i];
      stat = (data.indexOf("success"));
    }
    if (stat != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Reprise de la Tâche...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }else {
      return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Echec de la reprise de la Tâche!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  }else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie de la requête!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendResume(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkStatusResume(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}
function taskTitleResume(a, b, c) {
  return validateInputRPI("TaskID", c) ? sendResume(a, b, "{\"task_id\": ".concat(c, "}")) : checkStatus("task_ID")
}

function checkStatusPause(data){
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("status"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++) {
      a += data[i];
      stat = (data.indexOf("success"));
    }
    if (stat != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">La Tâche à bien été mise en pause...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    } else {
      return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Echec de la mise en pause de la Tâche!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  }else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie de la requête!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendPause(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkStatusPause(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}
function taskTitlePause(a, b, c) {
  return validateInputRPI("TaskID", c) ? sendPause(a, b, "{\"task_id\": ".concat(c, "}")) : checkStatus("task_ID")
}

function checkStatusStop(data){
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("status"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++) {
      a += data[i];
      stat = (data.indexOf("success"));
    }
    if (stat != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">La Tâche à bien été mise à l'arrêt...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    } else {
      return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Echec de la mise à l'arrêt de la Tâche!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  }else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie de la requête!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendStop(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkStatusStop(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}
function taskTitleStop(a, b, c) {
 return validateInputRPI("TaskID", c) ? sendStop(a, b, "{\"task_id\": ".concat(c, "}")) : checkStatus("task_ID")
}

function checkStatusStart(data){
  var b, a = "";
  var stat = 0;
  if ((stat = (data.indexOf("status"))) != -1){
    for (var i = stat; i < data.length && data[i] != "\:"; i++) {
      a += data[i];
      stat = (data.indexOf("success"));
    }
    if ((stat = (data.indexOf("error_code"))) != -1){
      for (var i = stat; i < data.length && data[i] != " "; i++){
        a += data[i];
        stat = (data.indexOf("0x80990019"));
        if (stat != -1) {
          return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">La Tâche n'est plus valable.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        } else {
          return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenue<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        }
      }
    } else {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Démarrage de la Tâche...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  } else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenu lors de l'envoie de la requête!<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendStart(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkStatusStart(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}
function taskTitleStart(a, b, c) {
  return validateInputRPI("TaskID", c) ? sendStart(a, b, "{\"task_id\": ".concat(c, "}")) : checkStatus("task_ID")
}

function checkFindTaskTitle(data) {
  var a ="";
  var b, c = "";
  var stat = 0;
  if ((stat = (data.indexOf("task_id"))) != -1){
    for (var i = stat; i < data.length && data[i - 2] != "\:"; i++){
      a += data[i];
      b = i;
    }
    for(var i = b; i < data.length && data[i] != "\}"; i++){
      c += data[i];
    }
    if (c != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\"" +a+" N° "+c+"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  } else {
    return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Votre Titre est en pause<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
  }
}

function sendfindTaskFind(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkFindTaskTitle(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}

function findTaskFind(a, b, c) {
  return validateInputRPI("ContentID", c.toUpperCase()) ? (sendfindTaskFind(a, "find_task", "{\"content_id\": \"".concat(c.toUpperCase(), "\", \"sub_type\": ").concat(b, "}"))) : checkStatus("ContentID")
}

function checkTaskProgress(data) {
  var a ="";
  var b, c ="";
  var d ="";
  var e ="";
  var stat = 0;
  if ((stat = (data.indexOf("success"))) != -1){
    if ((stat = (data.indexOf("transferred"))) != -1){
      for (var i = stat; i < data.length && data[i - 2] != "\:"; i++){
        a += data[i];
        b = i;
      }
    }
    for(var i = b; i < data.length && data[i] != "\,"; i++){
      c += data[i];
    }
    if ((stat = (data.indexOf("length_total"))) != -1){
      for (var i = stat; i < data.length && data[i - 2] != "\:"; i++){
        a += data[i];
        b = i;
      }
    }
    for(var i = b; i < data.length && data[i] != "\,"; i++){
      d += data[i];
    }
    if ((stat = (data.indexOf("rest_sec"))) != -1){
      for (var i = stat; i < data.length && data[i - 2] != "\:"; i++){
        a += data[i];
        b = i;
      }
    }
    for(var i = b; i < data.length && data[i] != "\,"; i++){
      e += data[i];
    }
    var f = parseInt(c,16);
    var g = 0 === f ? 0 : Math.floor(Math.log(f)/ Math.log(1024));
    var h = "".concat(1 * (f / Math.pow(1024, g)).toFixed(2), " ").concat(["B", "kB", "MB", "GB", "TB"][g]);
    f = parseInt(d,16);
    g = 0 === f ? 0 : Math.floor(Math.log(f)/ Math.log(1024));
    var j = "".concat(1 * (f / Math.pow(1024, g)).toFixed(2), " ").concat(["B", "kB", "MB", "GB", "TB"][g]);
    var k = new Date()
    k.setTime(e*1000);
    k = (k.getHours() -1 +":"+k.getMinutes() + ":"+k.getSeconds());
    if (c != -1) {
      return $("#posts").html("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Transfert de "+h+" sur "+j+" Temps estimé: "+k+"min<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
    }
  } else if ((stat = (data.indexOf("error_code"))) != -1){
      for (var i = stat; i < data.length && data[i] != " "; i++){
        a += data[i];
        stat = (data.indexOf("0x80990019"));
        if (stat != -1) {
          return $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">La Tâche n'est plus valable.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        } else {
          return $("#posts").html("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">Une erreur inconnue est survenue<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        }
      }
    }
}
function sendProgress(a, b, c) {
    var d = "http://".concat(a, ":12800/api/").concat(b);
    return validateInputRPI("IP", a) ? (document.cookie = "last_ip=".concat(a, "; expires=Tue, 19 Jan 2038 03:14:07 UTC;"), $.ajax({
        type: 'POST',
        url: d,
        data: c,
        dataType: "json",
        timeout: 200,
        async: !1,
        beforeSend: function a(data) {
          $("#posts").html("<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">Envoie en cours...<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\"> &times; </span></button></div>")
        },
        complete: function a(data) {
          checkTaskProgress(data.responseText);
        }
    }).responseJSON) : checkStatus("checkip")
}
function taskProgress(a, b, c) {
  return validateInputRPI("TaskID", c) ? sendProgress(a, b, "{\"task_id\": ".concat(c, "}")) : checkStatus("task_ID")
}

function makePkgButtonRPI(a, b, c) {
    var g, d = Math.pow,
        e = Math.floor,
        f = Math.log,
        h = 43,
        j = a.substring(0, h - 3);
    a.length > h && (j += "...");
    var k = 0 === b ? 0 : e(f(b) / f(1024)),
        i = "".concat(1 * (b / d(1024, k)).toFixed(2), " ").concat(["B", "kB", "MB", "GB", "TB"][k]);
    return g = "<button type=\"button\" class=\"btn-pkg-list list-group-item list-group-item-action p-0 pb-1 pl-2\" ", g += "data-pkg-url=\"".concat(c, "\">"), g += "".concat(j, "<span class=\"badge badge-primary ml-1\">").concat(i, "</span></button>"), g
}

function makePkgArrayRPI(a) {
    var b = "";
    return void 0 !== a && $.each(a, function(a, c) {
        "error" === a ? b = "<p class=\"text-center text-danger\">Vous devez générer la liste depuis l'executable</p>" : "No results" === c ? b = "<p class=\"text-center text-danger\">Pas de résultat dans la liste</p>" : b += makePkgButtonRPI(c.Filename, c.Filesize, c.File_URL)
    }), b
}

function checkPkgLinkExist() {
    var a, b = /[A-Z]{2}[0-9]{4}-([A-Z]{4}[0-9]{5}_[0-9]{2})-[A-Z0-9]{16}/i,
        c = /([A-Z]{4}[0-9]{5})/i;
    b.test($("#existURL").val()) ? (a = b.exec($("#existURL").val()), a = a[1].toUpperCase(), displayTIDMetaRPI(a)) : c.test($("#existURL").val()) ? (a = c.exec($("#existURL").val()), a = "".concat(a[1].toUpperCase(), "_00"), displayTIDMetaRPI(a)) : $("#meta-info").hide()
}
function checkPkgLink() {
    var a, b = /[A-Z]{2}[0-9]{4}-([A-Z]{4}[0-9]{5}_[0-9]{2})-[A-Z0-9]{16}/i,
        c = /([A-Z]{4}[0-9]{5})/i;
    b.test($("#installURL").val()) ? (a = b.exec($("#installURL").val()), a = a[1].toUpperCase(), displayTIDMetaRPI(a)) : c.test($("#installURL").val()) ? (a = c.exec($("#installURL").val()), a = "".concat(a[1].toUpperCase(), "_00"), displayTIDMetaRPI(a)) : $("#meta-info").hide()
}
function checkPkgLinkDelete() {
    var a, b = /[A-Z]{2}[0-9]{4}-([A-Z]{4}[0-9]{5}_[0-9]{2})-[A-Z0-9]{16}/i,
        c = /([A-Z]{4}[0-9]{5})/i;
    b.test($("#uninstallURL").val()) ? (a = b.exec($("#uninstallURL").val()), a = a[1].toUpperCase(), displayTIDMetaRPI(a)) : c.test($("#uninstallURL").val()) ? (a = c.exec($("#uninstallURL").val()), a = "".concat(a[1].toUpperCase(), "_00"), displayTIDMetaRPI(a)) : $("#meta-info").hide()
}
function checkPkgLinkTasks() {
    var a, b = /[A-Z]{2}[0-9]{4}-([A-Z]{4}[0-9]{5}_[0-9]{2})-[A-Z0-9]{16}/i,
        c = /([A-Z]{4}[0-9]{5})/i;
    b.test($("#taskContentID").val()) ?
    (a = b.exec($("#taskContentID").val()), $("#taskContentID").val(a[0]), a = a[1].toUpperCase(), displayTIDMetaRPI(a)) : c.test($("#taskContentID").val()) ? (a = c.exec($("#taskContentID").val()), $("#taskContentID").val(a[0]), a = "".concat(a[1].toUpperCase(), "_00"), displayTIDMetaRPI(a)) : $("#meta-info").hide()
}
$(function() {
    var a, b;
    if (window.Meta = new TMDB, !navigator.onLine) return void $("#offlineOverlay").show();
    setLastIPRPI("#ip"), clearInputRPI();

    var c = getPKGListRPI();

    $("a[data-toggle=\"pill\"]").click(function() {
        clearInputRPI(), $("#header").text($(_this).text())
    }), $("#pkgSearch").keyup(function() {
        a = [],
        -1 !== c && (b = $("#pkgSearch").val().toUpperCase(), $.each(c, function(c, d) {
            -1 < d.Filename.toUpperCase().indexOf(b) && a.push(d)
        }), void 0 !== c && 0 === a.length && (a = ["No results"]), $("#pkg-list").html(makePkgArrayRPI(a)))
    }), $(function () {
        $('#myTab li:last-child a').tab('show')
    }), $("#existURL").keyup(checkPkgLinkExist), $("#btn-exists").click(function() {
        isExistsRPI($("#ip").val(), $("#existID").val())
    }), $("#btn-exist").click(function() {
        existTitle($("#ip").val(), "is_exists", $("#existURL").val())
    }), $("#installURL").keyup(checkPkgLink), $("#btn-exists").click(function() {
        isExistsRPI($("#ip").val(), $("#existID").val())
    }), $("#btn-install").click(function() {
        installTitle($("#ip").val(), "direct", $("#installURL").val())
    }), $("#uninstallURL").keyup(checkPkgLinkDelete), $("#btn-exists").click(function() {
        isExistsRPI($("#ip").val(), $("#existID").val())
    }), $("#btn-uninstall").click(function() {
        uninstallTitle($("#ip").val(), $("input[name='uninstallRadios']:checked").val(), $("#uninstallURL").val())
    }), $("#btn-task-find").click(function() {
        findTaskFind($("#ip").val(), $("input[name='taskRadios']:checked").val(), $("#taskContentID").val())
    }), $("#btn-task-start").click(function() {
        taskTitleStart($("#ip").val(), "start_task", $("#taskID").val())
    }), $("#btn-task-stop").click(function() {
        taskTitleStop($("#ip").val(), "stop_task", $("#taskID").val())
    }), $("#btn-task-pause").click(function() {
        taskTitlePause($("#ip").val(), "pause_task", $("#taskID").val())
    }), $("#btn-task-resume").click(function() {
        taskTitleResume($("#ip").val(), "resume_task", $("#taskID").val())
    }), $("#btn-task-unregister").click(function() {
        taskTitleUnregister($("#ip").val(), "unregister_task", $("#taskID").val())
    }), $("#btn-task-progress").click(function() {
        taskProgress($("#ip").val(), "get_task_progress", $("#taskID").val())
    }), 
    
    $("#pkg-list").html(makePkgArrayRPI(c)), 

    $(".btn-pkg-list").click(function(a) {
        $("#posts").html(""), 
        $("#installURL").val($(a.target).data("pkg-url")),
         checkPkgLink()


    
    
    $("#pkg-list-tasks").html(makePkgArrayRPI(c)), 
    $(".btn-pkg-list").click(function(a) {
        $("#posts").html(""), 
        $("#taskContentID").val($(a.target).data("pkg-url")),
         checkPkgLinkTasks()



    }),
     $(function () {
        
      $('#tasks-list a:last-child').tab('show')
    }), 
    
    $("#btn-task-refresh").click(function() {
        $("#tasks-list").html("")
    })
});