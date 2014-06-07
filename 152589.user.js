// ==UserScript==
// @name        Redirect from site to site
// @namespace   somini
// @include     http://www.youtube.com/
// @include     https://www.youtube.com/
// @version     2.5
// ==/UserScript==

//Redirect from Youtube to ytplaylist
window.location.replace(window.location.href.replace("youtube","ytplaylist"));