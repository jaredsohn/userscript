// Plemiona - usuwacz reklam
// Wykonane przez Thomas Thephasdin, modyfikowane przez Pawła Woronieckiego
// ==UserScript==
// @name           Plemiona - usuwacz reklam
// @author         Modyfikacja skryptu Thomas'a Thephasdin'a
// @namespace      local
// @description    Skrypt usuwa reklamy z Plemion.
// @include        http://pl*.plemiona.pl/ad_sky.php
// @include        http://pl*.plemiona.pl/ad_top.php
// @version        Mod wersji 0.5
// ==/UserScript==

//var adframe = document.getElementsByTagName("ad");
//adframe.src = "about:blank";

document.body.innerHTML = "";
if(parent.document.body.getAttribute("rows")){
  parent.document.body.rows='0, *';
}
if(parent.document.body.getAttribute("cols")){
  parent.document.body.cols='*, 0';
}
unsafeWindow.reload = function(ad_top, ad_sky){
  ;
}
return;