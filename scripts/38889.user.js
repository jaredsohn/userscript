// ==UserScript==
// @name           infoworld.com cleanup
// @namespace      http://localhost/
// @description    Remove ads, nav junk, greatly simplify
// @include        http://www.infoworld.com/article/*.html*
// ==/UserScript==

/******* Other Suggestions
 * In addition to this greasemonkey script I suggest using Adblock
 * Plus, and NoScript.
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
 *     - google.com
 *     - google-analytics.com
 *     - industrybrains.com
 *     - quantserve.com
 *     - doubleclick.net
 *     - infoworld.com
 *
 ****** AutoPager settings:
 * URL Pattern:     http://www\.infoworld\.com/article/0[0-6]/.*\.html  (regex)
 * Link XPath:      //a[contains(text(),'Next Page')]
 * Content XPath:   //p[@class='ArticleBody'] | //webteaser/preceding::webheadline/ancestor::h1 | //webteaser | //webteaser/following::td[1]
 * URL Pattern:     http://www.infoworld.com/article/*.html*
 * Link XPath:      //a[contains(text(),'NEXT PAGE')]
 * Content XPath:   //span[@class='artText'] | | //p[@class='ArticleBody']
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line.
 */

//    /http://(images\.infoworld\.com/(ad/.*|img/(dot_.*|email|print|reprints2|ftr_.*|upload/.*|img_hdshot_.*|tinyXML|red_hdr_bg_2|washpost_logo)\.(gif|jpg|jpeg)))|(www\.infoworld\.com/img/icon/.*)|(img\.icbdr\.com/.*)/


var item_to_replace  = $x("//p[@class='ArticleBody']/ancestor::table[2]")[0];
var replace_with     = $x("//p[@class='ArticleBody']/ancestor::table[1]")[0];
var item_to_replace2 = $x("//div[span/@class='bodyText']")[0];
var replace_with2    = $x("//a[contains(text(),'Next Page')]")[0];
var item_to_replace3 = $x("//div[@id='masthead']")[0];
var replace_with3    = $x("//div[@id='leftCol']")[0];
var item_to_replace4 = $x("//div[@id='page']")[0];
var replace_with4    = $x("//div[@class='article_content']")[0];

var stuff_to_remove = [
	"//b[contains(text(),'criteria')]/ancestor::table[2]/following::table",
	"//b[contains(text(),'Free IT')]/ancestor::table[2]",
	"//b[contains(text(),'TEST CENTER')]/ancestor::table[2]",
	"//body/center/table[1]",
	"//body/center/table[1]",
	"//a[contains(text(), 'Printer')]/ancestor::td[1]",
	"//ul[@id='back_to_sr']",
	"//div[@id='rightcol']",
	"//div[@id='ratings']/following::*",
	"//div[@id='ratings']",
	"//div[@class='toolsuite']",
	"//div[@class='js-kit-rating']",
	"//div[@class='tools']",
	"//div[@class='story']/following::*",
	"//div[@class='continued f-right']",
];

$x("//a[contains(text(),'Next Page')]").forEach(function(item){item.style.visibility = "hidden"; });
$x("//div[@class='pagination f-right']").forEach(function(item){item.style.visibility = "hidden"; });
$x("//div[@class='cont']").forEach(function(item){item.style.visibility = "hidden"; });
$x("//p[@class='ArticleBody']").forEach(function(item){item.style.textAlign = "left"; });

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

if (item_to_replace && replace_with) {
	item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
}
if (item_to_replace2 && replace_with2) {
	item_to_replace2.parentNode.replaceChild(replace_with2, item_to_replace2);
}
if (item_to_replace3 && replace_with3) {
	item_to_replace3.parentNode.replaceChild(replace_with3, item_to_replace3);
}
if (item_to_replace4 && replace_with4) {
	item_to_replace4.parentNode.replaceChild(replace_with4, item_to_replace4);
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

