// ==UserScript==
// @name           BurgerWarz
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

addGlobalStyle("div#topbar { background: url(http://img141.imageshack.us/img141/8757/backgroundtroll.jpg) repeat-x !important; }");
document.getElementById("fwz_logo").src = "http://img141.imageshack.us/img141/5438/logodark.png";
var status = document.getElementById("logged_in_status");
status.innerHTML = status.innerHTML.replace(/IS A STUPID NAME/, "CAN HAS CHEEZBURGER");
status.innerHTML = status.innerHTML.replace(/A TINY PENIS/, "A HUGE CHEEZBURGER");
