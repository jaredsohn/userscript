// ==UserScript==
// @match http://www.siteduzero.com/*
// @name SignatureSdZ
// @description Script pour corriger le bug des signatures du SdZ
// ==/UserScript==

var newEl = document.createElement("style");
newEl.textContent = ".signature { height:100% !important; }";
document.getElementsByTagName("head")[0].appendChild(newEl);