// ==UserScript==
// @name         drupal.org themes browse history
// @namespace     http://stayple.net/
// @description	  in English: append history of browsing theme page of drupal.org., in Japanese: drupal.orgテーマページの閲覧履歴を表示します。
// @include       http://drupal.org/project/*
// ==/UserScript==

(function() {

var debug  = false;
const MAX_RECORDS = 30;
const CACHE_LIFETIME_SECONDS = 86400;

themehist_init();

function themehist_init() {
	
	if (document.evaluate("//div[@class='terms']/a[@href='/project/Themes']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) {
		
		if (debug) console.log("This url is a theme page.");
		
		var theme_name = document.title.match(/^([^\|]*) \|/)[1];
		var theme_nickname = document.location.href.match(/http:\/\/drupal.org\/project\/([a-zA-Z0-9_]*)/)[1];
		
		themehist_load(theme_name, theme_nickname);
		
	} else {
		if (debug) console.log("This url is not theme page.");
	}
}

function themehist_load(theme_name, theme_nickname) {
	var time_now = (new Date()).getTime();
	var old_records = eval(GM_getValue('theme_browsehistory_records')) || [];
	var records = [];
	var new_item = null;
	for (var i = 0; i < old_records.length; i++) {
		if (old_records[i][1] != theme_nickname) {
			records.push(old_records[i]);
		} else if (old_records[i][3] + CACHE_LIFETIME_SECONDS > time_now) {
			new_item = old_records[i];
		}
	}
	if (new_item != null && !debug) {
		records.unshift(new_item);
	} else {
		if (debug) console.log("create/update a history item.");
		var img = document.evaluate("//div[@class='content']//img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var theme_image = (img != null) ? img.src : null;
		records.unshift([theme_name, theme_nickname, theme_image, time_now]);
	}
	while (records.length > MAX_RECORDS) {
		records.pop();
	}
	if (debug) console.log(records);
	GM_setValue('theme_browsehistory_records', records.toSource());
	
	themehist_append(records);
}


function themehist_append(records) {
	
	var content = document.evaluate("//div[@class='content']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var item_list = content.appendChild(document.createElement('div'));
	item_list.setAttribute('class', 'item-list');
	var h3title = item_list.appendChild(document.createElement('h3'));
	h3title.innerHTML = "Your theme browsing history";
	var ul = item_list.appendChild(document.createElement('ul'));
	
	for (var item = 1, len = records.length; item < len; item++) {
		var list = ul.appendChild(document.createElement('li'));
		var link = list.appendChild(document.createElement('a'));
		link.setAttribute('href', './' + records[item][1]);
		link.innerHTML = records[item][0];
		if (records[item][2] != null) {
			link.appendChild(document.createElement('br'));
			var img = link.appendChild(document.createElement('img'));
			img.setAttribute('src', records[item][2]);
		}
	}
	if (debug) console.log("theme browse history created.");
	
}

})();