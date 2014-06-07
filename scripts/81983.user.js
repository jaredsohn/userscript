// ==UserScript==
// @name           wordpress, vergrößert Textbereich
// @namespace      veganesauge
// @description    vergrößert den Textbereich in Artikelansicht
// @include        http://*veganesauge.wordpress.com/*
// ==/UserScript==

var div = document.getElementById("content");
if(div.className == "widecolumn")
{
    var modWidth = document.createAttribute("style");
    modWidth.nodeValue = "margin-left: 30px; width: 700px;";
    div.setAttributeNode(modWidth);
}
