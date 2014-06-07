// ==UserScript==
// @name           Aywas Lair Checker abandon
// @namespace      Lair checker thing
// @description    Sends to adoption instead of putting up for auction - For this site: http://morranr.net/Aywas/lair_checker.php
// @include        http://morranr.net/Aywas/lair_checker.php*
// ==/UserScript==

var links = document.getElementsByTagName("a"); //array
var i;
var imax;
for (i=0, imax=links.length; i<imax; i++) { 
   links[i].href = links[i].href.replace("pet_auction","adoption");
   links[i].href = links[i].href.replace("add","abandon");
}