// ==UserScript==
// @name Uncheck Edit Box
// @namespace NicolasZN
// @description ZB Uncheck Edit Box
// @include http://if.invisionfree.com/*
// @include http://zbcode.com/*
// @include http://*.zetaboards.com/*
// @include http://bigboardsresources.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
jQ_ready();

function jQ_ready() {
$("input[name*=show_edit]").removeAttr("checked");
};