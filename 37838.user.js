// ==UserScript==
// @name           tomshardware.com news cleanup
// @description    Remove ads and other non-content, greatly simplified
// @include        http://www.tomshardware.com/news/*
// @include        http://www.tomshardware.com/gallery/*
// ==/UserScript==

/******* Other Suggestions
 * In addition to this greasemonkey script I suggest using Adblock
 * Plus, NoScript, and AutoPager.
 * Adblock Plus:  https://addons.mozilla.org/en-US/firefox/addon/1865
 * NoScript:      https://addons.mozilla.org/en-US/firefox/addon/722
 * AutoPager:     https://addons.mozilla.org/en-US/firefox/addon/4925
 *
 ****** AutoPager settings:
 * URL Pattern:     http://www.tomshardware.com/gallery/*
 * Link XPath:      //a[@class='nextLargeImg']
 * Content XPath:   //img[@id='zoom']
 *
 ****** NoScript settings:
 * I personally enable the NoScript option:
 * General -> Scripts Globally Allowed (dangerous)
 *
 * So besides just installing NoScript, I also have to blacklist the
 * sites I wanted to block.  For this site that includes:
 *     - tomshardware.com
 *     - bestofmedia.com
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line:
 */

//    /http://(.*\.tomshardware\.com/forum/|img\.tomshardware\.com/favicon\.png|(.*\.(ad(\.tomshardware|dthis)|bestofmedia|clickdensity|pricegrabber)\.com/))/

var item_to_replace  = $x("//div[@id='container']")[0];
var replace_with     = $x("//div[@class='KonaBody']")[0];

var stuff_to_remove = [
	"//div[@class='basicCentral']",
];

if (item_to_replace && replace_with) {
	item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
}

stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
