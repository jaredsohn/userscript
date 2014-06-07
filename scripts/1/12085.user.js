// ==UserScript==
// @name         append link drupal.org to search result of the module
// @namespace     http://stayple.net/
// @description	  in English: append a link to search a module in Google to module page of drupal.org., in Japanese: drupal.orgモジュールページのResourcesにモジュール名をGoogle検索するURLを追加します。
// @include       http://drupal.org/project/*
// ==/UserScript==

(function() {

var debug  = false;

modulesearch_init();

function modulesearch_init() {
	
	if (document.evaluate("//div[@class='terms']/a[@href='/project/Modules']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) {
		
		if (debug) console.log("This url is a module page.");
		var module_name = document.title.match(/^([^\|]*) \|/)[1];
		modulesearch_append(module_name);
		
	} else {
		if (debug) console.log("This url is not module page.");
	}
}


function modulesearch_append(module_name) {
	
	var list = document.createElement('li');
	var link = list.appendChild(document.createElement('a'));
	link.setAttribute('href', 'http://www.google.com/search?q=Drupal+"' + encodeURI(module_name) + '"');
	link.innerHTML = 'Search this module in Google';
	var ul = document.evaluate("//div[@class='item-list'][2]/ul", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	ul.appendChild(list);
	if (debug) console.log("link created.");
}

})();