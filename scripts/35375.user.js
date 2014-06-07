// ==UserScript==
// @name           Javascript refresh blocker (settimeout)
// @namespace      http://www.domoticpoint.com/
// @description    it blocks the first 10 javascript "settimeout" objects, please customize the list of websites it should work on (by default only 2 italian news websites)
// @include        http*corriere.it*
// @include        http*repubblica.it*
// ==/UserScript==

	for(h=1;h<10;h++) {
  unsafeWindow.clearTimeout(h);
}