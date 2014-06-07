// ==UserScript==
// @name           Replace Google Image Search Link With Bing
// @namespace      Binga
// @description    Replace Google Image Search Link With Bing
// @include        http://www.google.com/*
// @include        http://www.google.dk/*
// @include        http://www.google.se/*
// @include        http://www.google.co.nz/*
// @include        http://www.google.ca/*
// @include        http://www.google.cn/*
// @include        http://www.google.com.pr/*
// @include        http://www.google.com.ca/*
// @include        http://www.google.com.ch/*
// @include        http://www.google.fi/*
// @include        http://www.google.co.in/*
// @include        http://www.google.co.uk/*
// @include        http://www.google.lv/*
// @include        http://www.google.co.hu/*
// @include        http://www.google.lk/*
// @include        http://www.google.com.au/*
// @include        http://www.google.ru/*
// @include        http://www.google.nl/*
// @include        http://www.google.be/*
// @include        http://www.google.de/*
// @include        http://www.google.ro/*
// @include        http://www.google.kz/*
// @include        http://www.google.by/*
// @include        http://www.goog1e.com/*
// @include        http://www.google.pl/*
// @include        http://www.google.com.pl/*
// @include        http://www.google.es/*
// @include        http://www.google.pt/*
// @include        http://www.google.com.br/*
// @include        http://www.google.vc/*
// @include        http://www.google.co.za/*
// @include        http://www.google.tm/*
// @include        http://www.google.com.my/*
// @include        http://www.google.bg/*
// @include        http://www.google.co.jp/*
// @include        http://www.google.ie/*
// @include        http://www.google.co.ck/*
// @include        http://www.google.com.mx/*
// @include        http://www.google.com.om/*
// @include        http://www.google.fr/*
// @include        http://www.google.mu/*
// @include        http://www.google.com.ph/*
// @include        http://www.google.com.jm/*
// ==/UserScript==

function binga(){
	var imgSearchLink=document.evaluate( '//a[starts-with(@href, "http://www.google")][contains(@href, "/imghp") or contains(@href, "/images")]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if(imgSearchLink){
		var bingHref='http://www.bing.com/images/';
		var googImgSHref=imgSearchLink.getAttribute('href');
		if(googImgSHref.indexOf('q=')>-1){
			bingHref+='?q='+googImgSHref.split('q=')[1].split('&')[0];
		}
		imgSearchLink.setAttribute('href',bingHref);
	}
}

window.addEventListener('hashchange',function(e){
	this.setTimeout(function(){
		binga();
	},500);
}, false);
window.addEventListener('load',binga, false);