// ==UserScript==

// @name           Farm Alert
// @author         Rayl
// @namespace	   FA
// @description    Script di prova, NON INSTALLARE
// @include        http://*.travian.*/karte.php?d=*
// @grant          none
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==

   if ($('body').html().match("protection")) {
 setTimeout(function () {
   location.href = "";
  }, 60000);
 }  else {
   alert("Sbloccata nuova Farm");
}