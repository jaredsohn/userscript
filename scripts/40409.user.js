// ==UserScript==
// @name           Last.fm artist-wiki multilingualizer
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description     Makes it easy to view an artist wiki in another language
// @include        http://www.last.fm/music/*
// @include        http://www.lastfm.*/music/*
// @include        http://cn.last.fm/music/*
// ==/UserScript==
// 2009-03-13 update: Restructured script & added loading-indicating thingie and automatic loading into cache
// 2010-04-08 update: Restructured again and removed old auto-cache-loading and added autoloading when wiki is empty.

var languages = new Array();
languages.push(uk = {prefix:"www.last.fm", code:"uk"});
languages.push(de = {prefix:"www.lastfm.de", code:"de"});
languages.push(es = {prefix:"www.lastfm.es", code:"es"});
languages.push(fr = {prefix:"www.lastfm.fr", code:"fr"});
languages.push(it = {prefix:"www.lastfm.it", code:"it"});
languages.push(jp = {prefix:"www.lastfm.jp", code:"jp"});
languages.push(pl = {prefix:"www.lastfm.pl", code:"pl"});
languages.push(pt = {prefix:"www.lastfm.com.br", code:"pt"});
languages.push(ru = {prefix:"www.lastfm.ru", code:"ru"});
languages.push(se = {prefix:"www.lastfm.se", code:"se"});
languages.push(tr = {prefix:"www.lastfm.com.tr", code:"tr"});
languages.push(zh = {prefix:"cn.last.fm", code:"zh"});
var autoloadOrder = [de, es, fr, it, jp, pl, pt, ru, se, tr, zh, uk]; // This may contain 0–12 languages.

function main() {
	if(!artistPage())  return;
	var url = x("//div[@id='secondaryNavigation']/ul/li[1]/a").href.split("/music/");
	artist  = url[1];
	nativePrefix = url[0].split("http://")[1];
	addButtons(artist);
	autoloadOrder.reverse();
	if(x("//div[@id='wikiAbstract']/div/span[@class='messageWrapper']")) autoload(artist);
}

function autoload(artist) {
	if(language = autoloadOrder.pop()) loadWiki(language, artist, true);
}

function artistPage() {
	var rest = location.href.split("/")[5]; // That's undefined on the artist page.
	return rest?false:true;
}

function addButtons(artist) {
	var buttonHolder = document.createElement("div");
	var wiki = x("//div[@id='catalogueHead']/div[2]");
	wiki.parentNode.insertBefore(buttonHolder, wiki);
	for(i = 0; language = languages[i]; ++i) {
		var button = document.createElement("img");
		button.flagsrc = button.src = "http://cdn.last.fm/depth/flags/mini/"+language.code+".gif";
		language.button = button;
		button.addEventListener("click", buttonFunction(language, artist), false)
		buttonHolder.appendChild(button);
		buttonHolder.appendChild(document.createTextNode(" "));
	}
}

function buttonFunction(language, artist) {
	return function() {
		if(language.cache) x("//div[@id='wikiAbstract']").innerHTML = language.cache;
		else loadWiki(language, artist, false);
	};
}

function loadWiki(language, artist, autoloading) {
		language.button.src = loadimg;
		do_http_request("http://" + language.prefix + "/music/" + artist + "/+wiki", callbackFunction(language, artist, autoloading));
}

function callbackFunction(language, artist, autoloading) {
	return function(doc) {
		var foreignWiki = x("//div[@id='wiki']", doc);
		language.cache = foreignWiki ? foreignWiki.innerHTML.replace(new RegExp(language.prefix, "g"), nativePrefix) : false;
		if(language.cache) x("//div[@id='wikiAbstract']").innerHTML = language.cache;
		else {
			if(autoloading) autoload(artist);
			language.button.style.display = "none";
		}
		language.button.src = language.button.flagsrc;
	};
}

function x(query, doc) {
	return xpath(query, doc).snapshotItem(0);
}

// From Dive Into Greasemonkey:
function xpath(query, doc) {
    return document.evaluate(query, (doc ? doc : document), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// From OiNKPlus: 
function do_http_request(url, callbackFunc){
	GM_xmlhttpRequest({
		method: "GET",
  url: url,
  onload: function(res) {
	  var result;
	  var range = document.createRange();
	  range.selectNode(document.body);
	  var parsedHTML = range.createContextualFragment(res.responseText);
	  result = document.createElement("div");
	  result.appendChild(parsedHTML);
	  callbackFunc(result);							
  }
	});
}
var loadimg = "data:image/gif;base64,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%3D%3D";
main();