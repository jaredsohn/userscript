// ==UserScript==
// @name            Ogame-FR(v0.83) optimisation page principale
// @namespace       The KBX
// @version         0.3.2
// @include         *ogame*overview*
// ==/UserScript==
(function() {
var css = "#combox {display : none!important;}";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}
})();
//.user.js