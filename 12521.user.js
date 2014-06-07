// hideThreads 1.1
// by psyched 07
//
// ==UserScript==
// @name           hideThreads
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Blendet einzelne Threads aus
// @include        http://forum.mods.de/bb/board.php*
// @exclude        http://forum.mods.de/bb/(index|thread|suche).php
// ==/UserScript==

function threads (e) {
  GM_setValue("threads", (prompt("ThreadURLs eingeben, per ';' trennen.",GM_getValue("threads") )));
}
GM_registerMenuCommand("Threads Ausblenden", threads);

if (GM_getValue("threads") != "" && GM_getValue("threads") != "undefined") {
  var threads = GM_getValue("threads");
  var threadarray = threads.split(";");
  var i=0;
  while (i < threadarray.length) {
    var tids = threadarray[i].substr(39, 50);
    var re = new RegExp("\\?TID="+tids+"$", "gi");
    var a = document.getElementsByTagName("a");
    for (var k=0; k<a.length; k++) {
      //if (a[k].href.indexOf(tids) > -1 && a[i].parentNode.nodeName.toLowerCase()=="td") {
      if (re.test(a[k].href) != false && a[i].parentNode.nodeName.toLowerCase()=="td") {
        a[k].parentNode.parentNode.parentNode.removeChild(a[k].parentNode.parentNode);
        //var leiste = a[k].parentNode.previousSibling.previousSibling.parentNode;
        //leiste.parentNode.removeChild(leiste);
      }
    }
  i++;
  }
}