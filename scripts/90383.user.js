// ==UserScript==
// @name           New MySpace Remove Im
// @namespace      DevBlue69 at Userscripts
// @include        http://www.myspace.com/*
// ==/UserScript==
x=document.getElementsByTagName("footer")[0];
x.parentNode.removeChild(x);