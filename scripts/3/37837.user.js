// ==UserScript==
// @name           theregister.co.uk cleanup
// @description    Remove ads and other non-content, greatly simplified
// @include        http://www.theregister.co.uk/*
// ==/UserScript==

/* Include the following filter in Adblock Plus in addition to an EasyList
 * subscription to complete the cleanup.  Note that the // and immediately
 * following whitespace at the beginning of the line marks the line as a
 * comment and needs to be removed before inserting into Adblock, however,
 * the other slashes are part of the filter string (they mark the filter
 * as being a regular expression) and must be preserved.  Example:
 * //    /asdffoobar/
 *
 * In the above example "/asdffoobar/" is the filter string, and the leading
 * characters: "//    " should  be removed.  You can get Adblock Plus here:
 * https://addons.mozilla.org/en-US/firefox/addon/1865
 *
 * After you install the addon and restart Firefox, you will be prompted to
 * subscribe to a filter list -- choose EasyList.  Next copy the filter below
 * into the clipboard, then press CTRL-SHIFT-E to open the filter list, then
 * press ENTER to input a new filter, then CTRL-V to paste, then ENTER to
 * finalize the new filter, and finally click the OK button -- that's it.
 */ 

//      /http://(regmedia\.co\.uk/|(www\.theregister\.co\.uk/(design/(graphics/std/|javascript/_\.js)|.*/data\.js|favicon\.ico|style_picker/design)))/

var item_to_replace  = $x("//div[@id='page']")[0];
var replace_with     = $x("//div[@id='article']")[0];

var stuff_to_remove = [
	"//div[@id='article-top-nav']",
	"//div[@id='tl-article-bottom']",
	"//p[@id='tl-article-bottom']",
	"//div[@id='article-bottom-nav']",
	"//p[@id='top-text-link']",
	"//p[@class='byline']",
	"//p[@class='dateline']",
	"//div[@id='related-stories']",
	"//p[contains(@class,'wptl')]",
];


function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);

stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);

