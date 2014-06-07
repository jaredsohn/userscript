// ==UserScript==
// @name           time.com cleanup
// @namespace      http://localhost/
// @description    Removes ads and other non-content, greatly simplified
// @include        http://*.blogs.time.com/*
// ==/UserScript==

/******* Other Suggestions
 * In addition to this greasemonkey script I suggest using Adblock
 * Plus, NoScript and AutoPager.
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
 *     - time.com
 *     - addthis.com
 *     - wordpress.com
 *     - revsci.com
 *     - adsonar.com
 *     - timeinc.com
 *     - quantserve.com
 *     - atwola.com
 *     - sphere.com
 *
 ****** AutoPager settings:
 * URL Pattern:     http://*.time.com/*
 * Link XPath:      //a[@class='next']
 * Content XPath:   //div[@class='artTxt']
 *
 ****** Adblock Plus settings:
 * I use EasyList, plus the following filter for this site.  Note that you
 * have to remove the "//    " at the beginning of the line:
 */

//    /http://.*\.((quantserve\.com|wordpress\.com|feedburner\.com)/.*|timeinc\.net/((.*\.css|time/(i|images|blogs|photoessays|quotes|potw|covers|columnist|cartoons|rd)/.*\.(gif|jpg|png))|.*/(50|77|147)_.*\.jpg))/


var item_to_replace  = $x("//div[@id='blogs' and @class='wrap']")[0];
var replace_with     = $x("//div[@class='snap_preview']")[0];
var item_to_replace2 = $x("//div[contains(attribute::class, 'wrap') and (@id='health' or @id='us' or @id='election' or @id='world' or @id='entertainment' or @id='entertainment' or @id='business' or @id='travel')]")[0];
var replace_with2    = $x("//div[contains(attribute::class, 'ltCol')]")[0];

var stuff_to_remove = [
	"//div[@id='footer']",
	"//div[@id='articleFooter']",
	"//div[@class='rtCol']",
	"//div[@id='header']",
	"//div[@class='articleTools']",
	"//p[@class='eyebrow']",
	"//div[@class='thumb']",
	"//p[@class='byline']",
	"//div[@class='byline']",
	"//div[@class='credit']",
	"//h2",
	"//div[@class='rLinks']",
	"//div[@class='date']",
	"//div[@id='col3']",
	"//div[@class='artTools']",
	"//div[@class='enlarge']",
	"//div[@id='connectStory']",
	"//div[@id='articleSideBar']",
	"//div[@class='artTxt']/p[string-length(normalize-space(node()))=0]/br",
	"//div[@class='nav']",
	"//div[@class='sectheader']",
	"//div[@class='breadcrumb']",
];

/* Move picture to bottom */
/*var picture = $x("//div[@class='photoBkt']")[0];
$x("//div[@class='photoBkt']").forEach(function(ad1) { ad1.parentNode.removeChild(ad1); });
var main_div = $x("//div[@class='ltCol']")[0];
main_div.appendChild(picture);*/

var inline_story_links_regex =
/(?:\(?<a href=[^>]*>(?:Read TIME|Read "|See (?:a |the |pictures|[1-9][05])|See .*? of the week)[^<]*<\/a>\.?\)?\.?|\(<a href=[^>]*>See [^<]*<\/a>\)\s*$)/gi;

$x("//span|//div[@class='artTxt']/p[a]").forEach(function(item) {
	item.innerHTML =  item.innerHTML.replace(inline_story_links_regex, '');
	if (item.innerHTML.match(/\(\d+ of \d+\)/)) {
		item.parentNode.removeChild(item);
	}
});

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
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

/* Rebuild simpler main page for www.time.com */
var main_div = $x("//div[@id='home']")[0];
if (main_div) {
	main_div.style.backgroundImage = 'none';
	var featured_news    = $x("//div[@class='featNews']")[0].innerHTML;
	var latest_headlines = $x("//div[@class='lathd']")[0].innerHTML;
	var most_popular1    = $x("//div[@class='mpop']/ul/li[1]")[0].innerHTML;
	var most_popular2    = $x("//div[@class='mpop']/ul/li[2]")[0].innerHTML;
	var must_reads       = $x("//div[@class='reads']")[0].innerHTML;
	var more_inside      = $x("//div[@id='moreInside']")[0].innerHTML;

	var temparray = /^.*?(<li>.*)\n(^.*<\/?li>.*\n)*/gm.exec(latest_headlines);
	latest_headlines = temparray.shift();

	main_div.innerHTML = '<STYLE>a, a:link, a:visited {text-decoration:none; color:#000; cursor:pointer;}</STYLE>' 
				+ '<DIV id=z style="font-size:9.23333px; font-family:arial,sans-serif;">' 
					+ '<DIV id=a style="float:left; width:350px;">'
						                               + featured_news    + '</DIV>'
					+ '<DIV id=d><B>Must Read</B>'         + must_reads       + '</DIV><BR>'
					+ '<DIV id=b>'
						+   '<B>Latest Headlines</B>'  + latest_headlines + '</DIV><BR>'
					+ '<DIV id=c style="float:left; width:350px; clear:left;">'
						+ '&nbsp;'                     + most_popular1    + '</DIV>'
					+ '<DIV id=e style="float:left;"><BR>' + most_popular2    + '</DIV><BR>'
					+ '<DIV id=f style="clear:left;">'
						+ '<B>More inside</B>'         + more_inside      + '</DIV><BR>'
				+ '</DIV>';

	/**** Featured News fixups ****/
	/* Insert heading before first item and change bold H3 to, wrap with a UL to indent under the heading, add space after heading */
	$x("//div[@class='tout first']").forEach(function(item) {
		item.innerHTML = item.innerHTML.replace(/<h3>(.*?\s?<\/a>)<\/h3>/gmi, '<B>Featured News</B><BR><BR><UL><LI>$1');
	});

	/* Make bold H3 links just regular links, and wrap them with another UL to indent them more */
	$x("//div[@class='tout']").forEach(function(item) {
		item.innerHTML = item.innerHTML.replace(/<h3>(.*?\s?<\/a>)<\/h3>/gmi, '<UL><LI>$1');
	});

	/* Make bullets next to each other, no extra padding */
	$x("//div[@class='tout' or @class='tout first']/ul").forEach(function(item) {
		item.style.marginTop = "0";
		item.style.marginBottom = "0";
	});

	/**** More Inside fixups ****/
	/* Make two columns side-by-side, col1=US through World, col2=Business through Entertainment */
	$x("//div[@id='col1']").forEach(function(item) {
		item.style.width = '350px';
		item.style.cssFloat = 'left';
	});
	/* Ensure last column (col4=Best & Worst lists through Travel) starts on a new line after col1/col2 (col3 is deleted) */
	$x("//div[@id='col4']").forEach(function(item) {
		item.style.clear = 'left';
	});
	/* Make lists immediately follow the section title without extra spacing */
	$x("//div[@id='col1' or @id='col2' or @id='col4']/div/ul/h3").forEach(function(item) {
		item.style.marginTop = "0";
		item.style.marginBottom = "0";
	});
}

/* Simplify heading on blogs.time.com */
var main_div = $x("//div[@class='entryBody']")[0];
if (main_div) {
	var title = /<h1 class=.entryTitle.*?><a[^>]*>([^<]*)<\/a><\/h1>/gi.exec(main_div.innerHTML)[1];
	main_div = $x("//div[@class='snap_preview']")[0];
	main_div.innerHTML = '<DIV align=left><B>' + title + '</B><BR>' + main_div.innerHTML + '</DIV>';
}

if (item_to_replace && replace_with) {
	item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
}

if (item_to_replace2 && replace_with2) {
	item_to_replace2.parentNode.replaceChild(replace_with2, item_to_replace2);
}
