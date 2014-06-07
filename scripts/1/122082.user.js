// ==UserScript==
// @name           Forums
// @namespace      Stardrift
// @include        http://stardriftempires.com/alliances/show/*
// ==/UserScript==

var iframe = document.createElement("iframe");
var msgLoc = document.getElementById("message_board");
msgLoc.innerHTML = "";
msgLoc.appendChild(iframe);
iframe.src = "http://stardriftmutants.proboards.com";
iframe.width="730px";
iframe.height="2000px";
iframe.scrolling = "auto";