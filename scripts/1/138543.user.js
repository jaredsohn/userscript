// ==UserScript==
// @name           HardOCP Relinker
// @namespace      http://www.zanloy.com/
// @version        1.0
// @downloadURL    https://zanloy.com/scripts/js/hardocp_relinker.user.js
// @updateURL      https://zanloy.com/scripts/js/hardocp_relinker.user.js
// @description    Forces the links on HardOCP to open in the same tab.
// @match          http://www.hardocp.com/*
// @match          http://hardocp.com/*
// @copyright      2012+, Zan Loy
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=links.length-1; i>=0; i--) {
  links[i].target = "_top";
}
