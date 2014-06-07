// ==UserScript==
// @name           money.cnn.com cleanup2
// @description    Remove ads and other non-content, greatly simplified. Should be used with main cnn.com cleanup script
// @include        http://money.cnn.com/*
// ==/UserScript==

/******* Other Suggestions
 * In addition to this greasemonkey script I suggest using Adblock
 * Plus, and NoScript.
 * Adblock Plus:  https://addons.mozilla.org/en-US/firefox/addon/1865
 * NoScript:      https://addons.mozilla.org/en-US/firefox/addon/722
 *
 ****** NoScript settings:
 * I personally enable the NoScript option:
 * General -> Scripts Globally Allowed (dangerous)
 *
 * So besides just installing NoScript, I also have to blacklist the
 * sites I wanted to block.  For this site that includes:
 *     - cnn.com
 *     - turner.com
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line.  Note: If you're
 * already using the main cnn.com cleanup script, this is redundant:
 */

//    /http://(((metrics|symbolcomplete\.money)\.cnn\.com/)|((.*\.cnn\.net|i\.cdn\.turner\.com)/cnn/|.*\.(cdn\.turner\.com/cnn/.*((60x45|89x49)\.jpg|\.(css|gif))|turner\.com/money/|wordpress\.com/.*\.css)|money\.cnn\.com/cookie\.crumb))/


var item_to_replace  = $x("//div[@id='cnnMoneyGallery']")[0];
var replace_with     = $x("//div[@id='galText']")[0];

var stuff_to_remove = [
	"//div[@id='banner_top']",
	"//div[@class='content_box']",
	"//div[@id='galText']/p/a",
	"//div[@id='galText']/b",
	"//div[@id='imgRelatedsContainerNorm']",
	"//div[@id='moneyMarketsNav']",
	"//div[@class='sponsorAdTop']",
	"//div[@id='moneyAutosNav']",
	"//div[@id='header']",
	"//div[@class='brow']",
	"//div[@id='pagefooter']/following::*",
	"//div[@id='pagefooter']",
	"//div[@id='moneyRealEstateNav']",
	"//div[@id='moneyTechNav']",
	"//div[@id='moneySmBizNav']",
	"//div[@id='fsb_banner']",
	"//div[@class='mainCol_block']/following::*",
	"//div[@class='mainCol_block']",
];

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

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
