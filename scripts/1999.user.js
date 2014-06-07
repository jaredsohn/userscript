// ==UserScript==
// @name	Food Network Recipe Re-Linker
// @namespace	http://plaza.ufl.edu/bassman7/greasemonkey
// @description	Rewrites Food Network recipe links to link to the ad-free, full-page recipe
// @include	http://*.foodnetwork.com*
// @include	http://*.foodtv.com*
// ==/UserScript==

(function() {
  var xpath = '//a[@href]';
  var allLinks = document.evaluate(xpath,
				   document,
			   	   null,
                              	   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				   null);
  var i, link, href
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    link = allLinks.snapshotItem(i);
    link.href = link.href.replace(/recipes\/recipe\/0\,\,/,
				  'cda/recipe_print/0,1946,');
    link.href = link.href.replace(/recipes\/recipe\/0\,1977/,
				  'cda/recipe_print/0,1977');
    if (link.href.match('recipe_print') == 'recipe_print') {
	link.href = link.href.replace(/\,00/, '_PRINT-RECIPE-FULL-PAGE,00');}
  }
})();