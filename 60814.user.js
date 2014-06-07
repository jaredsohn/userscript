// ==UserScript==
// @name           RemoveSocialBar - howstuffworks
// @namespace      RSBHSW
// @include        http://*.howstuffworks.com/*
// @include        http://www.howstuffworks.com/*
// ==/UserScript==

var d = document.getElementsByClassName('inside')[0];
d.parentNode.removeChild(d);