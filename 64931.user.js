// ==UserScript==
// @name           Sexuria current site fixer
// @namespace      Sexuria
// @description    Fixes the current page highliting
// @include        http://sexuria.com/*
// @author         Some IT Guy
// ==/UserScript==

if (window.location.href.toLocaleString().search(/Page_/) != "-1") {
    var test = window.location.href.toLocaleString().substr(window.location.href.toLocaleString().search(/Page_/)+5, window.location.href.toLocaleString().length);
    test = test.substr(0, test.search(/.html/));
    te = new RegExp("\\[" + test + "\\]", "g");
    document.body.innerHTML = document.body.innerHTML.replace(te, "<span style='font-size:18px;'>[" + test + "]</span>");
}