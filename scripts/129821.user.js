// ==UserScript==
// @name           hunte
// @namespace      hunte
// @description    51weijing.com large image
// @require        http://www.51weijing.com/js/switch.js
// @include        www.51weijing.com/*
// @match 				 www.51weijing.com/*
// @version        0.1
// ==/UserScript==

$(".readmode").attr('rel','big');
$(".readmode").removeClass("small").addClass("big");
$(".zoom-move").trigger("click");