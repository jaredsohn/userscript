// ==UserScript==
// @name           cnn.com cleanup
// @description    Remove ads and other non-content, greatly simplified, works on www.cnn.com, blogs.cnn.com, money.cnn.com
// @include        http://www.cnn.com/*
// @include        http://*.blogs.cnn.com/*
// @include        http://money.cnn.com/*
// @include        http://*.fortune.cnn.com/*
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
 *     - wordpress.com
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line:
 */

//    /http://(((metrics|symbolcomplete\.money)\.cnn\.com/)|((.*\.cnn\.net|i\.cdn\.turner\.com)/cnn/|.*\.(cdn\.turner\.com/cnn/.*((60x45|89x49)\.jpg|\.(css|gif))|turner\.com/money/|wordpress\.com/.*\.css)|money\.cnn\.com/cookie\.crumb))/

var item_to_replace  = $x("//div[@id='cnnContainer']")[0];
var replace_with     = $x("//div[@id='cnnLeftCol']")[0];
var item_to_replace2 = $x("//div[@class='cnnWsnr']")[0];
var replace_with2    = $x("//div[@class='cnnStoryPhotoBox']")[0];

/* Main article image on cnn.com homepage */
$x("//div[@class='cnnT1Img']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '300px';
});

/* Text to support main image */
$x("//div[@class='cnnT1Txt']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '50%';
	ad1.style.height = '280px'; /* Makes Other News appear after image */
});

/* Other News */
$x("//div[@class='cnnT2s']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '360px';
});

/* US, Politics, Entertainment, Travel, iReport, Crime, Business */
$x("//div[@class='cnnPartLeftCol']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '340px';
});

/* Health, Tech, Living, Special Coverage, Science, Sports */
$x("//div[@class='cnnPartRightCol']").forEach(function(ad1) {
	ad1.style.cssFloat = 'left';
	ad1.style.width = '320px';
});

var stuff_to_remove = [
	/* Link named "Vote for CNN Hero" */
	"//a[contains(text(),'Vote for CNN Hero')]",
	/* <LI> that contains a link with /video/ in the URL */
	"//a[contains(attribute::href,'/video/')]/ancestor::li",
	"//a[contains(attribute::href,'ireport')]/ancestor::li",
	"//a[contains(attribute::href,'/si/')]/ancestor::li",
	"//a[contains(attribute::href,'sportsillustrated.cnn.com')]/ancestor::li",
	"//a[contains(attribute::href,'.ew.com')]/ancestor::li",
	"//a[contains(attribute::href,'/TRAVEL/')]/ancestor::li",
	"//a[contains(attribute::href,'/SHOWBIZ/')]/ancestor::li",
	"//a[contains(attribute::href,'people.com/')]/ancestor::li",
	/* Link that contains "Entertainment" somewhere */
	"//a[contains(node(),'Entertainment')]",
	"//a[contains(node(),'Travel')]",
	"//a[contains(node(),'Sports')]",
	"//a[contains(node(),'iReport')]",
	"//span[contains(text(),'iReport')]",
	"//div[@id='moneyNewsNav']",
	"//div[@id='rightColumn']",
	"//div[@class='cnnEndOfStory']",
	"//div[@id='footerGroup']",
	"//div[@id='cnnMoneyBanner']",
	"//div[@id='shareMenuContainer']",
	"//div[@id='rssMenuContainer']",
	"//div[@id='IEContainerR']",
	"//div[@id='storyBrandingBanner']",
	"//div[@id='clickIncludeBox']",
	"//div[@class='storybyline']",
	"//div[@class='storytimestamp']",
	"//div[@id='siteFeatures']",
	"//div[@id='cnnHeader']",
	"//div[@id='cnnRightCol']",
	"//p[span/@class='cnnBlogFiledBy']",
	/* Bold text that follows a paragraph <P> that follows div snap_preview */
	"//div[@class='snap_preview']/p/strong",
	"//div[@class='cnnOverlayMenuContainer']",
	"//div[@class='cnnBlogContentDateHead']",
	"//div[@class='cnnGryTmeStmp']",
	"//div[@class='cnnBlogCommentBar']",
	"//div[@class='cnnPartHeader']",
	"//div[@class='cnnContentHeader']",
	"//div[@class='cnnAll']",
	"//div[@class='cnnMpPartners']",
	"//table[@class='cnnPL']",
	"//div[@class='cnnSuperBox']",
	"//div[@id='cnnMpPopNews']",
	"//div[@id='cnnMoPo']",
	"//div[@class='cnnPad18TRL']",
	"//div[@id='cnnHeader']",
	"//div[@id='cnnSCFontButtons']",
	"//div[@class='cnnTopNewsModule']",
	"//p[@class='cnnTopics']",
	"//p[@class='cnnAttribution']",
	"//div[@class='cnnStoryElementBox']",
	"//span[@class='cnnEmbeddedMosLnk']",
	"//div[@class='cnnStoryToolsFooter']",
	"//div[@class='cnnMosaicContentCol']/div[@class='cnnUGCBox']",
	"//div[@id='moneyEconNav']",
	"//div[contains(a/text(),'Previous articles')]/following::*",
	"//div[@class='cnnBlogPolicy']/following::*",
	"//div[@class='cnnBlogPolicy']",
	"//div[@id='brow']/preceding::*",
	"//div[@id='brow']",
	"//div[@id='continue']/following::*",
	"//div[@id='continue']",
	"//div[@class='cnnAC360_BlogButtons']",
	"//div[@class='cnnWireBoxFooter']",
	"//div[@class='cnnBoxFooter']",
	"//div[@class='cnnEmbeddShare']",
];

/* Clean up AC360 blog (remove topnav, simplify heading), move image to bottom of page */
var main_div = $x("//div[@id='cnnAC360_blogBodyLeft']")[0];
if (main_div) {
	var day   = /.*<div[^>]* class=.cnnBoxContent.*?>([^<]*)<\/div>/gi.exec(main_div.innerHTML)[1];
	var title = /<a[^>]* class=.cnnAC360_headerL.*?>([^<]*)<\/a>(?:<br>)*/gi.exec(main_div.innerHTML)[1];
	var time  = /<div[^>]* class=.cnnAC360_BlogAuthor.*?>Posted: ([^<]*)<\/div>/gi.exec(main_div.innerHTML)[1];
	var picture = $x("//div[@class='cnnStoryPhotoBox']")[0].innerHTML;
	main_div = $x("//div[@class='snap_preview']")[0];
	main_div.innerHTML = '<DIV align=left><B>' + title + '</B><BR><I>' + day + ' &nbsp;&nbsp;' + time + '</I>' + main_div.innerHTML + picture + '</DIV>';
	$x("//div[@class='cnnStoryPhotoBox']").forEach(function(ad1) { ad1.parentNode.removeChild(ad1); });

	var item_to_replace1 = $x("//div[@id='cnnAC360_contentHolder']")[0];
	var replace_with1    = $x("//div[@class='snap_preview']")[0];
	if (item_to_replace1 && replace_with1) {
		item_to_replace1.parentNode.replaceChild(replace_with1, item_to_replace1);
	}
}

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

stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);

/* Remove <span> tags (preserve text) for links inside of div cnnHeaderLnk */
$x("//div[@class='cnnHeaderLnk']/a").forEach(function(ad1) {
	ad1.innerHTML = ad1.innerHTML.replace(/<span[^>]*>([^<]*)<\/span>.*/gi, '$1');
});

/* Remove <a> tags, but preserve and bold the text for all links in div cnnHeaderLnk */
$x("//div[@class='cnnHeaderLnk']").forEach(function(ad1) {
	ad1.innerHTML = ad1.innerHTML.replace(/<a[^>]*>([^<]*)<\/a>/gi, '<b>$1</b>');
});
