// ==UserScript==
// @name        *eye twitch*
// @namespace   http://localhost
// @description bleh
// @include     http://bleachsoulevolution.com/forum/index.php?/topic/*
// @version     1
// @grant	none
// ==/UserScript==
var spans = document.getElementsByTagName("span");
var slength = spans.length;
for (var i = slength -1; i >= 0; i--) {
    var span = spans[i];
    span.style.color = 'white';
}