// ==UserScript==
// @name           Insert the body div
// @namespace      http://monad.tv/
// @description    Insert the body div
// ==/UserScript==

(function () {

var div = document.createElement("div");
div.setAttribute("id", "iBodyDiv");

while (document.body.firstChild)
    div.appendChild(document.body.firstChild);

document.body.appendChild(div);

})();
