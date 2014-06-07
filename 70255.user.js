// ==UserScript==
// @name           Google.com - iGoogle Gadget Cleanup
// @description    Cleanup Some Gadgets
// @include        http://ig.gmodules.com/gadgets/ifr?*
// @include        http://www.ig.gmodules.com/gadgets/ifr?*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.1
// ==/UserScript==
//window.addEventListener ("DOMContentLoaded", doStuff, false);
window.addEventListener ("load", doStuff, false);

function doStuff(){
  var oddElements = document.getElementsByClassName("oddRow");
  for(var a = 0; a < oddElements.length; a++){
    oddElements[a].childNodes[1].style.textAlign = "right";
    oddElements[a].removeChild(oddElements[a].childNodes[2]);
  }
  var evenElements = document.getElementsByClassName("evenRow");
  for(var b = 0; b < evenElements.length; b++){
    evenElements[b].childNodes[1].style.textAlign = "right";
    evenElements[b].removeChild(evenElements[b].childNodes[2]);
  }
  document.getElementById("content").getElementsByTagName("form")[0].style.display = "none";
}