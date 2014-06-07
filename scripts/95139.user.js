// ==UserScript==
// @name           ticket pia allow rightclick
// @namespace      http://nonamespace/
// @description    Allow right click on http://ticket.pia.jp/
// @include        http://*.pia.jp/*
// @include        https://*.pia.jp/*
// @version        1.2
// ==/UserScript==

document.oncontextmenu = function truefunc(){return true;}