// ==UserScript==
// @name Favicolicious
// @namespace	http://agata.de/
// @description	A script to add favicons next to posted links on delicious.com
// @include	http://delicious.com/*
// @version	1.1
// @date	
// ==/UserScript==
// Copyright (c) 2010, A. Jankowski
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// based on http://userscripts.org/scripts/show/58177

(function(){
	
	(typeof GM_addStyle != 'undefined' ? GM_addStyle : function GM_addStyle(css) {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	})("#favicon {\
	padding-right: 4px;\
	vertical-align: middle;\
	border: none;\
}\
a.taggedlink {\
	position: relative;\
	padding-left: 0px;\
}");


var FAVICON_GRABBER = 'http://www.google.com/s2/favicons?domain='; 
var QUERY = 'div.data > h4 > a.taggedlink';

/**
 * @param {NodeList} links
 */
function add_favicons_to(links) {
	for (var i=0; i<links.length; i++) {
		if (links[i].firstChild.id != 'favicon') {
			var host = links[i].href.replace(/.*https?:\/\//, '').replace(/\/.*$/,'');
			var img = document.createElement('IMG');
			img.src = FAVICON_GRABBER + host;
			img.width = '16';
			img.height = '16';
			img.id = 'favicon';
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

document.body.addEventListener('DOMNodeInserted', debounce(function handleNewFavicons(event){
		if (event.target.id != 'favicon') {
			add_favicons_to(document.querySelectorAll(QUERY));
		}
	}, 500)
, false);

})();
