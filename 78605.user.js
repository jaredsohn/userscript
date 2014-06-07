// ==UserScript==
// @name           Pokec.sk - Ziadne radio 
// @namespace      Pokec.sk, nove, sklo, azet, skin, template, stare, dizajn, redizajn, styl, radio, rp, male, mensie
// @require        http://sizzlemctwizzle.com/updater.php?id=78605
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @include        http://pokec.azet.sk/weroro*
// @date           2011-11-10
// @author         MerlinSVK
// @version        1.3.1
// ==/UserScript==
if(window.location.href.indexOf("weroro") != -1){
  var w = document.getElementsByClassName("css_niecoomne");
  w[0].innerHTML = "<a href='http://www.weroro.sk/' target='_self'><img src='http://www.weroro.sk/pokec_header.png' title='Oficiálna stránka'/></a>";
}
else{
  //document.getElementById("radio_expres").style.display = 'none';
  document.getElementById("pokecRadio").style.display = 'none';
}