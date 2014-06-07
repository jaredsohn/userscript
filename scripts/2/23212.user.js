// ==UserScript==
// @name Btnext: Botao Tracker 
// @author ugo_btuga 
// @namespace      Btnext
// @description   Botao tracker.
// @version 1.0
// @include        http://www.btnext.info/*
// ==/UserScript==


table = document.evaluate('//td[@class="navtd"]/font[@class="navtd"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); //assuming there is exactly one table
var button = document.createElement("a");
button.href = "http://www.btnext.com";
var image = document.createElement("img");
image.src = "http://student.dei.uc.pt/~hmiguel/ficheiros/tracker.gif";
image.setAttribute("border", "0");
image.style.border = "none";
button.setAttribute("target", "_blank");
button.appendChild(image);
table.appendChild(button);