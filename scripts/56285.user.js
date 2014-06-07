// ==UserScript==
// @name           DI.se
// @namespace      http://userscripts.org/users/43111
// @description    Removes the big top banner on swedish site di.se
// @include        http://di.se/*
// ==/UserScript==

g = document.getElementsByTagName('frameset')[0]
g.rows = "0,*";