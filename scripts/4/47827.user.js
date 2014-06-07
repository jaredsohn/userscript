// ==UserScript==
// @name           PotterWarz
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

addGlobalStyle("div#topbar { background: url(http://img410.imageshack.us/img410/9045/backgrounde.png) repeat-x !important; }");
document.getElementById("fwz_logo").src = "http://img242.imageshack.us/img242/1855/logodsr.png";