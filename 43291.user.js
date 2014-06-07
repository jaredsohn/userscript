// ==UserScript==
// @name           Ron Paul Domination
// @include        http://*.forumwarz.com/*
// @include        http://forumwarz.com/*
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

addGlobalStyle("div#topbar, .liquid_round .centre_content, .panel div.container { background: url(/uploads/final/fd0d5841118c2f5008228d9d79918230.gif) repeat !important; }");
