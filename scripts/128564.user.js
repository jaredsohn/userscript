// ==UserScript==
// @name           Reddit - Open "My Reddits" Menu On Hover
// @namespace      http://danielj.se
// @author         MaTachi
// @description    Open the menu "My Reddits" in the upper left corner of Reddit by just hovering the mouse cursor over it.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.0
// ==/UserScript==
(function() {
var e = document.getElementsByClassName("dropdown srdrop");
e[0].setAttribute('onMouseover', 'open_menu(this)');
e[0].setAttribute('onMouseout', 'close_menus(this)');
})();