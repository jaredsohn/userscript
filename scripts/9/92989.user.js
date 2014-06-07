// ==UserScript==
// @name           DIGfun討論區
// @namespace      by Peter Po
// @description    None
// @include        http://*.facebook.com/*
// ==/UserScript==

DFer = 'DIGfun.net';
DFurl = 'http://digfun.net';

PageNav = document.getElementById("pageNav");

DFerText = PageNav.getElementsByTagName("li")[0];
DFerText.innerHTML = '<a href="'+DFurl+'" target="_blank">'+DFer+'</a>';