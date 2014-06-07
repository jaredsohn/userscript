// Die Stämme - Anti-Werbung
// Made By Thomas Thephasdin
// ==UserScript==
// @name           Die Stämme - Anti-Werbung
// @author         Thomas Thephasdin
// @namespace      local
// @description    Entfernt die Werbung bei „Die Stämme".
// @include        http://de*.die-staemme.de/ad_sky.php
// @include        http://de*.die-staemme.de/ad_top.php
// @version        0.5
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