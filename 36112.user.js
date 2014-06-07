// ==UserScript==
// @name           test_ressource
// @namespace      www.irt.de
// @description    zum Testen des @ressource-Keys
// @include        *
// @resource arrow_down arrow_down.gif
// ==/UserScript==

var doc = document;
var myimg = doc.createElement("img");
myimg.src = "arrow_down";
myimg.title = "Arrow Down";
myimg.alt = "black down arrow";

doc.body.insertBefore(myimg, doc.body.firstChild);