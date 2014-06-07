// ==UserScript==
// @name           WKW_MinimalLogin
// @author         Agriculturalist
// @version        0.2
// @namespace      *
// @include        http://www.wer-kennt-wen.de/
// @grant          none
// ==/UserScript==


var parent = document.getElementById("seite");
var child = document.getElementById("shadow");

parent.removeChild(child);
