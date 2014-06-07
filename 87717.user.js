// ==UserScript==
// @name           PhpMyAdmin KeepAlive
// @namespace      http://www.twitter.com/0x7E
// @description    Solves phpMyAdmin timeouts (in Plesk sessions).
// @run-at         document-start
// ==/UserScript==


(function() {

function timer() {
   setTimeout("document.location.href = document.location.href+'?blurred=1'",(1000*600)); 
}

var loc = document.location.href;
var findstr = loc.indexOf("phpMyAdmin");

if(findstr != -1) { 
   if(loc.indexOf("blurred")==-1) {
      window.addEventListener("blur", timer, false); 
    } else {
     setTimeout("document.location.href = document.location.href",(1000*600));
  }
}

})();