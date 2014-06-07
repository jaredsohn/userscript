// ==UserScript==
// @name       MT forums in new tab
// @version    0.1
// @description  You lazy bum.
// @match      http://*.minethings.com/*
// @copyright  2013+, Hotrootsoup
// ==/UserScript==

var forumLink;

try {
    forumLink = document.getElementsByClassName("forums")[0].getElementsByTagName("a")[0];
}
catch (e) {
    return;
}

forumLink.addEventListener("click", function(e) {
    e.preventDefault();
    window.open("http://aso.minethings.com/miners/forums/", "_blank");
});
    