// ==UserScript==
// @name           iXBT Forum News Mover
// @namespace      http://teleum.ru
// @description    Moves news block from right colums to the top of the page
// @include        http://forum.ixbt.com/*
// ==/UserScript==

var insaneCol = document.evaluate("/html/body/center/table[3]/tbody/tr/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
insaneCol.style.display = 'none';
var insaneCol = document.evaluate("/html/body/center/table[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
insaneCol.style.display = 'none';

var news_inner_html = "";
var news = document.evaluate("/html/body/center/table[3]/tbody/tr/td[2]/table/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = news.snapshotLength - 1; i >= 0; i--) {
	var row = news.snapshotItem(i);
	var col = row.getElementsByTagName('td');
	news_inner_html += col[0].innerHTML + ' ' + col[1].innerHTML + "<br />";
}

document.styleSheets[0].insertRule('#top_news a:hover  {text-decoration: underline}', 0);
document.styleSheets[0].insertRule('#top_news a {color: #303030; text-decoration: none}', 0);
var top_news = document.evaluate("/html/body/center/table[2]/tbody/tr/td[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
top_news.className = "s";
top_news.setAttribute('id', 'top_news')
top_news.innerHTML = news_inner_html;

var top_links = document.evaluate("/html/body/center/table[2]/tbody/tr/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
top_links.style.width = "55%";
