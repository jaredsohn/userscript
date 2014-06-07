// del.google.us
// version 0.5.1
// tested on Greasemonkey 0.6.4
// 1/6/2006
// Copyright (c) 2006, David Marquardt
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          del.google.us
// @namespace    http://pingpongdude.com.br/
// @description   displays related hot delicous bookmarks along with google searches
// @include       http://*.google.tld/*
// ==/UserScript==
var href = window.location.href;
var title;
var link;
var creator;
var date;
var searchFor;
var item;
var now;
var query;
var hasQ = new Array();

function search(title, link, n) {
	query = document.getElementsByName('q')[0].value;
	r = new RegExp(query, "i");
	if (r.test(title)) {
		hasQ[hasQ.length] = n;
	}
	return hasQ;
}

function start() {
	var start = 0;
	r = new RegExp("Results <b>([0-9])([0-9])?</b>", "i");
	fonts = document.getElementsByTagName('font');
	for (n=0;n<fonts.length;n++) {
		if (r.test(fonts[n].innerHTML) == true) {
			result = r.exec(fonts[n].innerHTML);
			if (result[2] != null) {
				start = result[1].concat(result[2]);
			}
			n = fonts.length;
		}
	}
	return start;
}

// :) now works with non-US google pages too
if (href.match(/^http:\/\/(.)*\.google\.(.)+\/search((\/)|(\?))/i) && start() == 0) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://del.icio.us/rss/popular/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			date = new Date();
			now = date.getTime();
			if (GM_getValue('item0', 0) == 0 || now > Number(GM_getValue('lastAccessed')) + 7200000) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText,
					"application/xml");
				item = dom.getElementsByTagName('item');
				for (w=0;w<item.length;w++) {
					title = item[w].getElementsByTagName('title')[0].textContent;
					link = item[w].getElementsByTagName('link')[0].textContent;
					
					GM_setValue('item'+w, title+";"+link);
					GM_setValue('items', item.length);
				}
				GM_setValue('lastAccessed', String(now));
			}
			for (y=0;y<GM_getValue('items');y++) {
				item = String(GM_getValue('item'+y));
				item = item.split(";");
				
				title = item[0];
				link = item[1];
				hasQ = search(title, link, y);
			}	
			
			if (hasQ != 0) {
				p = document.getElementsByTagName("p");
				newElement = document.createElement("p");
				
				newElement.class = 'g';
				
				newElement.innerHTML = "<a href='http://del.icio.us/popular/'>Hot del.icio.us bookmarks related to <b>" + query + "</b></a> \
										<table cellpadding=0 cellspacing=0 border=0><tr><td class=j>";
				
				for (k=0;k<hasQ.length;k++) {
					item = GM_getValue("item" + hasQ[k]);
					item = item.split(';');
					
					title = item[0];
					link = item[1];
					newElement.innerHTML += "<span style='position: relative; left: 40px; overflow: hidden; font-size: 13px'><a href='" + link + "'>" + title + "</a><br /><span style='position: relative; left: 40px; color: #008000'>" + link + "</span></span>";
					if (k != hasQ.length-1) {
						newElement.innerHTML += "<br />";
					}
				}
				newElement.innerHTML += "</td></tr></table>";
				
				p[0].parentNode.insertBefore(newElement, p[0]);
			}
		}
	});
}