// ==UserScript==
// @name           tgdaily.com news cleanup
// @description    Remove ads and other non-content, greatly simplified, includes some tomshardware.com news
// @include        http://www.tgdaily.com/html_tmp/*
// @include        http://www.tgdaily.com/content/view/*
// ==/UserScript==

/******* Other Suggestions
 * In addition to this greasemonkey script I suggest using Adblock
 * Plus, NoScript, and AutoPager:
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
 *     - yimg.com
 *     - about:blank
 *     - tgdaily.com
 *
 ****** AutoPager settings:
 * URL Pattern:     ^http://www\.tgdaily\.com/(?:content/view/|html_tmp/content-view-) (regex)
 * Link XPath:      //a[contains(text(),'Next >>')]
 * Content XPath:   //div[@id='content_lr']
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line:
 */

//      /http://(((.*\.(buzz\.yahoo|quantserve|yimg)|digg|img\.constantcontact|shops\.tgdaily)\.com/)|(www\.tgdaily\.com/((components/com_jomcomment|mambots|templates/tgd2)/|images/(stories/(60teaser/|rss_)|favicon\.ico|m_images/))))/

var item_to_replace  = $x("//div[@id='wrapper']")[0];
var replace_with     = $x("//div[@id='content_lr']")[0];

var stuff_to_remove = [
	"//div[@class='tgd-sites']",
	"//div[@id='component_wrapper']/table[@class='contentpaneopen']/tbody/tr/td/table[1]",
	"//div[@id='commentTools']/following::*",
	"//div[@id='commentTools']",
	"//div[contains(a/text(),'Next >>')]/following::*",
	"//table[@class='contenttoc']",
	"//table[@class='contentpaneopen']/tbody/tr[1]",
	"//table[@class='contentpaneopen']/tbody/tr[1]",
	"//table[@class='contentpaneopen']/tbody/tr[1]",
	"//table[@class='contentpaneopen']/tbody/tr/td/br[1]",
	"//table[@class='contentpaneopen']/tbody/tr/td/br[1]",
	"//table[@class='contentpaneopen']/tbody/tr/td/br[1]",
	"//div[@class='pagenavcounter']",
	"//div[@class='pagenavbar']/preceding::br[1]",
	"//div[@class='pagenavbar']/preceding::br[1]",
	"//div[@class='pagenavbar']/preceding::br[1]",
	"//div[@class='pagenavbar']/preceding::br[1]",
	"//div[@class='pagenavbar']/preceding::b[contains(text(),'Read on the next page')]/preceding::br[1]",
	"//div[@class='pagenavbar']/preceding::b[contains(text(),'Read on the next page')]/preceding::br[1]",
	"//div[@class='pagenavbar']/preceding::b[contains(text(),'Read on the next page')]",
];

$x("//div[@class='pagenavbar']").forEach(function(ad1) {
	ad1.style.visibility = "hidden";
});

$x("//div[@id='content_lr']").forEach(function(ad1) {
	ad1.style.width = "500px";
});

$x("//div[@class='inner_content']/p").forEach(function(ad1) {
	ad1.style.width = "500px";
});

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
