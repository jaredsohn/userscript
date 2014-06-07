// ==UserScript==
// @name			Krevafy
// @namespace		http://tokyo.fffff.at/
// @description		Make all blogs "fashionable"
// @include			http://*blog*
// @include			http://*.wordpress.com/*
// @include			http://*.livejournal.com/*
// @include			http://d.hatena.ne.jp/*
// @include			http://ameblo.jp/*
// @include			http://*.cocolog-nifty.com/*
// @include			http://*.jugem.jp/*
// ==/UserScript==

(function() {

var targets = /blog|diary|journal|ブログ|ぶろぐ|日記|にっき/gi;
var fashion = 'Fashion通信';
var found_flag = false;

var titles = document.getElementsByTagName('title');

for(var i=0; i<titles.length; i++){
	titles[i].textContent = titles[i].textContent.replace(targets, fashion);
	if(titles[i].textContent.match(fashion) != null) found_flag = true;
}

if(!found_flag){
	for(var i=0; i<titles.length; i++){
		titles[i].textContent = titles[i].textContent + ' (' + fashion + ')';
	}
}

allfashionize(document.getElementsByTagName('h1'));
allfashionize(document.getElementsByTagName('h2'));
allfashionize(document.getElementsByTagName('h3'));

function allfashionize(obj){
	for(var i=0; i<obj.length; i++){
		if(obj[i].childNodes.length > 0) allfashionize(obj[i].childNodes);
		else fashionize(obj[i]);
	}
}

function fashionize(obj){
	if(obj.nodeType == 3){
		obj.textContent = obj.textContent.replace(targets, fashion);
	}
}

})();