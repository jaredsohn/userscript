// ==UserScript==
// @name           dogsonacid forum footprints
// @namespace      http://madmax.wash.st/~scott/userscripts
// @description    Shows which threads you've already read.. NB you will need to tell FF to remember visited pages in your options/privacy/history
// @include        http://www.dogsonacid.com/forumdisplay.php?*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) { alert("head not found"); return; }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("#all table a:visited { color: gray !important; }");
