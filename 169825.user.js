// ==UserScript==
// @name       KCLS Links on GoodReads
// @version    0.1
// @description  Displays links to KCLS search on GoodReads list view
// @match      http://*.goodreads.com/review/list/*
// @match      https://*.goodreads.com/review/list/*
// @copyright  2012+, Simon Melhart
// ==/UserScript==

var baseUrl = "http://kcls.bibliocommons.com/search?t=smart&search_category=keyword&commit=Search&q=";
var result = document.evaluate("//tbody[@id='booksBody']/tr/td[@class='field title']/div[@class='value']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i=0 ; i < result.snapshotLength; i++ )
{
    var item = result.snapshotItem(i);
    var titleElement = item.children[0];
    var titleText = titleElement.innerText;
    // TODO: remove anything after colon and trailing whitespace
    titleText =  titleText.replace(/\(.+\)/, '').replace(/:.*/, '').replace(/\s*$/, '');
    var p = document.createElement('p');
    var div = document.createElement('div');
    var txtNode = document.createTextNode("on KCLS");
    var link = document.createElement('a');
    link.setAttribute('href', baseUrl+escape(titleText));
    link.appendChild(txtNode);
    div.appendChild(link);
	div.appendChild(document.createTextNode(' ('));
    div.appendChild(link);
	div.appendChild(document.createTextNode(')'));
    item.appendChild(p);
    item.appendChild(div);	
}
