// ==UserScript==
// @name           FlirtyWarz
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

addGlobalStyle("div#topbar { background: url(http://i254.photobucket.com/albums/hh103/KaiserNorton227/fish_bg.png) repeat-x !important; }");
document.getElementById("fwz_logo").src = "http://i254.photobucket.com/albums/hh103/KaiserNorton227/flirty_logo.png";