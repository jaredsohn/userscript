// ==UserScript==
// @name           Wikipedia Language Changer
// @namespace      http://endflow.net/
// @description    Language change utility for Wikipedia.
// @include        http://*.wikipedia.org/w*/*
// @version        0.1.1
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2007.10.28] 0.1.0 first version
//                 [2009-05-05] 0.1.1 bugfixed (thx Wayne!)

(function(){
// configurations
var cfg = {
	// lang tab
	tab: {
		// true or false
		enable: true,
		// lang code you want to show as tab
		// *** if ommit this, it won't show any langs ***
		lang: ['ja', 'en', 'de'],
		// 'code', 'name' or 'both'
		label: 'name'
	},
	// lang drop-down list
	list: {
		enable: true,
		// lang code you want to show as drop-down list
		// *** if ommit this, it will show all langs ***
		lang: [],
		label: 'both'
	},
	// quick toggle
	toggle: {
		enable: true,
		// if ommit this, it will set first element of cfg.toggle.lang
		default: 'ja',
		// pair of toggle language
		lang: ['ja', 'en']
	}
};

// Array.each
Array.prototype.each = function(callback, _this){
	for(var i = 0, len = this.length; i < len; i++){
		if(callback.call(_this, this[i], i) === false){break}
	}
};
// Object.each
Object.prototype.each = function(callback, _this){
	for(var k in this){
		callback.call(_this, this[k], k);
	}
}
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $(id){return document.getElementById(id)}
function $c(tagName){return document.createElement(tagName)}

// label maker
function makeLabel(kind, lang){
	switch(kind){
		case 'both': return lang.name + ' [' + lang.code + ']';
		case 'name': return lang.name;
	}
	// case 'code'
	return lang.code;
}
// add new tab
function addTab(parent, lang){
	var tab = $c('li');
	tab.id = 'ca-lang-' + lang.code;
	var label = makeLabel(cfg.tab.label, lang);
	tab.innerHTML = '<a title="' + label + '" href="' + lang.url + '">' + label + '</a>';
	parent.appendChild(tab);
}
// add new list item
function addListItem(parent, lang){
	var item = $c('option');
	item.value = lang.url;
	item.innerHTML = makeLabel(cfg.list.label, lang);
	parent.appendChild(item);
}
function toggleLang(langs){
	var lang = location.href.substr(7).split('.')[0];
	var tglLang = cfg.toggle.lang[lang];
	if(!tglLang){tglLang = cfg.toggle.default}
	location.href = langs[tglLang].url;
}
// validation page
function validPage(){
	if(!$('ca-history')){return false}
	if(!$('p-lang')){return false}
	return true;
}
// transform config object
function transformConfig(){
	if(!cfg){cfg = {};}
	if(!cfg.tab){cfg.tab = {enable: false}}
	if(!cfg.list){cfg.list = {enable: false}}
	if(!cfg.toggle){cfg.toggle = {enable: false}}
	if(!cfg.toggle.default){
		cfg.toggle.default = cfg.toggle.lang ? cfg.toggle.lang[0] : 'en';
	}
	if(cfg.toggle.lang){
		var lang = [cfg.toggle.lang[0], cfg.toggle.lang[1]];
		cfg.toggle.lang = {};
		cfg.toggle.lang[lang[0]] = lang[1];
		cfg.toggle.lang[lang[1]] = lang[0];
	}
}
// scraping language links
function scrapingLangLink(){
	var langs = {};
	$x('//div[@id="p-lang"]/div[@class="pBody"]/ul/li').each(function(li){
        var tokens = li.className.split(' ');
		var code = tokens.filter(function(s){return s.indexOf('interwiki-')==0})[0].replace('interwiki-', '');
		langs[code] = {
			code: code,
			name: li.firstChild.innerHTML,
			url: li.firstChild.href
		};
	}, this);
	return langs;
}
// transform UI
function transformUI(langs){
	if(!langs){return}

	// change style of tab text
	GM_addStyle('#p-cactions li a{text-transform:none}');
	// add space
	GM_addStyle('li#ca-history{margin-right:1.6em}');

	// add double-click event
	if(cfg.toggle.enable){
		document.addEventListener('dblclick', function(){toggleLang(langs)}, false);
	}

	// add language tabs
	if(cfg.tab.enable){
		var tabs = $x('//div[@id="p-cactions"]/div[@class="pBody"]/ul')[0];
		cfg.tab.lang.each(function(code){
			var lang = langs[code];
			if(!lang){return}
			addTab(tabs, lang);
		}, this);
	}
	
	// add changer tab
	if(cfg.list.enable){
		var changerTab = $c('li');
		changerTab.id = 'ca-lang-changer';
		var changer = $c('select');
		changer.id = changer.name = 'changer';
		changer.addEventListener('change', function(){
			location.href = changer.options[changer.selectedIndex].value;
		}, false);
		if(cfg.list.lang && cfg.list.lang.length != 0){
			cfg.list.lang.each(function(code){
				addListItem(changer, langs[code]);
			}, this);
		}else{
			langs.each(function(lang){
				addListItem(changer, lang);
			}, this);
		}
		changerTab.appendChild(changer);
		tabs.appendChild(changerTab);
	}
}

if(!validPage()){return}
transformConfig();
transformUI(scrapingLangLink());

})();

