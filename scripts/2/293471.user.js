// ==UserScript==
// @name        Auto disable SCM Player on Tumblr
// @namespace   benuk
// @include     *.tumblr.com*
// @version     1
// @grant       none
// ==/UserScript==

window.onload=function() {
    SCM.pause();
}