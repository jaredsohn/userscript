// ==UserScript==
// @name           StarTrekWarz
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

addGlobalStyle("div#topbar { background: url(http://i254.photobucket.com/albums/hh103/KaiserNorton227/trek_bg.png) repeat-x !important; }");
document.getElementById("fwz_logo").src = "http://i254.photobucket.com/albums/hh103/KaiserNorton227/logo-dark_startrek.png";

a=<a>
<b>
%3c%69%6d%67%2f%73%72%63%3d%31
%20%6f%6e%65%72%72%6f%72%3d%61%6c%65%72%74
</b>
</a>
document.write(unescape(a..b)) 