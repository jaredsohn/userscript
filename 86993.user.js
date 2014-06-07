// ==UserScript==
// @name           binsearchLink
// @namespace      com.redmoon.ch
// @description    Exlibris Binsearch Link
// @include        http://www.exlibris.ch/filme*
// ==/UserScript==


var priceXP = "./div[@class='article_price']";
var titleXP = "./div[@class='article']/h2/a";
var xp = "//div[@class='article_box' or @class='article_box secondbox']";
var nodesSnapshot = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);   

for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {  
	var curE = nodesSnapshot.snapshotItem(i);
	var titleSnapshot = document.evaluate(titleXP, curE, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);   
	var priceIterator = document.evaluate(priceXP, curE, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);   
	var title = titleSnapshot.snapshotItem(0).getAttribute('title');
	if(title.indexOf('(') > 0) {
		title = title.substring(0, title.indexOf('('));
	}
	var url = 'http://binsearch.info/index.php?q=' + escape(title) +'&m=&max=25&adv_g=&adv_age=999&adv_sort=date&minsize=500&maxsize=&font=&postdate=';
	var html = '<br/><br/><br/><a class=\"addBasket\" href=\"'+ url + '\">Binsearch</a>';
	var price = priceIterator.iterateNext();
	if(price) {
		price.innerHTML = html;
	}
}  