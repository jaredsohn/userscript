// ==UserScript==
// @name           SS_SpyRepAdapt
// @namespace      ArchSSSpyRepAdapt
// @description    Ogame script. Adapts espionage reports for copying into SpeedSim (for ogame.ru)
// @include        http://*.ogame.ru/game/index.php?page=showmessage*
// ==/UserScript==

//alert("getting texts");
var texts = document.getElementsByTagName("td");
//alert("got texts");
for (var i=0; i<texts.length; i++) {
  //if (prompt("Proceed?", texts[i].textContent) == null) break;
  switch (texts[i].textContent) {
    case "Металл:":
      texts[i].textContent = "металла";
      break;
    case "Кристалл:":
      texts[i].textContent = "кристалла";
      break;
    case "Дейтерий:":
      texts[i].textContent = "дейтерия";
      break;
  }
}
