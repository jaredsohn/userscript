// ==UserScript==
// @name         drupal.org modules browse history
// @namespace     http://stayple.net/
// @description	  in English: append history of browsing module page of drupal.org., in Japanese: drupal.orgモジュールページの閲覧履歴を表示します。
// @include       http://drupal.org/project/*
// ==/UserScript==

(function() {

var debug  = false;
const MAX_RECORDS = 30;

modulehist_init();

function modulehist_init() {
	
	if (document.evaluate("//div[@class='terms']/a[@href='/project/Modules']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) {
		
		if (debug) console.log("This url is a module page.");
		
		var module_name = document.title.match(/^([^\|]*) \|/)[1];
		var module_nickname = document.location.href.match(/http:\/\/drupal.org\/project\/([a-zA-Z0-9_]*)/)[1];
		
		modulehist_append(module_name, module_nickname);
		
	} else {
		if (debug) console.log("This url is not module page.");
	}
}


function modulehist_append(module_name, module_nickname) {
	
	var old_records = eval(GM_getValue('module_browsehistory_records')) || [];
	var records = [];
	
	for (var i = 0; i < old_records.length; i++) {
		if (old_records[i][1] != module_nickname) {
			records.push(old_records[i]);
		}
	}
	records.unshift([module_name, module_nickname]);
	while (records.length > MAX_RECORDS) {
		records.pop();
	}
	if (debug) console.log(records);
	GM_setValue('module_browsehistory_records', records.toSource());
	
	var content = document.evaluate("//div[@class='content']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var item_list = content.appendChild(document.createElement('div'));
	item_list.setAttribute('class', 'item-list');
	var h3title = item_list.appendChild(document.createElement('h3'));
	h3title.innerHTML = "Your module browsing history";
	var ul = item_list.appendChild(document.createElement('ul'));
	
	for (var item = 1, len = records.length; item < len; item++) {
		var list = ul.appendChild(document.createElement('li'));
		var link = list.appendChild(document.createElement('a'));
		link.setAttribute('href', './' + records[item][1]);
		link.innerHTML = records[item][0];
	}
	if (debug) console.log("module browse history created.");
	
}

})();