// ==UserScript==
// @name           Wretch Album Mouse Enable
// @namespace      http://userscripts.org/scripts/show/86343
// @version        1.0
// @description    Set 'oncontextmenu', 'onselectstart', 'ondragstart' to return true
// @include        http://www.wretch.cc/album/*
// ==/UserScript==

document.body.setAttribute('oncontextmenu', 'return true');
document.body.setAttribute('onselectstart', 'return true');
document.body.setAttribute('ondragstart', 'return true');