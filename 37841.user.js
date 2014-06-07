// ==UserScript==
// @name           Greasemonkey Recipe Book
// @description    Contains many helpful examples, only useful for script developers, doesn't do anything by itself
// ==/UserScript==

/*********** Replace high-level container object with real content */
 
/* Often you'll find a page where the main content is inside of a container 
 * object like a <DIV> or <TABLE> or something, and it's deeply nested inside of 
 * some higher-level container, where the higher-level container also contains a 
 * bunch of stuff you'd like to get rid of.  You can't simply delete the 
 * higher-level container because that would delete the main content, too.  
 * Instead you replace with higher-level container with the main content.  Often 
 * this is all that's required to entirely clean up a page.  If not, it should 
 * at least make it easier.
 */

/* Simplest example: the main content is in a <DIV class=KonaBody>, and there's 
 * nothing else on the page you need: simply overwrite the whole <BODY> with 
 * the selected <DIV>.  Note: you can't overwrite <BODY> if you intend to use 
 * AutoPager on this same page!
 */
var item_to_replace  = $x("//body")[0];
var replace_with     = $x("//div[@class='KonaBody']")[0];

/* Simple example: there is a high-level <DIV ID=container> that contains 
 * most/all of the page, and the real content is in a <DIV ID=news CLASS=elm>.
 */
var item_to_replace  = $x("//div[@id='container']")[0];
var replace_with     = $x("//div[@id='news' and @class='elm']")[0];

/* Simple example2: you want to use the same script for multiple slightly 
 * different pages, which in this case have different top-level containers and 
 * different <DIV>'s containing the body.  The solution: try both.  If one 
 * doesn't exist, it won't hurt anything
 * */
var item_to_replace  = $x("//div[@id='cnnContainer']")[0];
var replace_with     = $x("//div[@id='cnnLeftCol']")[0];
var item_to_replace2 = $x("//div[@class='cnnWsnr']")[0];
var replace_with2    = $x("//div[@class='cnnStoryPhotoBox']")[0];

/* Do the replacements defined by the variables above */
if (item_to_replace && replace_with) {
	item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
}
if (item_to_replace2 && replace_with2) {
	item_to_replace2.parentNode.replaceChild(replace_with2, item_to_replace2);
}

/*********** List of objects to be deleted */

var stuff_to_remove = [
	/* Match an <A> with text of "Vote for CNN Hero":
	 * <A HREF=foo>Vote for CNN Hero</A> */
	"//a[contains(text(),'Vote for CNN Hero')]",

	/* Match a <LI> by its contents, where the contents is an <A>
	 * with "/video/" somewhere in the HREF:
	 * <LI><A HREF=http://foo/video/asdf>bar</A></LI> */
	"//a[contains(attribute::href,'/video/')]/ancestor::li",
	"//a[contains(attribute::href,'sportsillustrated.cnn.com')]/ancestor::li",

	/* Match an <A> by its contains ("Entertainment"), which can be nested:
	 * <A HREF=foo><SPAN>foo Entertainment bar</SPAN></A> */
	"//a[contains(node(),'Entertainment')]",

	/* Match a <SPAN> by its contents ("iReport"):
	 * <SPAN>foo iReport bar</SPAN> */
	"//span[contains(text(),'iReport')]",

	/* Match a <P> that contains a SPAN with class=cnnBlogFiledBy:
	 * <P><SPAN CLASS=cnnBlogFiledBy>foo</P> */
	"//p[span/@class='cnnBlogFiledBy']",
	/* Match a <P CLASS=spip> that contains a
	 * <SPAN CLASS='imgContent imgRight'>foo</SPAN>
	 * XXX: Is this right? */
	"//p[@class='spip' and span/@class='imgContent imgRight']",

	/* Match <DIV> of class=snap_previous which contains a <P>, which
	 * contains bold ("<STRONG>") text:
	 * <DIV CLASS=snap_preview><P><STRONG>foo</STRONG></P></DIV> */
	"//div[@class='snap_preview']/p/strong",

	/* Match a <TABLE> with class=cnnPL:
	 * <TABLE CLASS=cnnPL><TH>foo</TH><TR><TD>bar</TD></TR></TABLE> */
	"//table[@class='cnnPL']",

	/* Match a <DIV> of class=cnnMosiacContentCol that is followed by
	 * a <DIV> of class=cnnUGCBox */
	"//div[@class='cnnMosaicContentCol']/div[@class='cnnUGCBox']",

	/* Match everything that follows a link named "Previous articles" */
	"//div[contains(a/text(),'Previous articles')]/following::*",
	/* Match link itself */
	"//div[contains(a/text(),'Previous articles')]",

	/* Match everything that follows a <DIV ID=commentTools> */
	"//div[@id='commentTools']/following::*",
	/* Match <DIV> itself */
	"//div[@id='commentTools']",

	/* Match table cell 1 and 2 inside of a <TR>, which is
	 * inside of <TBODY>, inside <TABLE ID=tableauPhotoReportage>: */
	"//table[@id='tableauPhotoReportage']/tbody/tr/td[1]",
	"//table[@id='tableauPhotoReportage']/tbody/tr/td[2]",
];

/* This deletes from the page all the items mentioned in the array above */
stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);


/*********** Tweak displayed objects */

/* Find <DIV CLASS=cnnT1Img> and set "float" and "width" CSS attributes */
$x("//div[@class='cnnT1Img']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '300px';
});

/* Find DIV and set "float", "width" and "height" CSS attributes */
$x("//div[@class='cnnT1Txt']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '50%';
	ad1.style.height = '280px'; /* Makes Other News appear after image */
});

/* Remove <span> tags (preserve text) for links inside of DIV:
 * Starts as: <DIV CLASS=cnnHeaderLnk><A href=foo><SPAN>bar</SPAN></A></DIV>
 * Ends as:   <DIV CLASS=cnnHeaderLnk><A href=foo>bar</A></DIV> */
$x("//div[@class='cnnHeaderLnk']/a").forEach(function(ad1) {
	ad1.innerHTML = ad1.innerHTML.replace(/<span[^>]*>([^<]*)<\/span>.*/gi, '$1');
});
/* Remove <a> tags, but preserve the text and add bold for all links in a DIV:
 * Starts as: <DIV CLASS=cnnHeaderLnk><A href=foo>bar</A></DIV>
 * Ends as:   <DIV CLASS=cnnHeaderLnk><B>bar</B></DIV>          */
$x("//div[@class='cnnHeaderLnk']").forEach(function(ad1) {
	ad1.innerHTML = ad1.innerHTML.replace(/<a[^>]*>([^<]*)<\/a>/gi, '<b>$1</b>');
});

/* Other ways that objects can be made invisible: */
$x("//div[@class='cnnHeader']").forEach(function(ad1) {
	/* Make object contents NULL */
	ad1.innerHTML = "";
	/* Make object hidden, still takes up space */
	ad1.style.visibility = "hidden";
	/* Make object hidden, doesn't take up space */
	ad1.style.visibility = "collapse";
	/* Make 0 pixels high by 0 pixels wide */
	ad1.width  = 0;
	ad1.height = 0;
});

/* Replace contents of object ID=searchwikicss with the specified CSS */
var replacewith="#wml,.w10,.w20,.wcd,.wci,.wce{display:none!important}";
window.document.getElementById('searchwikicss').innerHTML = replacewith;

/* Single-line version of xpath removeChild */
$x("//div[@id='cnnHeader']").forEach(function(ad1) { ad1.parentNode.removeChild(ad1); });

/* Multi-line version of xpath removeChild */
ad1 = $x("//div[@id='cnnHeader']");
ad1.forEach(function(ad1) { ad1.parentNode.removeChild(ad1); });

/* Function copied from greasemonkey wiki that searches for an XPath and 
 * returns a list of matching elements */
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

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
 *     - site1.com
 *     - site2.com
 *
 ****** AutoPager settings:
 * URL Pattern:     http*://www.tomshardware.com/cgi-bin/search?*
 * URL Pattern:     ^http://www\.theregister\.co\.uk/(\d+/){3}.   (regex)
 * Link XPath:      //li[@class='pagin next']/span[contains(text(),
 *                  'Next page')]/following-sibling::a
 * Link XPath:      //li[@class='next']/a
 * Link XPath:      //a[contains(text(),'Next')]
 * Link XPath:      //a[@class='next' and contains(text(),'Next page')]
 * Link XPath:      //a[div[@id=('nn')]] | //a[span/@id='nn'] |
 *                  id("nav")//td[last()]/a | id("nn")/parent::a
 * Link XPath:      //a[@class='paginationNextText enableLink' and
 *                  contains(text(),'Next')]
 * Content XPath:   //div[@id='contenuPhotoReportage']
 * Content XPath:   //div[@id='news-content']/div[@class='KonaBody']
 * Content XPath:   //div[@id="body"]
 * Content XPath:   //div[@id='res' and @class='med']
 * Content XPath:   //table[tbody/tr/td/span/@id='KonaBody']
 * Content XPath:   //div[@class='content' and div[1]/@class='paging' and
 *                  form/@class='table-contents' and div[2]/@class='next-prev'
 *                  and div[3]/@class='clearing' and div[4]/@class='paging']
 * Content XPath:   //div[@class='organicResults' and div[1]/@class='orResult'
 *                  and div[2]/@class='orResult' and div[3]/@class='orResult'
 *                  and div[4]/@class='orResult' and div[5]/@class='orResult'
 *                  and div[6]/@class='orResult' and div[7]/@class='orResult'
 *                  and div[8]/@class='orResult' and div[9]/@class='orResult'
 *                  and div[10]/@class='orResult']
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line:
 */

//    /http://(.*\.tomshardware\.com/forum/|img\.tomshardware\.com/favicon\.png|(.*\.(ad(\.tomshardware|dthis)|bestofmedia|clickdensity|pricegrabber)\.com/))/

