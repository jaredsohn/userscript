// ==UserScript==
// @name           blogg.se
// @namespace      http://www.blogg.se
// @include        http://*.blogg.se/*
// @include        http://nevnarien.se/*
// ==/UserScript==

var body= document.getElementsByTagName("body")[0];

body.setAttribute("onContextmenu","return true");