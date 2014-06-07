// ==UserScript==
// @name           Google books add review link
// @namespace      http://efcl.info/
// @include        http://books.google.co.jp/books?id=*
// @exclude        http://books.google.co.jp/books?id=*#v=onepage*
// ==/UserScript==

var ISBNs = xpath('//tr[@class="metadata_row"][td[@class="metadata_label"]/text()="ISBN"]/td[@class="metadata_value"]/span[1]');
var ISBN  = ISBNs[0].textContent.split(",")[0]
var div = document.createElement('div');
div.className = 'amazon_review';
//E4X
div.innerHTML = 
  <a href="http://revilist.net/asin/@@ISBN@@.html">Amazonレビュー一覧</a>.toSource()
  .replace(/@@ISBN@@/, ISBN);
var p = document.getElementById('reviews_v2');
p.insertBefore(div, p.firstChild);

function xpath(query) {
	var results = document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = new Array();
	for(var i=0; i<results.snapshotLength; i++){
		nodes.push(results.snapshotItem(i));
	}
	return nodes;
}