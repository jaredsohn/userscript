// ==UserScript==
// @name           firefox yyfc
// @namespace      http://userscripts.org/scripts/show/105351
// @description    loop play on yyfc.
// @include        http://yyfc.iq123.com/*
// ==/UserScript==
var player = document.getElementById("players");
if (typeof(player) != "undefined") {
  for (var child = player.firstChild;
       typeof(child) != "undefined";
       child = child.nextSibling) {
    if (child.hasAttributes("name") &&
        child.getAttribute("name").toLowerCase() == "url") {
      var songurl = child.getAttribute("value");
      break;
    }
  }
}
if (typeof(songurl) != "undefined") {
  var nplayer = document.createElement("embed");
  nplayer.setAttribute("src", songurl);
  nplayer.setAttribute("id", player.id);
  nplayer.setAttribute("width", player.width);
  nplayer.setAttribute("height", player.height);
  nplayer.setAttribute("autostart", "true");
  if (navigator.platform.search(/win/i) != -1) {
    nplayer.setAttribute("type", "application/x-mplayer2");
    nplayer.setAttribute("playcount", "10000");
  } else {
    nplayer.setAttribute("loop", "true");
  }
  player.parentNode.replaceChild(nplayer, player);
}
