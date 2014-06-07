// ==UserScript==
// @name           CR Amazon Link
// @namespace      www.google.com
// @include        http://www.consumerreports.org/*
// @description    On the Consumer Reports website, for any product page this will replace the name of a product with a link to an Amazon search for that product
// @author         bbates
// $LastChangedDate: 10/20/2010
// ==/UserScript==


var model = document.evaluate('//div[@class="make-and-model"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if ( model.snapshotLength != 0 ){
	for ( var i = 0; i < model.snapshotLength; i++){
		var a = model.snapshotItem(i).parentNode;
		var searchText = model.snapshotItem(i).innerHTML;
		var myLink = document.createElement( 'a' );
		myLink.setAttribute("class","make-and-model");
		myLink.setAttribute("href","http://www.amazon.com/s/url=search-alias%3Daps&field-keywords=" + searchText);
		myLink.innerHTML = searchText;
		a.replaceChild(myLink, model.snapshotItem(i));

	}
}