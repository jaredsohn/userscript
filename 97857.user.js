// ==UserScript==
// @name          Hide tag popup
// @include       http://*stackoverflow.com/*
// @include       http://*superuser.com/*
// @include       http://*serverfault.com/*
// @include       http://*stackapps.com/*
// @include       http://*stackexchange.com/*
// @include       http://*askubuntu.com/*
// @version       1.0
// @namespace     http://www.isimonbrown.co.uk/hidetagpopup
// ==/UserScript==

// Inspired by this post: http://meta.stackoverflow.com/questions/46562
var style = document.createElement("style");
style.type = "text/css";
style.textContent = "#tag-menu { visibility: hidden !important; }";
document.body.appendChild(style);