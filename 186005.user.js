// ==UserScript==
// @name        Show Source
// @namespace   ShowSource
// @version     1
// ==/UserScript==

document.ondblclick = function (e) {
source = document.documentElement.innerHTML;
myW = window.open();
myW.document.body.innerHTML = "<textarea cols='80' rows='40'>"+source+"</textarea>";

}