// ==UserScript==
// @name	Google Favicons
// @description	Adds favicons to Google search results.
// @include	https://www.google.*/*
// @exclude	https://drive.google.*/*
// @exclude	https://docs.google.*/*
// @exclude	https://mail.google.*/*
// @exclude	https://plus.google.*/*
// @exclude	https://www.google.*/voice/*
// @exclude	https://www.google.*/maps/*
// @copyright	2009+, Nikita Vasilyev
// @version	1.0
// ==/UserScript==

(function(){

	(typeof GM_addStyle != 'undefined' ? GM_addStyle : function addStyle(css) {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	})(".favicon {\
	padding-right: 4px;\
	vertical-align: middle;\
	border: none;\
}\
#res .favicon {\
	left: -24px;\
	position: absolute;\
	top: 2px;\
	z-index: 9;\
}\
#newsbox .favicon {\
	top: 1px;\
}\
li.g {\
	position: relative;\
}\
div.vsc img.favicon,\ .psrt .favicon,\ .pslmain .favicon,\ .mod.fwm .favicon {\
	display: none;\
}\
");

	var FAVICON_GRABBER = 'https://www.google.com/s2/favicons?domain='; // 'http://favicon.yandex.net/favicon/'
var QUERY = '#res li.g h3 a, #res > div.g > a';

/**
 * @param {NodeList} links
 */
function add_favicons_to(links) {
	for (var i=0; i<links.length; i++) {
		if (links[i].firstChild.className != 'favicon') {
			var host = links[i].href.replace(/.*https?:\/\//, '').replace(/\/.*$/,'');
			var img = document.createElement('IMG');
			img.src = FAVICON_GRABBER + host;
			img.width = '16';
			img.height = '16';
			img.className = 'favicon';
			links[i].insertBefore(img, links[i].firstChild);
		}
	}
}

add_favicons_to(document.querySelectorAll(QUERY));

/**
 * Debounce function from http://code.google.com/p/jquery-debounce/
 */
function debounce(fn, timeout, invokeAsap, context) {
	if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
		context = invokeAsap;
		invokeAsap = false;
	}
	var timer;
	return function() {
		var args = arguments;
		if(invokeAsap && !timer) {
			fn.apply(context, args);
		}
		clearTimeout(timer);
		timer = setTimeout(function() {
			if(!invokeAsap) {
				fn.apply(context, args);
			}
			timer = null;
		}, timeout);
	};
}

document.addEventListener('DOMNodeInserted', debounce(function handleNewFavicons(event){
		if (event.target.className != 'favicon') {
			add_favicons_to(document.querySelectorAll(QUERY));
		}
	}, 500)
, false);

})();