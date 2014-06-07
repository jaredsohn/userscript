// ==UserScript==
// @name           imgchili
// @description    make imgchili lighter
// @author         Whany K. Thunder
// @include        http://imgchili.com/*
// @version        1.0
// ==/UserScript==

$(window).unbind('push');
$("div.logo_cell").remove();
$("div.sidebar2").remove();
$("div.sidebar").remove();
$("td.tdrow2").remove();