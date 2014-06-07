// ==UserScript==
// @name         append link drupal.org to drupal-module.info
// @namespace     http://stayple.net/
// @description	  drupal.orgモジュールページのResourcesにDrupalモジュール共有サイトへのリンクを追加します。
// @include       http://drupal.org/project/*
// ==/UserScript==

(function() {

var debug  = false;

moduleinfo_init();

function moduleinfo_init() {
	//	document.evaluate("//div[@class='breadcrumb']/a[last()]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.match(/Modules/)
	
	if (document.evaluate("//div[@class='terms']/a[@href='/project/Modules']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null) {
		
		if (debug) console.log("This url is a module page.");
		var module_name = document.location.href.match(/http:\/\/drupal.org\/project\/([a-zA-Z0-9_]*)/)[1];
		moduleinfo_load(module_name);
		
	} else {
		if (debug) console.log("This url is not module page.");
	}
}

function moduleinfo_load(module_name) {
	var module_table = eval(GM_getValue('module_table', {}));
	for (var name in module_table) {
		if (name == module_name) {
			if (debug) console.log(module_name + " checked previously, is recorded in module_table.");
			moduleinfo_check(module_name, module_table[module_name]);
			return;
		}
	}
	if (debug) console.log("Send HTTP request to drupal-module.info.");
	GM_xmlhttpRequest({
		method: "HEAD", 
		url: "http://www.drupal-module.info/mod/"+module_name, 
		headers: { 'User-Agent': 'GM-drupalorg2drupalmodinfo-agent' },
		onload: function(details) {
			if (debug) console.log("HTTP respons status: "+details.status);
			module_table[module_name] = (details.status == 200);
			GM_setValue('module_table', module_table.toSource());
			moduleinfo_check(module_name, module_table[module_name]);
		}
	});
}

function moduleinfo_check(module_name, module_exists) {
	if (module_exists) {
		if (debug) console.log(module_name + " information found.");
		moduleinfo_append(module_name);
	} else {
		if (debug) console.log(module_name + " information doesn't exists.");
	}
}

function moduleinfo_append(module_name) {
	
	var list = document.createElement('li');
	var link = list.appendChild(document.createElement('a'));
	link.setAttribute('href', 'http://www.drupal-module.info/mod/'+module_name);
	link.innerHTML = 'Drupal\u30E2\u30B8\u30E5\u30FC\u30EB\u60C5\u5831\u5171\u6709\u30B5\u30A4\u30C8';
	var ul = document.evaluate("//div[@class='item-list'][2]/ul", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	ul.appendChild(list);
	if (debug) console.log("link created.");
}

// utility function (for javascript console)
function moduleinfo_clear_cache() {
	GM_setValue('module_table', {}.toSource());
	console.log("module_table has been initialized.");
}

})();