let tabLi = menu.getElementsByClassName("deroulant");
let tabUl = document.getElementsByClassName("submenu");
let tabA = document.getElementsByClassName("submenua");

let colone = "";
let deroulant = "";
let px = 0;
let boucle = 0;

/*******************affiche position du deroulant */
(function deroulant() {
  for (let i = 0; i < tabLi.length; ++i) {
    let id = tabLi[i].id;
    let deroulant = document.getElementById(id);
    deroulant.addEventListener("mouseenter", function (e) {
      colone = i;
      console.log("colone=" + colone);
      deroulant = tabLi[i].id;
      console.log(deroulant);

      //console.log("entre");
      //e.target.style.color = "purple";
    });
    deroulant.addEventListener("mouseleave", function (e) {
      console.log("sortie");
    });
  }
})();

/*******************affiche position du submenu */
/*
(function submenu() {
  for (let i = 0; i < tabLink.length; ++i) {
    let id = tabUl[i].id;
    let submenu = document.getElementById(id);
    let nb = 0;
    let setNb = 50;
    submenu.addEventListener("mouseover", function (e) {
      console.log(tabUl[i].id);
    });
    submenu.addEventListener("mouseleave", function (e) {
      //submenu.style.marginTop = "0";
    });
  }
})();

/*******************affiche position du lien du submenu */
let position = "";
let test = -0;
(function submenu() {
  for (let i = 0; i < tabA.length; ++i) {
    let id = tabA[i].id;
    let submenua = document.getElementById(id);

    submenua.addEventListener("mouseover", function (e) {
      console.log(id);

      if (colone === 0) {
        console.log(i);
        let second = document.querySelector(
          "#menu>li:nth-child(" + colone + 1 + ")"
        );
        second = second.id;

        if( i >= test){
          position-= 50
          document.getElementById(second).style.top = position;
          test = i;
        } else if (i <= test ){
          position+= 50;
          document.getElementById(second).style.top = position;
          test = i;
        }
      } else {
        colone++;
        var second = document.querySelector(
          "#menu>li:nth-child(" + colone + ")"
        );
      }
    });
    submenua.addEventListener("mouseleave", function (e) {
      let second = document.querySelector(
        "#menu>li:nth-child(" + colone + 1 + ")"
      );
      second = second.id;
      document.getElementById(second).style.top = 0;
    });
  }
})();
