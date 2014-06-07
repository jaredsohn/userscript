// ==UserScript==
// @name           en.wikipedia.org-minimal
// @description    Removes navigation, citations, reviews, footnotes, edit links, etc. Helpful when you want to archive just the main content with an add-on like ScrapBook, especially if you're merging multiple pages
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

var item_to_replace  = $x("//div[@id='globalWrapper']")[0];
var replace_with     = $x("//div[@id='content']")[0];

$x("//div[@id='content']").forEach(function(ad1) {
	ad1.style.margin = '0px';
});

var stuff_to_remove = [
	"//table[@id='toc' and @class='toc']",
	"//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'See also')]/following::*",
	"//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'See also')]",
	"//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'References')]/following::*",
	"//div[@id='content']/descendant::span[@class='mw-headline' and contains(text(),'References')]",
	"//div[@id='siteNotice']",
	"//div[@id='contentSub']",
	"//div[@id='bodyContent']/table[@class='metadata plainlinks ambox ambox-content']",
	"//div[@id='bodyContent']/table[@class='metadata plainlinks ambox ambox-style']",
	"//h3[@id='siteSub']",
	"//span[@class='editsection']",
	"//div[@class='dablink']",
	"//div[@id='jump-to-nav']",
	"//sup[@class='reference']",
	"//div[@id='bodyContent']/div[1]",
	"//div[@id='content']/descendant::span[contains(text(),'Footnotes')][position()=last()]/following::*",
	"//div[@id='content']/descendant::span[contains(text(),'Footnotes')][position()=last()]",
	"//sup[@class='noprint Template-Fact']",
	"//a[@class='external autonumber']",
	"//div[@id='content']/descendant::span[contains(text(),'Notes')][position()=last()]/following::*",
	"//div[@id='content']/descendant::span[contains(text(),'Notes')][position()=last()]",
	"//sup[@class='noprint Inline-Template']",
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

