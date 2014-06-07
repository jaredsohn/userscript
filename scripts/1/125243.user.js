// ==UserScript==
// @name           Campfire Remove Entered/Left Room Messages
// @description    Remove boring messages nobody cares about
// @include        *.campfirenow.com/*
// @copyright      Warren Dunlop
// @version        1.1
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

var removeShit = function(el){
  var boobs = document.getElementsByClassName(el+'_message');
  for (i=0; i<boobs.length; i++){
      boobs[i].style.display="none";

      if( boobs[i].previousSibling.previousSibling.className == "timestamp_message message") {
        boobs[i].previousSibling.previousSibling.style.display="none";
      }
  }
}

removeShit('enter');
removeShit('kick');
removeShit('leave');