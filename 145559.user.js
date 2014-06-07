// ==UserScript==
// @name        sunfreeware no nag
// @namespace   http://userscripts.org/users/484725
// @description Disables the unixpackages nag on sunfreeware.com
// @include     http://www.sunfreeware.com/*
// @include     http://sunfreeware.com/*
// @version     1
// @grant       none
// ==/UserScript==
var script = document.createElement ('script');
script.innerHTML = "function confirmation() { return false; }"
document.getElementsByTagName('head')[0].appendChild(script);
