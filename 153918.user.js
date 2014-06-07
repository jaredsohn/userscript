// ==UserScript==
// @name       UnFuck FimFic
// @namespace  http://www.fimfiction.net/user/kits
// @version    0.1
// @description  enter something useful -- no
// @match      http*://www.fimfiction.net*
// @copyright  2012+, You
// ==/UserScript==
var container    = document.querySelector ("div.front_page > div.column > div.inner_padding");
var firstTargDiv = container.querySelector ("div.front_page > div.column > div.inner_padding > div:first-child");
var lastTargDiv  = container.querySelector ("div.front_page > div.column > div.inner_padding > div:nth-child(2)");
//-- Swap last to first.
container.insertBefore (lastTargDiv, firstTargDiv);
//-- Move old first to last.
container.appendChild (firstTargDiv);