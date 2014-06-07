// ==UserScript==
// @name           Starý Pokec
// @version        0.1.2
// @namespace      azet
// @author         t€rist
// @description    Zmení pokec späť na starý
// @include        http://novypokec.azet.sk/*
// @exclude        http://novypokec.azet.sk/
// ==/UserScript==


var SPUSTI_HNED = false // Ak chceš aby pokec zmenil hneď po prihlásení zmeň túto hodnotu na true


function fStaryPokec(){
  document.location="http://novypokec.azet.sk/sluzby/system/switch/zastav?i9="+i9;
}

if(SPUSTI_HNED) {
  fStaryPokec();
} else {
  if(i9 == undefined) {
    var i9_pattern = /i9=([0-9a-f]{12,12})/
    var res = i9_pattern.exec(document.location);
    if(res != null)
      var i9 = res[1];
  }
  if(i9 != undefined && i9 != ''){
    var uls = document.getElementsByTagName("ul");
    var koniec = "";
    for(var i=0; i< uls.length; i++) {
      var ul = uls[i];
      if(ul.getAttribute("class") != null  && ul.getAttribute("class").indexOf("css_zalozky") >= 0) {
        ul.innerHTML += "<li class=\"css_akt\"><a href=\"javascript:void(0)\" id=\"staryPokec\">Starý pokec</a></li>";
        document.getElementById("staryPokec").addEventListener('click', fStaryPokec, false);
        break;
      }
    }
  }
}



