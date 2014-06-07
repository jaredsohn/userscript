// ==UserScript==
// @name           Keep Full Screen
// @namespace     http://superuser.com/q/315949
// @description    Prevents Escape key from leaving full screen.
// @include      http://*
// ==/UserScript==
document.onkeydown = function (evt) {
    if (evt.keyCode == 27) evt.preventDefault();
}
