// ==UserScript==
// @name           Przeglądarka Google Grafika
// @namespace      
// @author         look997 + Dwoo
// @description    Kliknięcie miniaturki przenosi bezpośrednio do obrazka, a adres domeny - do ramki ze stroną zawierającą.
// @version        0.9
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/74545.meta.js
// @include        http://images.google.*/*
// @include        http://www.google.*/images?*
// @include        http://*.google.*/imgres?imgurl=*
// ==/UserScript==


for (nr=0; nr<=19; nr++) {
var dolinka = document.getElementById("tDataImage"+nr).getElementsByTagName("a")[0];
var adresramki = dolinka.href;
var dolinka2 = document.getElementById("tDataText"+nr).getElementsByTagName("div")[0].getElementsByTagName("div")[1];
var dolinkazaw2 = document.getElementById("tDataText"+nr).getElementsByTagName("div")[0].getElementsByTagName("div")[1].innerHTML;
var gotow = '<a class="yt-uix-button-menu-item" href="'+adresramki+'">'+dolinkazaw2+'</a>';
dolinka2.innerHTML=gotow;

}


(function () {

function evalNodes(path) {
	return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var cont = evalNodes('//div[starts-with(@id, "ImgCont")]').snapshotItem(0);

function addLinks() {
	var imgs = evalNodes('//a[starts-with(@href, "/imgres")]');
	var links = evalNodes('//td[starts-with(@id, "tDataText")]//div[@class="a"] | //td/font/font[@color="green"]');
	var image, link, urls, a;
	for (var i = 0; image = imgs.snapshotItem(i), link = links.snapshotItem(i);  i++) {
		urls = image.href.match(/imgurl=(.*)&imgrefurl=(.*)&usg/);
		image.href = decodeURIComponent(urls[1]);
		a = document.createElement('a');
		a.innerHTML = link.innerHTML;
		a.setAttribute('class', "a");
		a.setAttribute('style', "border-style: none");
		a.setAttribute('href', decodeURIComponent(urls[2]));
		link.parentNode.replaceChild(a, link);
	}
	cont.addEventListener('DOMNodeInserted', trigger, false);
}

function trigger() {
	cont.removeEventListener('DOMNodeInserted', trigger, false);
	setTimeout(addLinks, 100);
}

if (cont) {
	addLinks();
} else {
	var style = '#thumbnail:visited{color:red !important}';
	if (typeof GM_addStyle == "function") {
		GM_addStyle(style);
	} else {
		evalNodes('//head/style').snapshotItem(0).appendChild(document.createTextNode(style));
	}
	var tmb = document.getElementById('thumbnail');
	if (document.defaultView.getComputedStyle(tmb, null).getPropertyValue('color') != "rgb(255, 0, 0)") {
		unsafeWindow.location = tmb.href;
	}
}

})()