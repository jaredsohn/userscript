// ==UserScript==
// @name           Glenn Greenwald - Salon.com fixer
// @namespace      salon.com
// @include        http://*.salon.com/*
// ==/UserScript==

var style_node = document.createElement("style");
style_node.setAttribute("type", "text/css");
style_node.appendChild(document.createTextNode(".grid_6{width:auto !important;margin-right:1em !important}.articleInner{text-align:justify}.grid_2{display:none !important}.grid_10{left:0 !important;width:auto !important}.shareButtons{display:none}.shareTools{display:none}.grid_4{display:none !important}.topAdWrapper{display:none}.adContainer{display:none !important}.zoneTable107{width:0px !important;height:0px !important;display:none !important}"));
document.getElementsByTagName("head")[0].appendChild(style_node);