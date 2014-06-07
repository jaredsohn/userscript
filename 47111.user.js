// Tribal Wars - Anti-Advertisement
// Made By Thomas Thephasdin
// ==UserScript==
// @name           Tribal Wars - Anti-Advertisement
// @author         Thomas Thephasdin
// @namespace      local
// @description    Removes the advertisement on „Tribal Wars".
// @include        http://en*.tribalwars.net/ad_sky.php
// @include        http://en*.tribalwars.net/ad_top.php
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