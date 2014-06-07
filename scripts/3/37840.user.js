// ==UserScript==
// @name           tomshardware.com reviews cleanup
// @description    Remove ads and other non-content, greatly simplified
// @include        http://www.tomshardware.com/reviews/*
// ==/UserScript==

/******* Other Suggestions
 * In addition to this greasemonkey script I suggest using Adblock
 * Plus, NoScript, and AutoPager.
 * Adblock Plus:  https://addons.mozilla.org/en-US/firefox/addon/1865
 * NoScript:      https://addons.mozilla.org/en-US/firefox/addon/722
 * AutoPager:     https://addons.mozilla.org/en-US/firefox/addon/4925
 *
 ****** NoScript settings:
 * I personally enable the NoScript option:
 * General -> Scripts Globally Allowed (dangerous)
 *
 * So besides just installing NoScript, I also have to blacklist the
 * sites I wanted to block.  For this site that includes:
 *     - tomshardware.com
 *     - bestofmedia.com
 *     - kontera.com
 *     - revsci.net
 *     - clickdensity.com
 *     - dl-rms.com
 *     - tacoda.net
 *
 ****** AutoPager settings:
 * URL Pattern:     http://www.tomshardware.com/reviews/*
 * Link XPath:      //li[@class='pagin next']/a[contains(text(), 'Next page')]
 * Content XPath:   //div[@class='KonaBody news-elm']
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line:
 */

//      /http://(.*\.tomshardware\.com/forum/|img\.tomshardware\.com/favicon\.png|(.*\.(ad(\.tomshardware|dthis)|bestofmedia|clickdensity|pricegrabber)\.com/))/

var item_to_replace  = $x("//div[@id='container']")[0];
var replace_with     = $x("//div[@id='news-content']")[0];

var stuff_to_remove = [
	"//div[@class='bd']",
	"//ul[@class='shopping-s-table']",
	"//div[@class='neweggintext']",
	"//p[@class='spip' and span/@class='imgContent imgRight']",
	"//div[@id='navigation-contentB']/div/ol/li[a[contains(@onclick, 'http://www.tomshardware.com/index.php?ctrl=ajax_relativeContentPage') and contains(.., 'More on this topic') and b]]",
	"//li[@class='pagin next']/span[contains(text(), 'Next page')]/following-sibling::a[contains(text(), 'More on this topic')]/ancestor::li",
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
