// ==UserScript==
// @name          Dragon Go Server Title
// @namespace     http://bje.nu/mozilla-greasemonkey.shtml
// @description   Promting about your moves in the page's title. 
// @include       http://www.dragongoserver.net/status.php
// ==/UserScript==

(function(){
  var gameLink = /^(game.php)/i;

  var l = document.getElementsByTagName("a");
  var count = 0;

  for (var cand = null, i = 0; (cand = l[i]); i++) {
    uim = gameLink.exec(cand.getAttribute('href'));
    
    if (uim != null) {
      count++;
    }
  switch (count) {
   case 0:
	break;

   case 1:
	document.title='DGS - ' + count + ' game     ';
	break;
   default: 
	document.title='DGS - ' + count + ' games   ';
   
   }



  }
})();
