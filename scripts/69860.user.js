// ==UserScript==

// @name           FranchGingerWarz

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



addGlobalStyle("div#topbar { background: url(http://imgur.com/6drIn.gif) repeat-x !important; }");

document.getElementById("fwz_logo").src = "http://imgur.com/OIsdM.png";