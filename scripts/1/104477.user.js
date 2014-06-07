// ==UserScript==
// @name           imo.im - promo-suppress and buddy list clean
// @description    prevents the promo box from appearing and cleans up the buddy list
// @include        http://imo.im/*
// @include        https://imo.im/*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.2
// ==/UserScript==

// Message View
GM_addStyle("#mnp-panel, .promo-display {display: none !important;}");
GM_addStyle("div#main.with_mnp {left: 0 !important;}");
GM_addStyle("div#buddypanel div.blist-container .buddyitem span.statusdisplay {display: none !important;}");