// ==UserScript==
// @name          SWFChan Images
// @namespace     http://flyne.monkey.googlepages.com
// @include       http://eye.swfchan.com/search.asp?q=*
// @description   Replaces links to screenshots with the actual screenshots when searching for flashes.
// ==/UserScript==


function doIt() {
  links = tele.getElementsByTagName("a")
  for(var i=00; i<links.length && i<1000; i++) {
    if(links[i].firstChild.nodeValue=="[s]") links[i].innerHTML="<div style='width:200px; height:60px; overflow: hidden;'><img style='width:100%' src='" + links[i].href + "' ></img></div>"
  }
}

tele = document.getElementById('list')



doIt()