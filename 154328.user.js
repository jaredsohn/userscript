// ==UserScript==
// @name YouTube Inbox
// @namespace TechTubeCentral
// @version 1.1
// @description Adds link to YouTube sidebar to go directly to your inbox
// @match http://*/*
// @copyright TechTubeCentral
// ==/UserScript==
 
(function () {
var tgt = document.querySelector(".guide-module-content #gh-personal .guide-item-container .guide-user-links");
var d = document.createElement("li");
d.idName = "guide-item";
d.innerHTML = '<a class=\guide-item\ href=\/inbox\>Inbox<\/a\>';
tgt.appendChild(d);
 
})();