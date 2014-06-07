// ==UserScript==
// @name           hup.hu - bbcode tags fix
// @namespace      http://diveintomark.org/projects/greasemonkey/ 
// @include        http://hup.hu/*
// ==/UserScript==


function xp(query) {
	return document.evaluate(query, document, null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//var title = document.querySelectorAll("td#content-both>div>table>tbody>tr>td")[0];
var title = xp("//td[@id='content-both']/div/table/tbody/tr/td").snapshotItem(0);
var year = title.innerHTML.substr(title.innerHTML.indexOf('|')+2,4);

if (year > 2006) {
	return;
}

var allElements, thisElement, newContent;

allElements = xp('//div[@class="comment"]/div[@class="content"]');

for (var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);
	newContent = thisElement.innerHTML;

	newContent = newContent.replace(/\[quote:[a-z0-9]+\]/g, "<div class=\"bb-quote\"><b>Idézet:</b><br/><blockquote class=\"bb-quote-body\">");
	newContent = newContent.replace(/\[quote:[a-z0-9]+="([^\"]+)"\](<br(\s?\/)?>)?/g,
	    "<div class=\"bb-quote\"><b>$1 írta:</b><br/><blockquote class=\"bb-quote-body\">");
	newContent = newContent.replace(/(<br(\s?\/)?>\n?)?\[\/quote:[a-z0-9]+\]/g, "</blockquote></div>");

	newContent = newContent.replace(/\[code:\d:[0-9a-f]+\](<br(\s?\/)?>)?\n?/g, "<pre class=\"bb-code-block\">");
	newContent = newContent.replace(/\[\/code:\d:[0-9a-f]+\]/g, "</pre>");
	newContent = newContent.replace(/\[b:[0-9a-f]+\]/g, "<b>").replace(/\[\/b:[0-9a-f]+\]/g, "</b>");
	newContent = newContent.replace(/\[i:[0-9a-f]+\]/g, "<i>").replace(/\[\/i:[0-9a-f]+\]/g, "</i>");
	newContent = newContent.replace(/\[u:[0-9a-f]+\]/g, "<u>").replace(/\[\/u:[0-9a-f]+\]/g, "</u>");
	thisElement.innerHTML = newContent;

}
pre = document.getElementsByTagName('pre');
for (i = 0; i < pre.length; i++) {
	pre[i].innerHTML = pre[i].innerHTML.replace(/<br(\s?\/)?>/g,'');
}
