// ==UserScript==
// @name           BackdoorAmigosWarz
// @include        http://forumwarz.com/*
// @include        http://*.forumwarz.com/*
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

addGlobalStyle("div#topbar { background: url(http://img257.imageshack.us/img257/5209/backdoorbg.png) repeat-x !important; }");
document.getElementById("fwz_logo").src = "http://img524.imageshack.us/img524/919/backdoorlogo.png";