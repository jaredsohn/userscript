// ==UserScript==
// @name          SearchLinks
// @namespace     http://jeffpalm.com/searchlinks
// @description   Searches links by URL
// @include       http://*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

function findPosX(obj) {
  var curleft = 0;
  if(obj.offsetParent) {
    while(1) {
      curleft += obj.offsetLeft;
      if(!obj.offsetParent)
        break;
      obj = obj.offsetParent;
    } 
  } else if(obj.x) {
    curleft += obj.x;
  }
  return curleft;
}

function searchLinks() {
  var regex = prompt('Please enter the search query');
  if (!regex) return;
  var as = document.getElementsByTagName('A');
  var re = new RegExp('.*' + regex + '.*', 'g');
  var scrolled = false;
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (a.href.match(re)) {
      a.style.backgroundColor = '#33ccff';
      if (!scrolled) {
        scrolled = true;
        window.scrollTo(findPosX(a),0);
      }
    }
  }
}


function main() {
  GM_registerMenuCommand("SearchLinks", searchLinks);
}

main();
