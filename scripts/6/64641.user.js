// ==UserScript==
// @name           twt
// @namespace      twt
// @description    The question on Twitter now looks more like a command line.
// @include        *twitter.com*
// ==/UserScript==

document.getElementsByClassName('doing')[0].innerHTML = "<font size='3px'>twt></font>";