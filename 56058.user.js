// ==UserScript==
// @name           TrekBBS Hide Sidebar
// @author         Mr. B
// @description    disables display of sidebar on TrekBBS
// @include        *trekbbs.com*
// ==/UserScript==

var side = document.evaluate("//iframe[contains(@src,'slipserver.com')]/parent::td",document,null,9,null).singleNodeValue;
if(side) side.parentNode.removeChild(side);
