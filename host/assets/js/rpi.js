let sizePkg;

function makeLinkPkg(cusa_00) {
  let key =
      "F5DE66D2680E255B2DF79E74F890EBF349262F618BCAE2A9ACCDEE5156CE8DF2CDF2D48C71173CDC2594465B87405D197CF1AED3B7E9671EEB56CA6753C2E6B0",
    addtmdb = "https://tmdb.np.dl.playstation.net/tmdb2/";
  let sha = new jsSHA("SHA-256", "TEXT"),
    sha1 = new jsSHA("SHA-1", "TEXT");
  sha.update(key);
  sha1.setHMACKey(key, "HEX");
  sha1.update(cusa_00);
  hmac = sha1.getHMAC("HEX").toUpperCase();
  return `${addtmdb}${cusa_00}_${hmac}/${cusa_00}.json`;
}

function buildCard(data) {
  console.log(data);
  regexTitle = /([A-Z]{4}[0-9]{5})/i,

  $("#titleid-list").append(
    '<button type="button" class="btncard col-4" data-cusa="' +
      data.npTitleId +
      '">' +
      '<div class="tab-content m-1">' +
      "<div>" +
      '<div class="card flex-row flex-wrap btn-list-titleid m-1" >' +
      '<div class="card-header p-0 m-0 border-0" >' +
      '<img style="width: 5rem;" id="meta-icon-' +
      data.npTitleId +
      '">' +
      "</div>" +
      '<div class="card-block col-9">' +
      '<h6 id="meta-title-'+data.npTitleId+'"></h6>' +
      '<p id="meta-cusa-' +
      data.npTitleId + 
      '"text-align:center"></p> ' +
      '<div style="border:1pxsolid orange">'+
      '</div>'+
      '<div id="psvr-'+data.npTitleId+'" class="badge d-flex flex-row-reverse">' +
      "</div>" +
      "</div>" + 
      '<div class="badge badge-secondary d-flex flex-row-reverse">' +
      sizePkg +
      "</div>" +
      '<div class="badge badge-primary d-flex flex-row-reverse">Vérifier' +
      "</div>" +
      '<div class="badge badge-success d-flex flex-row-reverse">Installer' +
      "</div>" +
      '<div class="badge badge-danger d-flex flex-row-reverse">Supprimer' +
      "</div>" +
      '<div class="badge badge-warning d-flex flex-row-reverse">Tâches' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</button>"
  );
  if(data.psVr === 0 ){
    $(`#psvr-${data.npTitleId}`).html("PSVr : non");
  } else {
    $(`#psvr-${data.npTitleId}`).html("PSVr : oui");
  }
  $(`#meta-icon-${data.npTitleId}`).attr("src", data.icons[0].icon);

  data.patchRevision === undefined ? $(`#meta-title-${data.npTitleId}`).text(data.names[0].name) 
  : $(`#meta-title-${data.npTitleId}`).html(data.names[0].name + "<br>Patch.Rev:" + data.patchRevision);
  if (regexTitle.test(data.npTitleId)) {
    let npTitleId = data.npTitleId.split("_00")
    $(`#meta-cusa-${data.npTitleId}`).text(npTitleId[0]);
  } else {
    let na = "Cusa non dispo";
    $(`#meta-cusa-${data.npTitleId}`).text(na);
  }
}

function getMetaJson(url, cusa) {
  fetch(url)
    .then(function (response) {
      if (response.status === 200) {
        response.json().then(function (data) {
          buildCard(data);
        });
      } else if (response.status === 404) {
        let data = {
          npTitleId: "No PSN dispo",
          icons: [{ icon: "assets/img/nopsn.png" }, {}],
          names: [{ name: url }, {}],
        };
        console.log(data);
        buildCard(data);
      }
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function makePkg(name, size) {
  let character = 43,
    newName = name.substring(0, character - 3);
  name.length > character && (newName += "...");
  return $("#pkg-list").append(
    '<button value="' +
      name +
      '">' +
      newName +
      '<span class="badge badge-primary ml-1">' +
      size +
      "</span></button>"
  );
}
function getPkg() {
  $.get("/listpkg", (list, res) => {
    list.pkgs.length !== 0
      ? list.pkgs.forEach((pkg, v) => {
          makePkg(pkg.name, pkg.size);
        })
      : $("#pkg-list").html(
          '<span class="text-center red">Aucun fichier trouvé sur le serveur</span>'
        );
  });
}

function makeCusa(cusa, size) {
  let regexTitle = /([A-Z]{4}[0-9]{5})/i,
    cusa__00 = `${cusa}_00`;
  sizePkg = size;
  if (regexTitle.test(cusa)) getMetaJson(makeLinkPkg(cusa__00));
  else {
    let data = {
      npTitleId: cusa,
      icons: [{ icon: "assets/img/nopsn.png" }, {}],
      names: [{ name: cusa }, {}],
    };
    buildCard(data);
  }
}

function getTitleId() {
  $.get("/listtitle", (list, res) => {
    list.cusa.length !== 0
      ? list.cusa.forEach((cusa, v) => {
          makeCusa(cusa.name, cusa.size);
        })
      : $("#pkg-list").html(
          '<span class="text-center red">Aucun fichier trouvé sur le serveur</span>'
        );
  });
}

$(function () {
  getPkg();
  getTitleId();

  setTimeout(function () {
    $(".btncard").click(function (a) {
      $("#existTitleId").val($(this).data("cusa"));
    });
  }, 1000);
});
