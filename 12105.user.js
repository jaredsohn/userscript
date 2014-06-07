// ==UserScript==
// @name         drupal.org Google search other modules which refer to the module
// @namespace     http://stayple.net/
// @description	  in English: append a link to search othe modules which refer to the module., in Japanese: drupal.orgモジュールページに関連する他のモジュールをGoogle検索するリンクを追加します。
// @include       http://drupal.org/project/*
// ==/UserScript==

(function() {

var debug  = false;

modreferencesearch_init();

function modreferencesearch_init() {
	
	if (document.evaluate("//div[@class='terms']/a[@href='/project/Modules']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) {
		
		if (debug) console.log("This url is a module page.");
		var module_name = document.title.match(/^([^\|]*) \|/)[1];
		var module_nickname = document.location.href.match(/http:\/\/drupal.org\/project\/([a-zA-Z0-9_]*)/)[1];
		modreferencesearch_append(module_name, module_nickname);
		
	} else {
		if (debug) console.log("This url is not module page.");
	}
}


function modreferencesearch_append(module_name, module_nickname) {
	
	var list = document.createElement('li');
	var link = list.appendChild(document.createElement('a'));
	// example site:drupal.org inurl:project ((intext:"Update Status") OR link:http://drupal.org/project/update_status) (-inurl:cvs -inurl:issues -inurl:developers -inurl:Modules)
	
	link.setAttribute('href', 'http://www.google.com/search?&q=' + encodeURI('site:drupal.org inurl:project (intext:"') + encodeURI(module_name) + encodeURI('" OR link:http://drupal.org/project/') + module_nickname + encodeURI(') (-inurl:cvs -inurl:issues -inurl:developers -inurl:Modules)'));
	
	link.innerHTML = 'Search refer to "' + module_name + '" in Google';
	var ul = document.evaluate("//div[@class='item-list'][2]/ul", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	ul.appendChild(list);
	if (debug) console.log("link created.");
}

})();