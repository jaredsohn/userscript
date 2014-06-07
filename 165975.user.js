// ==UserScript==
// @name        Rainbow DDB
// @namespace   Rainbow DDB
// @description Change la couleur du "!" lorsqu'une DDB est en cours.
// @version     1.0
// @include     http://www.jeuxvideo.com/forums/3-*
// @include     http://www.jeuxvideo.com/forums/1-*
// ==/UserScript==

$ = unsafeWindow.$;
var dates = document.querySelectorAll(".date");
i=0;

function ddb(j) {
url = dates[j].getElementsByTagName("a")[0].href;
   $.get(
   url, 
   function(data) {
   if (data.indexOf("Signalement déjà fait") >= 0) {
   dates[j].querySelector("a img").src = "http://image.noelshack.com/fichiers/2013/17/1367080939-14agd2.png";
   } else if (data.indexOf("Vous êtes à l'origine") >= 0) {
   dates[j].querySelector("a img").src = "http://image.noelshack.com/fichiers/2013/17/1367081255-14aig2.png";
   } else if (data.indexOf("effectué un boost") >= 0) {
   dates[j].querySelector("a img").src = "http://image.noelshack.com/fichiers/2013/17/1367073914-149xe2.png";
   } else if (data.indexOf("Autosignalement déjà effectué") >= 0) {
   dates[j].querySelector("a img").src = "http://image.noelshack.com/fichiers/2013/17/1367082905-14atu2.png";
   } else if (data.indexOf("a déjà été traité") >= 0) {
   dates[j].querySelector("a img").src = "http://image.noelshack.com/fichiers/2013/22/1369829899-sans-titre.png";
   }
   });
}


while (i<dates.length) {
   ddb(i);
   i++;
  }