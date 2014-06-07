// ==UserScript==
// @name           TVNZB sidebar hider
// @namespace      http://madmax.wash.st/~scott/userscripts
// @description    Hides TVNZB's currently unused sidebar to give more space to content
// @include        *tvnzb.com/
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) { return; }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}

sidebar = document.getElementById("sidebar1");
if (sidebar) {
    sidebar.parentNode.removeChild(sidebar);
    addGlobalStyle('.twoColFixRtHdr #mainContent { margin-right: 0; }');
}
