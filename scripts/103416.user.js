// ==UserScript==
// @name           hide eventlist
// @include        http://*.ogame.de/game/index.php?*
// ==/UserScript==

  var page = document.URL.match(/page=([a-zA-Z0-9]+)/)[1];
  if (! (page == 'overview' || page == 'galaxy')){
    document.getElementById("eventboxContent").style.display = 'none';
  }
